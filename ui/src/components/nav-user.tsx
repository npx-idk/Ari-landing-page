"use client"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@ari/ui/components/sidebar"
import { ReactNode } from "react"

export interface DropdownItem {
  icon: any
  label: string
  onClick: () => void
}

interface NavUserProps {
  user: {
    name: string
    email: string
    avatar: string
  }
  signOut: () => void
  dropdownItems: DropdownItem[]
  children?: ReactNode
}

export function NavUser({
  user,
  signOut,
  dropdownItems,
  children,
}: NavUserProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {children || (
          <div className="flex w-full items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-lg" />
              ) : (
                <span className="text-xs font-medium">{user.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
