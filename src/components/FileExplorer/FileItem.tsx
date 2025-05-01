
import React from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type FileItemType = {
  name: string;
  type: "file" | "directory";
  size?: number;
  modifiedAt?: Date;
  path: string;
};

interface FileItemProps {
  file: FileItemType;
  isSelected?: boolean;
  onClick: (file: FileItemType) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, isSelected, onClick }) => {
  const getFileIcon = () => {
    if (file.type === "directory") {
      return "Folder";
    }
    
    // Определяем иконку по расширению файла
    const extension = file.name.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        return "FileCode";
      case "json":
        return "Braces";
      case "md":
        return "FileText";
      case "css":
      case "scss":
      case "sass":
        return "Paintbrush";
      case "html":
      case "htm":
        return "Code";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
        return "Image";
      default:
        return "File";
    }
  };

  const formatBytes = (bytes?: number): string => {
    if (!bytes) return "—";
    
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div 
      className={cn(
        "flex items-center p-2 rounded-md cursor-pointer transition-colors",
        isSelected ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-800"
      )}
      onClick={() => onClick(file)}
    >
      <div className="mr-3">
        <Icon name={getFileIcon()} size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
      </div>
      <div className="flex items-center gap-4">
        {file.type === "file" && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatBytes(file.size)}
          </span>
        )}
        {file.modifiedAt && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {file.modifiedAt.toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default FileItem;
