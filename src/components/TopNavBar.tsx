"use client";

import Link from "next/link";
import {Dropdown, Navbar, Button} from "flowbite-react";

import styles from "./TopNavBar.module.css";

import {constants} from "@/lib/constants";

import { useState } from "react";

interface NavBarProps {
    drawerOpen: boolean,
    setDrawerOpen: Function
}



export function TopNavBar({drawerOpen, setDrawerOpen}: NavBarProps) {
    const drawerClick = () => {
        if (drawerOpen === false){
            setDrawerOpen(true);
        }
        else {
            setDrawerOpen(false);
        }
    }

    let selectedItemDrawer;
    if (constants.selectedItemDrawerEnabled){
        selectedItemDrawer = <Button onClick={drawerClick}>My Items</Button>
    }
    else {
        selectedItemDrawer = "";
    }


    return (
        <Navbar fluid className="bg-black text-white">
            <Navbar.Brand as={Link} href="/#">
                <img src={constants.appTopIconUrl} className="mr-3 h-6 sm:h-9" alt="TSE Logo"/>
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                    {constants.appTopTitle}
                </span>
            </Navbar.Brand>
            <Navbar.Toggle/>
            
            {constants.leftSideMenuEnabled === false ? (
                <Navbar.Collapse>
                    <Navbar.Link className={styles.navlink} href="/dashboard">
                        Dashboards
                    </Navbar.Link>
                    <Navbar.Link className={styles.navlink} href="/datachat">
                        Data Chat
                    </Navbar.Link>
                    <Navbar.Link className={styles.navlink} href="/report">
                        Reports
                    </Navbar.Link>

                    {constants.selectedItemDrawerEnabled && 
                    <Navbar.Link className={styles.navlink} onClick={drawerClick}>
                        My Items
                    </Navbar.Link>
                    }

                    
                    
                </Navbar.Collapse>
            ): (

            <Navbar.Collapse>
                {selectedItemDrawer}
                <Button>Config</Button>
            </Navbar.Collapse> )
        }
        </Navbar>
    );
}
