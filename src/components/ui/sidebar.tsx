
import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type SidebarContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="flex min-h-screen">
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar must be used within a SidebarProvider");

  const { open } = context;

  return (
    <div
      className={cn(
        "h-screen overflow-y-auto border-r bg-background transition-all duration-300",
        open ? "w-64 min-w-64" : "w-0 min-w-0 opacity-0"
      )}
    >
      {children}
    </div>
  );
}

export function SidebarContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export function SidebarInset({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 overflow-auto">{children}</div>;
}

export function SidebarToggle() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("SidebarToggle must be used within a SidebarProvider");

  const { open, setOpen } = context;

  return (
    <button
      className="fixed left-4 top-4 z-10 rounded-md border bg-background p-2 shadow-md"
      onClick={() => setOpen(!open)}
    >
      {open ? "←" : "→"}
    </button>
  );
}
