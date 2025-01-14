import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from './sidebar';
import { AppSidebar } from "@/components/app-sidebar"
import Header from '../header';
import Footer from '../footer';

const Layout = () => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger className='z-10' />
                <div className="w-full absolute flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow pt-14">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </SidebarProvider>
        </>
    );
};

export default Layout;
