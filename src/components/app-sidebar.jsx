import { Album, Image, } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Converter",
        url: "/dashboard",
        icon: Image,
    },
    {
        title: "Historial",
        url: "/dashboard/historial",
        icon: Album,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="h-60 bg-green-400 rounded-lg flex justify-center items-center">
                        <div className="w-40">
                            <img src="/images/logo.png" alt="" />
                        </div>
                    </div>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/* Foote sidebar */}
            <SidebarFooter>
                <SidebarMenuButton asChild>
                    <a href='#'>
                        {/* <span>Footer</span> */}
                    </a>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}
