"use client";

import {useEffect, useState} from "react";
import Link from 'next/link';

import {createConfiguration, ServerConfiguration, ThoughtSpotRestApi} from "@thoughtspot/rest-api-sdk";

import {constants} from "@/lib/constants";

// API configuration using no auth.
const config = createConfiguration({
    baseServer: new ServerConfiguration(constants.tsURL, {}),
});

export default function DashboardList() {
    const [metadataData, setMetadataData] = useState<object | null>();
    const [showMyItems, setShowMyItems] = useState(false);
    const [authorName, setAuthorName] = useState('');

    const api = new ThoughtSpotRestApi(config);

    const fetchLiveboards = async (metadataOptions) => {
        return await api.searchMetadata(metadataOptions);
    }

    const fetchUserName = async () => {
        const userInfo = await api.getCurrentUserInfo();
        console.log('user === ' + userInfo.name);
        setAuthorName(userInfo.name);
    }

    useEffect(() => {
        fetchUserName().then();

        const metadataOptions = {
            record_size: -1,
            include_headers: true,
            metadata: [
                {
                    "type": "LIVEBOARD"
                }
            ]
        }

        if (showMyItems) {
            metadataOptions['created_by_user_identifiers'] = [authorName];
        }

        const fetchFilteredData = async () => {
            try {
                const filteredMetadata = await fetchLiveboards(metadataOptions);
                setMetadataData(filteredMetadata);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        fetchFilteredData().then(); // Call the async function
    }, [showMyItems]);

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <p className="font-bold flex items-center mb-4">Please select a dashboard to view</p>
            <div className="mb-4 flex items-center gap-4">
                {/* Checkbox for my items. */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={showMyItems}
                        onChange={(e) => setShowMyItems(e.target.checked)}
                    />
                    <span className="text-gray-700">Show my items</span>
                </label>
                </div>
                
                <div className="mb-4 flex items-center gap-4">
            </div>

            {metadataData && metadataData.length > 0 ? (

                <div className="h-[65vh] overflow-auto border border-gray-200 rounded-lg">
                    <table className="table-fixed border-collapse border border-gray-200 w-full">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left w-1/2">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {metadataData.map((item) => (
                            <tr key={item.metadata_id} className="border-b border-gray-200">
                                <td className="w-1/3 border border-gray-300 px-4 py-2 hover:underline">
                                    <Link href={`/dashboard/${encodeURIComponent(item.metadata_id.trim())}`}>
                                        {item.metadata_name}
                                    </Link>
                                </td>
                                <td className="w-1/3 border border-gray-300 px-4 py-2">
                                    {item.metadata_header.description || ''}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 text-center">No dashboards found</p>
            )}
        </div>
    )
        ;
}