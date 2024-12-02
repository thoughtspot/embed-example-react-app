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
    const [showMyItems, setShowMyItems] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');
    const [tags, setTags] = useState([]);
    const [authorName, setAuthorName] = useState('');

    const api = new ThoughtSpotRestApi(config);

    const fetchMetadata = async (metadataOptions) => {
        return await api.searchMetadata(metadataOptions);
    }

    const fetchUserName = async () => {
        const userInfo = await api.getCurrentUserInfo();
        console.log('user === ' + userInfo.name);
        setAuthorName(userInfo.name);
    }

    const fetchTags = async () => {
        console.log('setting tags');
        const tagResults = await api.searchTags({});
        setTags(tagResults.map((item) => item.name));
    }

    useEffect(() => {
        fetchUserName().then();
        fetchTags().then();

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
        if (selectedTag) {
            metadataOptions['tag_identifiers'] = [selectedTag];
        }

        const fetchFilteredData = async () => {
            try {
                const filteredMetadata = await fetchMetadata(metadataOptions);
                console.log(filteredMetadata);
                setMetadataData(filteredMetadata);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };

        fetchFilteredData().then(); // Call the async function
    }, [showMyItems, selectedTag]);

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <div className="mb-4 flex items-center gap-4">
                {/* Checkbox */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={showMyItems}
                        onChange={(e) => setShowMyItems(e.target.checked)}
                    />
                    <span className="text-gray-700">Show my items</span>
                </label>

                {/* Dropdown */}
                <select
                    className="border border-gray-300 rounded px-2 py-1 text-gray-700"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                >
                    <option value="">All tags</option>
                    {tags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            {metadataData && metadataData.length > 0 ? (

                <div className="h-[75vh] overflow-auto border border-gray-200 rounded-lg">
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