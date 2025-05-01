
import React from "react";
import FileExplorer from "@/components/FileExplorer/FileExplorer";
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import Icon from "@/components/ui/Icon";

const FileSystemPage = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarContent>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Icon name="HardDrive" className="mr-2" size={20} />
              Устройства
            </h2>
            <div className="space-y-2">
              <div className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Icon name="HardDrive" className="mr-2" size={16} />
                <span>Системный диск (C:)</span>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Icon name="Network" className="mr-2" size={16} />
                <span>Сеть</span>
              </div>
            </div>
            
            <h2 className="text-lg font-semibold my-4 flex items-center">
              <Icon name="FolderHeart" className="mr-2" size={20} />
              Избранное
            </h2>
            <div className="space-y-2">
              <div className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Icon name="Folder" className="mr-2" size={16} />
                <span>Документы</span>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Icon name="Download" className="mr-2" size={16} />
                <span>Загрузки</span>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Icon name="Image" className="mr-2" size={16} />
                <span>Изображения</span>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="container p-4 mx-auto">
          <h1 className="text-2xl font-bold mb-6">Проводник файловой системы</h1>
          <FileExplorer initialPath="/" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default FileSystemPage;
