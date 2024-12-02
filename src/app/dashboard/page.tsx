"use client";

import {useEffect, useState} from "react";
import Link from 'next/link';
import {ListGroup} from 'flowbite-react';

import {createConfiguration, ServerConfiguration, ThoughtSpotRestApi} from "@thoughtspot/rest-api-sdk";

import {constants} from "@/lib/constants";

// API configuration using no auth.
const config = createConfiguration({
    baseServer: new ServerConfiguration(constants.tsURL, {}),
});

export default function DashboardList() {
    const [metadataData, setMetadataData] = useState<object | null>();

    useEffect(() => {
        const api = new ThoughtSpotRestApi(config);
        api
            .searchMetadata({
                record_size: 10,
            })
            .then((data) => {
                console.log(data);
                setMetadataData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div className="max-w-4xl mx-auto mt-4">
            {metadataData && metadataData.length > 0 ? (
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left w-1/2">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {metadataData.map((item) => (
                        <tr key={item.metadata_id} className="border-b border-gray-200">
                            <td className="border border-gray-300 px-4 py-2 w-1/2 hover:underline hover:font-bold">
                                <Link href={`/dashboard/${encodeURIComponent(item.metadata_id.trim())}`}>
                                    {item.metadata_name}
                                </Link>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {item.metadata_header.description || ''}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center">No dashboards found</p>
            )}
        </div>
    );
}