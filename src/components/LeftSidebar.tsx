"use client";

import Link from "next/link";
import {Dropdown, Sidebar, SidebarItem, SidebarItems} from "flowbite-react";

import styles from "./TopNavBar.module.css";

import {constants} from "@/lib/constants";

interface SidebarProps {
}

export function LeftSidebar(props: SidebarProps) {

    return (
        <Sidebar className="bg-black h-screen">
            <SidebarItems className="bg-black">
                <Sidebar.ItemGroup>
                <SidebarItem >
                    <Link className={styles.navlink} href="/dashboard">
                        Dashboards
                    </Link>
                </SidebarItem>
                <SidebarItem>
                    <Link className={styles.navlink} href="/datachat">
                        Data Chat
                    </Link>
                </SidebarItem>
                <SidebarItem>
                    <Link className={styles.navlink} href="/report">
                        Reports
                    </Link>
                </SidebarItem>
                </Sidebar.ItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}