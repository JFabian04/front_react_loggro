import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from './sidebar';
import { AppSidebar } from "@/components/app-sidebar"
import Header from '../header';

const Layout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className='z-10' />
            <div className="fixed h-screen w-screen overflow-auto">
                <Header />
                <main className="w-full pt-14">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
};

export default Layout;
