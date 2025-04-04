"use client";

import "./globals.css";
import {constants} from "@/lib/constants";

import {TopNavBar} from "@/components/TopNavBar";
import {TSFooter} from "@/components/TSFooter";


import ThoughtSpotEmbed from "@/components/ThoughtSpotEmbed";
import { TopNavBarDropdown } from "@/components/TopNavBarDropdown";
import { LeftSidebar } from "@/components/LeftSidebar";
import { LeftSidebarRestApi } from "@/components/LeftSidebarRestApi";

import { Button, Drawer} from "flowbite-react";
import { useState } from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("Rendering RootLayout");
    
    // Right Side Drawer allows for placing stored information from click events
    const [isOpen, setIsOpen] = useState(false);
    const [drawerItems, setDrawerItems] = useState(['Item 1', 'Item 2']);
    const handleClose = () => setIsOpen(false);

    const clearDrawer = () => {
        setDrawerItems([]);
    }

    // Sidebar mode needs different styling in the main content area then just top bar
    let embeddedContentClass;
    if(constants.leftSideMenuEnabled){
        embeddedContentClass = 'embeddedContentSidebarWidth';
    }
    else {
        embeddedContentClass = 'embeddedContentFullWidth';
    }


    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <title>TSE In Action</title>
            <link rel="icon" href="/images/ts.png" type="images/png"/>
        </head>
        <body>
        <>
            <TopNavBar drawerOpen={isOpen} setDrawerOpen={(b: boolean) => setIsOpen(b)}/>

            <div className="flex w-full">
                
                { /* Left Side bar can be filled by REST API request or be simpler hardcoded component */}
                {constants.leftSideMenuEnabled && constants.leftSideMenuRestApi &&
                    (<LeftSidebarRestApi></LeftSidebarRestApi>)
                }
                {constants.leftSideMenuEnabled && !constants.leftSideMenuRestApi &&
                    (<LeftSidebar></LeftSidebar>)
                }
                
                { /* ThoughtSpotEmbed component initializes SDK properly, other pages load within as children */}
                <ThoughtSpotEmbed>
                    <div className={embeddedContentClass}>{children}</div>
                </ThoughtSpotEmbed>
            </div>
                

            { /* Drawer is for stashing items from onclick events */}
            <Drawer open={isOpen} onClose={handleClose} position="right">
                <Drawer.Header title="My Selections" />
                <Drawer.Items>
                    <ul>
                    {drawerItems.map((item) => (
                        <li>{item}</li>
                    ))}
                    </ul>
                    <div>&nbsp;</div>
                    <Button onClick={clearDrawer}>Clear List</Button>
                </Drawer.Items>
            </Drawer>
            
            <TSFooter/>
        </>
        </body>
        </html>
    );
}
