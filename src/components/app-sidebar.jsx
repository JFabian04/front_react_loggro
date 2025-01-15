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
        title: "Convertir a PNG",
        url: "/dashboard",
        icon: Image,
        exception: ['admin'],
    },
    {
        title: "Historial",
        url: "/dashboard/historial",
        icon: Album,
        exception: [],
    }
]

export function AppSidebar({ data }) {
    return (
        <Sidebar className="shadow-md">
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
                                data && !item.exception.includes(data.rol) ? (
                                    < SidebarMenuItem key={item.title} className="my-2" >
                                        <SidebarMenuButton asChild className="shadow-lg h-20 text-sky-700 hover:text-sky-600 hover:shadow-none text-[1.2em] bg-white font-bold">
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ) : null
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
        </Sidebar >
    )
}
