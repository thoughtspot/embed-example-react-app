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
    const [searchPattern, setSearchPattern] = useState(''); // Main state for search
    const [tempSearch, setTempSearch] = useState(''); // Temporary state for the input box

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

    // Update main search pattern state
    const handleSearchUpdate = () => {
        console.log('setting search pattern to ' + tempSearch);
        setSearchPattern(tempSearch);
    };

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
        if (searchPattern) {
            metadataOptions['metadata'][0]['name_pattern'] = searchPattern;
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
    }, [showMyItems, selectedTag, searchPattern]);

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

                {/* Dropdown for tags */}
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

            {/* Name pattern. */}
            <div className="flex items-center gap-2">
                <label htmlFor="search-pattern" className="text-gray-700">
                    Dashboard Name:
                </label>
                <input
                    id="search-pattern"
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 text-gray-700 w-1/2"
                    placeholder="Enter a filter for the dashboard name"
                    value={tempSearch}
                    onChange={(e) => setTempSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearchUpdate(); // Update on Enter
                    }}
                    onBlur={handleSearchUpdate} // Update on Blur
                />
            </div>

            {metadataData && metadataData.length > 0 ? (

                <div className="h-[70vh] overflow-auto border border-gray-200 rounded-lg">
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