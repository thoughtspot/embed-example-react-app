"use client";

import Link from "next/link";
import {Dropdown, Navbar} from "flowbite-react";

import styles from "./TopNavBar.module.css";

import {constants} from "@/lib/constants";

interface NavBarProps {
}

export function TopNavBar(props: NavBarProps) {

    return (
        <Navbar fluid className="bg-black text-white">
            <Navbar.Brand as={Link} href="/#">
                <img src={constants.appTopIconUrl} className="mr-3 h-6 sm:h-9" alt="TSE Logo"/>
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          {constants.appTopTitle}
        </span>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Navbar.Link className={styles.navlink} href="/dashboard">
                    Dashboards
                </Navbar.Link>
                <Navbar.Link className={styles.navlink} href="/datachat">
                    Data Chat
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
