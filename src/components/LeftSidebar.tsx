"use client";

import Link from "next/link";
import {Dropdown, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react";

import styles from "./TopNavBar.module.css";

import {constants} from "@/lib/constants";

interface SidebarProps {
}

export function LeftSidebar(props: SidebarProps) {

    return (
        <Sidebar className="bg-gray h-screen">
            <SidebarItems className="bg-gray">

                <Sidebar.ItemGroup>
                    <SidebarItem>
                        <Link href="/">
                            Home
                        </Link>
                    </SidebarItem>
                    <SidebarItem>
                        App Capability 1
                    </SidebarItem>
                    <SidebarItem>
                        App Capability 2
                    </SidebarItem>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <SidebarItem>
                        <Link href="/datachat">
                            AI Data Chat 
                        </Link>
                    </SidebarItem>
                </Sidebar.ItemGroup>

                {/* Use REST API to generate left side menu, or default to simple links */}
                {constants.leftSideMenuRestApi === true ? (
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
                ):
                (
                <SidebarItemGroup>
                    <Sidebar.Item>
                        <Link href="/dashboard">
                            Dashboards
                        </Link>
                    </Sidebar.Item>
                    <Sidebar.Item href="">
                        <Link href="/report">
                            Reports
                        </Link>
                    </Sidebar.Item>
            </SidebarItemGroup>
            )
}
                

            </SidebarItems>
        </Sidebar>
    );
}