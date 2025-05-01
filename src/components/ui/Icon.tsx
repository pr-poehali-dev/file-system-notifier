
import * as Icons from "lucide-react";
import React from "react";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  fallback?: string;
};

const Icon = ({ name, size = 24, color, className = "", fallback }: IconProps) => {
  // @ts-ignore - dynamic import
  const IconComponent = Icons[name as keyof typeof Icons] || (fallback ? Icons[fallback as keyof typeof Icons] : null);

  if (!IconComponent) {
    console.warn(`Icon ${name} not found and no fallback provided`);
    return null;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
