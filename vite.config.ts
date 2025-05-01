
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';


// Функция для получения информации о файлах и папках
function getFileStats(filePath: string) {
  try {
    const stats = fs.statSync(filePath);
    return {
      name: path.basename(filePath),
      type: stats.isDirectory() ? "directory" : "file",
      size: stats.isFile() ? stats.size : undefined,
      modifiedAt: stats.mtime.toISOString(), // Преобразуем в строку ISO
      path: filePath.replace(/\\/g, '/'),
    };
  } catch (error) {
    console.error(`Ошибка при получении информации о файле ${filePath}:`, error);
    return null;
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Плагин для API файловой системы
    {
      name: 'vite-plugin-fs-api',
      configureServer(server) {
        server.middlewares.use('/api/files', (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          
          try {
            const url = new URL(req.url || '/', `http://${req.headers.host}`);
            const requestedPath = decodeURIComponent(url.searchParams.get('path') || '/');
            
            // Для безопасности преобразуем относительные пути в абсолютные 
            // и не разрешаем выйти за пределы текущего проекта
            const rootDir = process.cwd();
            let targetPath;
            
            if (requestedPath === '/' || requestedPath === '') {
              targetPath = rootDir;
            } else {
              // Обработка путей и предотвращение path traversal атак
              const normalizedPath = path.normalize(requestedPath);
              targetPath = path.resolve(rootDir, normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath);
              
              // Проверка, что путь не выходит за пределы корневой директории проекта
              if (!targetPath.startsWith(rootDir)) {
                targetPath = rootDir;
              }
            }
            
            if (!fs.existsSync(targetPath)) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Путь не найден' }));
              return;
            }
            
            if (fs.statSync(targetPath).isDirectory()) {
              const files = fs.readdirSync(targetPath)
                .map(file => getFileStats(path.join(targetPath, file)))
                .filter(Boolean);
              
              res.end(JSON.stringify(files));
            } else {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Путь не является директорией' }));
            }
          } catch (error) {
            console.error('Ошибка API файловой системы:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Внутренняя ошибка сервера' }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: [
      'localhost',
      'preview--file-system-notifier.poehali.dev',
      '.poehali.dev'
    ],
    cors: true
  }
});
