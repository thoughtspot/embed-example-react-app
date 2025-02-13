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
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);


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
            <Drawer open={isOpen} onClose={handleClose} position="right">
                <Drawer.Header title="My Selections" />
            </Drawer>
            <TSFooter/>
        </>
        </body>
        </html>
    );
}
