"use client";

import {useEffect, useState} from "react";
import Link from 'next/link';

import {createConfiguration, ServerConfiguration, ThoughtSpotRestApi} from "@thoughtspot/rest-api-sdk";

import {constants} from "@/lib/constants";

/*
* Menu page to list available Datasources (Worksheets + Models) to launch into Spotter embed page
*/

// API configuration using no auth.
const config = createConfiguration({
    baseServer: new ServerConfiguration(constants.tsURL, {}),
});

export default function WorksheetList() {
    const [metadataData, setMetadataData] = useState<object | null>();
    const [selectedTag, setSelectedTag] = useState('');
    const [tags, setTags] = useState([]);

    const api = new ThoughtSpotRestApi(config);

    const fetchWorksheets = async (metadataOptions) => {
        const allTables = await api.searchMetadata(metadataOptions);
        console.log(allTables);
        return allTables.filter((m) => m['metadata_header']['type'] === 'WORKSHEET');
    }

    const fetchTags = async () => {
        console.log('setting tags');
        const tagResults = await api.searchTags({});
        setTags(tagResults.map((item) => item.name));
    }

    useEffect(() => {
        fetchTags().then();

        const metadataOptions = {
            record_size: -1,
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

        if (selectedTag) {
            metadataOptions['tag_identifiers'] = [selectedTag];
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
    }, [selectedTag]);

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <p className="font-bold flex items-center mb-4">Please select a worksheet to search</p>
            <div className="mb-4 flex items-center gap-4">

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
                                    <Link href={`/datachat/${encodeURIComponent(item.metadata_id.trim())}`}>
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
                <p className="text-gray-500 text-center">No worksheets found</p>
            )}
        </div>
    )
        ;
}