"use client";

import {useEffect, useState} from "react";

import {ConversationEmbed} from "@thoughtspot/visual-embed-sdk";

import {createConfiguration, ServerConfiguration, ThoughtSpotRestApi} from "@thoughtspot/rest-api-sdk";

import {constants} from "@/lib/constants";


import DivWithId from "@/components/DivWithId"

interface Props {
    params: { userId: string };
}

// API configuration using no auth.
const config = createConfiguration({
    baseServer: new ServerConfiguration(constants.tsURL, {}),
});

/*
* Display page for access_control_properties, receiving the userId variable from the URL
*/

const UserDataEntitlements = ({params}: Props) => {
    const [userData, setUserData] = useState<object | null>();

    useEffect(() => {
        const api = new ThoughtSpotRestApi(config);

        const userOptions = 
            {
                "record_offset": 0,
                "record_size": 10,
                "include_favorite_metadata": false,
                "user_identifier": params.userId
              }

        const fetchUsers = async (userOptions) => {
            const allTables = await api.searchUsers(userOptions);
            console.log(allTables);
            return allTables; // .filter((m) => m['metadata_header']['type'] === 'WORKSHEET');
        }

        const fetchFilteredData = async () => {
            try {
                const filteredUserData = await fetchUsers(userOptions);
                console.log(filteredUserData);
                setUserData(filteredUserData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            
        }
        // Actually make the call
        fetchFilteredData().then();

    }, [params.userId]); // Only runs when worksheetId changes

    return (
        //<DivWithId id="embed" className="w-full"/>
        <div className="max-w-4xl mx-auto mt-4">
            <p className="font-bold flex items-center mb-4">Inspecting: {params.userId}</p>

            {userData && userData.length > 0 ? (
            <div className="mb-4 gap-4">
                <p>{userData[0].name}</p>
                <p>{userData[0].display_name}</p>
                <p>{userData[0].email}</p>
               {/*<p>{userData[0].access_control_properties}</p>
                <p>{userData[0].user_parameters}</p>--> */}
            </div> 
            ): (
                <p className="text-gray-500 text-center">No user details found</p>
            )}
        </div>
    );
};

export default UserDataEntitlements;

