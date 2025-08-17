"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ari/ui/components/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ari/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@ari/ui/components/sidebar";

export function NavMain({
  items,
  storeId,
  currentPath,
}: {
  items: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  storeId?: string;
  currentPath?: string;
}) {
  const { state } = useSidebar();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const handleDropdownChange = (itemTitle: string, open: boolean) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (open) {
        newSet.add(itemTitle);
      } else {
        newSet.delete(itemTitle);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: (typeof items)[0], e: React.MouseEvent) => {
    // If sidebar is collapsed and item has sub-items, prevent default navigation
    // The dropdown will handle showing the sub-items
    if (state === "collapsed" && item.items && item.items.length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Helper function to prefix URL with store ID if provided
  const getPrefixedUrl = (url: string) => {
    if (!storeId) {
      // If no storeId, return the URL as is (for non-store pages)
      return url.startsWith('/') ? url : `/${url}`;
    }
    
    if (url.startsWith('http') || url.startsWith('mailto:')) {
      return url;
    }
    
    // Don't prefix if it's already a store-specific URL
    if (url.startsWith(`/${storeId}`)) {
      return url;
    }
    
    // Handle empty URL for home page
    if (!url) {
      return `/${storeId}`;
    }
    
    return `/${storeId}/${url}`;
  };

  const normalizePath = (pathInput: string | undefined): string | undefined => {
    if (!pathInput) return undefined;
    const raw = String(pathInput);
    const withoutQuery = raw.includes("?") ? raw.substring(0, raw.indexOf("?")) : raw;
    const withoutHash = withoutQuery.includes("#")
      ? withoutQuery.substring(0, withoutQuery.indexOf("#"))
      : withoutQuery;
    if (withoutHash.length > 1 && withoutHash.endsWith("/")) return withoutHash.slice(0, -1);
    return withoutHash;
  };

  const activePath = normalizePath(currentPath);

  const isUrlActive = (url?: string) => {
    if (!url || !activePath) return false;
    const full = normalizePath(getPrefixedUrl(url));
    if (!full) return false;
    // Exact match or startsWith followed by a slash for nested routes
    return activePath === full || activePath.startsWith(`${full}/`);
  };

  return (
    <SidebarGroup>
      <SidebarMenu className="border-none">
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;
          const isCollapsed = state === "collapsed";
          const isAnySubActive = hasSubItems
            ? item.items!.some((sub) => isUrlActive(sub.url))
            : false;
          const isItemSelfActive = item.url ? isUrlActive(item.url) : false;
          const isItemActive = isAnySubActive || isItemSelfActive;

          // For collapsed sidebar with sub-items, use dropdown
          if (isCollapsed && hasSubItems) {
            return (
              <SidebarMenuItem key={item.title} className="border-none">
                <DropdownMenu
                  open={openDropdowns.has(item.title)}
                  onOpenChange={(open) =>
                    handleDropdownChange(item.title, open)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <div onClick={(e) => handleItemClick(item, e)}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="border-none w-full"
                        isActive={isItemActive}
                      >
                        {item.icon && <item.icon className="flex-shrink-0 size-4" />}
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    align="start"
                    className="min-w-[200px]"
                  >
                    {item.items?.map((subItem) => {
                      const subActive = isUrlActive(subItem.url);
                      return (
                        <DropdownMenuItem key={subItem.title} asChild>
                          <a href={getPrefixedUrl(subItem.url)} className="w-full">
                            <span className={subActive ? "font-medium" : undefined}>{subItem.title}</span>
                          </a>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          }

          // For expanded sidebar or items without sub-items, use normal collapsible
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isItemActive}
              className="group/collapsible border-none"
            >
              <SidebarMenuItem className="border-none">
                <CollapsibleTrigger asChild>
                  <a href={item.url !== undefined ? getPrefixedUrl(item.url) : undefined}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="border-none"
                      isActive={isItemActive}
                    >
                      {item.icon && <item.icon className="flex-shrink-0 size-4" />}
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      {hasSubItems && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      )}
                    </SidebarMenuButton>
                  </a>
                </CollapsibleTrigger>
                {hasSubItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="border-none">
                      {item.items?.map((subItem) => {
                        const subActive = isUrlActive(subItem.url);
                        return (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="border-none"
                          >
                            <SidebarMenuSubButton asChild className="border-none" isActive={subActive}>
                              <a href={getPrefixedUrl(subItem.url)}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
