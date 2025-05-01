
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 color-black text-black">Добро пожаловать!</h1>
        <p className="text-xl text-gray-600 mb-8">Выберите инструмент для работы</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/files">
            <Button className="flex items-center gap-2 px-6 py-6 text-lg">
              <Icon name="Folder" size={24} />
              Файловый проводник
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
