import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from './sidebar';
import { AppSidebar } from "@/components/app-sidebar"
import Header from '../header';
import Footer from '../footer';

const Layout = ({ data }) => {

    return (
        <>
            <SidebarProvider>
                <AppSidebar data={data} />
                <SidebarTrigger className='hidden lg:flex sm:bg-sky-500 shadow-sm rounded-none w-10 h-10 text-white z-10' />
                <div className="w-full absolute flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow pt-6">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </SidebarProvider>
        </>
    );
};

export default Layout;
