"use client";

import {useEffect, useState} from "react";

import Link from "next/link";
import {Dropdown, Navbar} from "flowbite-react";

import styles from "./TopNavBar.module.css";

import {constants} from "@/lib/constants";

import {createConfiguration, ServerConfiguration, ThoughtSpotRestApi} from "@thoughtspot/rest-api-sdk";

// API configuration using no auth.
const config = createConfiguration({
    baseServer: new ServerConfiguration(constants.tsURL, {}),
});

interface NavBarProps {
}

export function TopNavBarDropdown(props: NavBarProps) {

  const [metadataData, setMetadataData] = useState<object | null>();

    const api = new ThoughtSpotRestApi(config);

    const fetchWorksheets = async (metadataOptions) => {
        const allTables = await api.searchMetadata(metadataOptions);
        console.log(allTables);
        return allTables.filter((m) => m['metadata_header']['type'] === 'WORKSHEET');
    }


    useEffect(() => {

        const metadataOptions = {
            record_size: 5,
            include_headers: true,
            metadata: [
                {
                    "type": "LOGICAL_TABLE"
                }
            ],
            sort_options: {
                "field_name": "MODIFIED",
                "order": "DESC"
              }
        }


        const fetchFilteredData = async () => {
            try {
                const filteredMetadata = await fetchWorksheets(metadataOptions);
                console.log(filteredMetadata);
                setMetadataData(filteredMetadata);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        fetchFilteredData().then(); // Call the async function
    }, []);

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
            <Navbar.Link className={styles.navlink}>
                <Dropdown label="Data Chat" inline placement="bottom">
                
                {metadataData && metadataData.length > 0 ? (
                    metadataData.map((item) => (
                        <Dropdown.Item>
                            <Link href={`/datachat/${encodeURIComponent(item.metadata_id.trim())}`}>
                                {item.metadata_name}
                            </Link>
                        </Dropdown.Item>
                    ))
                ): (
                    <Dropdown.Item>Source A</Dropdown.Item>
                )}
                    
                    <Dropdown.Item>Source B</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Link href="/datachat">See All Data Sources</Link>
                    </Dropdown.Item>
                </Dropdown>
                </Navbar.Link>

                <Navbar.Link className={styles.navlink} href="/dashboard">
                    Dashboards
                </Navbar.Link>

                <Navbar.Link className={styles.navlink} href="/report">
                    Reports
                </Navbar.Link>

            </Navbar.Collapse>
        </Navbar>
    );
}