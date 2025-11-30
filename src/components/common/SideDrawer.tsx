import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { MENU_ITEMS, BOTTOM_ITEMS } from "@/utils/drawerData";

interface SideDrawerProps {
  open: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  handleDrawerToggle,
  isMobile,
}) => {
  const router = useRouter();

  const renderItems = (items: typeof MENU_ITEMS) => (
    <div className="flex flex-col gap-1 py-2">
      {items.map((item) => {
        const isActive =
          item.link === "/"
            ? router.pathname === item.link
            : router.pathname.startsWith(item.link);
        const icon = isActive ? item.icon.filled : item.icon.outline;

        return (
          <Link
            key={item.text}
            href={item.link}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              !open && !isMobile && "justify-center px-2"
            )}
            title={!open && !isMobile ? item.text : undefined}
          >
            <Icon icon={icon} width={24} height={24} className="shrink-0" />
            {(open || isMobile) && <span>{item.text}</span>}
          </Link>
        );
      })}
    </div>
  );

  const drawerContent = (
    <div className="flex h-full flex-col bg-background">
      <div className={cn("flex h-16 items-center border-b px-4", !open && !isMobile && "justify-center px-2")}>
        {(open || isMobile) && (
          <span className="text-lg font-bold font-orbitron text-primary mr-auto">
            Azhagu-swe
          </span>
        )}
      </div>
      <ScrollArea className="flex-1 px-3">
        {renderItems(MENU_ITEMS)}
        <Separator className="my-2" />
        {renderItems(BOTTOM_ITEMS)}
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(val) => { if (!val) handleDrawerToggle(); }}>
        <SheetContent side="left" className="w-[240px] p-0">
          {drawerContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 h-screen border-r bg-background transition-all duration-300 ease-in-out",
        open ? "w-[240px]" : "w-[70px]"
      )}
    >
      {drawerContent}
    </aside>
  );
};

export default SideDrawer;
