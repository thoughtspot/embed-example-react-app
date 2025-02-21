"use client";

import "./globals.css";

import {TopNavBar} from "@/components/TopNavBar";
import {TSFooter} from "@/components/TSFooter";

import ThoughtSpotEmbed from "@/components/ThoughtSpotEmbed";
import { TopNavBarDropdown } from "@/components/TopNavBarDropdown";

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
            <ThoughtSpotEmbed>
                <div className="embeddedContent">{children}</div>
            </ThoughtSpotEmbed>

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
