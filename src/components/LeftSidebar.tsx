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
                <SidebarItem >
                    <Link href="/dashboard">
                        Dashboards
                    </Link>
                </SidebarItem>
                <SidebarItem>
                    <Link href="/datachat">
                        Data Chat
                    </Link>
                </SidebarItem>
                <SidebarItem>
                    <Link href="/report">
                        Reports
                    </Link>
                </SidebarItem>
                </Sidebar.ItemGroup>
                <SidebarItemGroup>
                <Sidebar.Collapse label="E-commerce">
                    <Sidebar.Item href="#">Products</Sidebar.Item>
                    <Sidebar.Item href="#">Sales</Sidebar.Item>
                    </Sidebar.Collapse>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}