"use client";

import Link from "next/link";
import {Dropdown, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react";

import styles from "./TopNavBar.module.css";

import {constants} from "@/lib/constants";

interface SidebarProps {
}

// Left side menu is near standard in web apps
export function LeftSidebarRestApi(props: SidebarProps) {

    return (
        <Sidebar className="bg-gray h-screen">
            <SidebarItems className="bg-gray">
            {/* First section is to simulate whatever the app itself might do */}
                <Sidebar.ItemGroup>
                    <SidebarItem>
                        <Link href="/">
                            Home
                        </Link>
                    </SidebarItem>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <SidebarItem>
                        App Capability 1
                    </SidebarItem>
                    <SidebarItem>
                        App Capability 2
                    </SidebarItem>
                </Sidebar.ItemGroup>

                {/* Second section is link to Spotter capabilities */}
                <Sidebar.ItemGroup>
                    <SidebarItem>
                        <Link href="/datachat">
                            {constants.spotterName} 
                        </Link>
                    </SidebarItem>
                </Sidebar.ItemGroup>

                <SidebarItemGroup>
                <Sidebar.Collapse label="Dashboards">
                    <Sidebar.Item href="#">Products</Sidebar.Item>
                    <Sidebar.Item href="#">Sales</Sidebar.Item>
                    <Sidebar.Item>
                        <Link href="/dashboard">
                            -- See All --
                        </Link>
                    </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse label="Reports">
                    <Sidebar.Item href="#">Products</Sidebar.Item>
                    <Sidebar.Item href="#">Sales</Sidebar.Item>
                    <Sidebar.Item href="">
                        <Link href="/report">
                            -- See All --
                        </Link>
                    </Sidebar.Item>
                </Sidebar.Collapse>
                </SidebarItemGroup>

                
            
            </SidebarItems>
        </Sidebar>
    );
}