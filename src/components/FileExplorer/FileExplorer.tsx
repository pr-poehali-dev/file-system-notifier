
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import FileItem, { FileItemType } from "./FileItem";
import Icon from "@/components/ui/Icon";

interface FileExplorerProps {
  initialPath?: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ initialPath = "/" }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [files, setFiles] = useState<FileItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItemType | null>(null);

  const fetchFiles = async (path: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Симуляция загрузки данных
      // В реальном приложении здесь будет fetch запрос к серверу
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Предоставим базовые файлы для демонстрации
      const mockFiles: FileItemType[] = [
        { name: "Документы", type: "directory", path: `${path}/Документы` },
        { name: "Загрузки", type: "directory", path: `${path}/Загрузки` },
        { name: "Изображения", type: "directory", path: `${path}/Изображения` },
        { name: "проект.js", type: "file", size: 1024, modifiedAt: new Date(), path: `${path}/проект.js` },
        { name: "конфиг.json", type: "file", size: 512, modifiedAt: new Date(), path: `${path}/конфиг.json` },
        { name: "README.md", type: "file", size: 256, modifiedAt: new Date(), path: `${path}/README.md` }
      ];
      
      setFiles(mockFiles);
    } catch (err) {
      setError("Ошибка при загрузке файлов. Попробуйте обновить страницу.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath]);

  const handleFileClick = (file: FileItemType) => {
    setSelectedFile(file);
    
    if (file.type === "directory") {
      // Навигация в директорию
      setCurrentPath(file.path);
      
      // Обновление истории
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(file.path);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const goToParent = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
    if (parentPath !== currentPath) {
      setCurrentPath(parentPath);
      
      // Обновление истории
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(parentPath);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <div>Файловый Проводник</div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack} 
              disabled={historyIndex <= 0}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goForward} 
              disabled={historyIndex >= history.length - 1}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goToParent} 
              disabled={currentPath === '/'}
            >
              <Icon name="ArrowUp" size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => fetchFiles(currentPath)}
            >
              <Icon name="RefreshCw" size={20} />
            </Button>
          </div>
        </CardTitle>
        <Input 
          value={currentPath} 
          onChange={(e) => setCurrentPath(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchFiles(currentPath);
              
              // Обновление истории
              const newHistory = history.slice(0, historyIndex + 1);
              newHistory.push(currentPath);
              setHistory(newHistory);
              setHistoryIndex(newHistory.length - 1);
            }
          }}
          className="mt-2"
        />
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Icon name="Loader2" className="animate-spin" size={24} />
            <span className="ml-2">Загрузка...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <Icon name="AlertTriangle" size={32} className="mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Icon name="FolderOpen" size={32} className="mx-auto mb-2" />
            <p>Папка пуста</p>
          </div>
        ) : (
          <div className="space-y-1">
            {files.map((file) => (
              <FileItem 
                key={file.path} 
                file={file} 
                isSelected={selectedFile?.path === file.path}
                onClick={handleFileClick} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
