"use client";

import * as React from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronRight,
  User,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

// Menu items.
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Fornitori", url: "/fornitori", icon: Inbox, badge: 3 },
  { title: "Piano Investimento", url: "/piano-investimento", icon: Calendar },
  { title: "Lista Competitor", url: "/lista-competitor", icon: Search },
  { title: "Analisi di Mercato", url: "/analisi-mercato", icon: Settings },
  { title: "Gestisci Preventivi", url: "/preventivi", icon: Settings },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-[#111f43]/20">
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-[#111f43] p-1">
              <ChevronRight className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111f43]">AppName</h2>
              <p className="text-xs text-[#111f43]/60">
                Professional Dashboard
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#111f43]/60 font-medium">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="w-full justify-between"
                    >
                      <a href={item.url} className="flex items-center py-2">
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5 text-[#111f43]" />
                          <span className="text-sm font-medium text-[#111f43]">
                            {item.title}
                          </span>
                        </div>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="bg-[#111f43] text-white"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator className="my-4 bg-[#111f43]/20" />
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#111f43]/60 font-medium">
              Quick Access
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="justify-start text-[#111f43]"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  className="justify-start text-[#111f43]"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-[#111f43]">John Doe</p>
              <p className="text-xs text-[#111f43]/60">john@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger
        onClick={() => setIsOpen(!isOpen)}
        className=" rounded-l-md bg-[#111f43] text-white p-2"
      >
        <ChevronRight
          className={`h-6 w-6 transform ${isOpen ? "rotate-180" : ""}`}
        />
      </SidebarTrigger>
    </SidebarProvider>
  );
}
