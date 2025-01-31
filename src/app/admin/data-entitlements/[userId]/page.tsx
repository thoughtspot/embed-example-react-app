"use client";

import {useEffect, useState} from "react";

import {ConversationEmbed} from "@thoughtspot/visual-embed-sdk";

import {createConfiguration, ServerConfiguration, ThoughtSpotRestApi, User} from "@thoughtspot/rest-api-sdk";

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
    const [userDataResults, setUserDataResults] = useState<object | null>();
    const [userData, setUserData] = useState<User | null>();

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
                setUserDataResults(filteredUserData);
                return filteredUserData;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            
        }
        // Actually make the call
        fetchFilteredData().then((u)=>{
            // Grab the single result and place into state
            if (u != undefined && u.length > 0){
                setUserData(u[0]);
            }
        });

        


    }, [params.userId]); // Only runs when worksheetId changes

    const groupItems = userData?.user_groups?.map((g) =>
        <li key={g.id}>
          <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={true}
                        //onChange={}
                    />
            &nbsp; {g.name} 
        </li>
      );

      const privItems = userData?.privileges?.map((p) =>
        <li key={p}>
          <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={true}
                        //onChange={}
                    />
            &nbsp; {p} 
        </li>
      );

      const orgItems = userData?.orgs?.map((o) =>
        <li key={o.id}>
          <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={true}
                        //onChange={}
                    />
            &nbsp; {o.name} 
        </li>
      );



    return (
        //<DivWithId id="embed" className="w-full"/>
        <div className="max-w-4xl mx-auto mt-4">
            <p className="font-bold flex items-center mb-4">Inspecting: {params.userId}</p>

            {userData ? (
            <div className="mb-4 gap-4">
                <p>Name: {userData.name}</p>
                <p>Display Name: {userData.display_name}</p>
                <p>E-mail: {userData.email}</p>
               {/*<p>{userData[0].access_control_properties}</p>
                <p>{userData[0].user_parameters}</p>--> */}
                <div className="mb-4 gap-4">
                    <h1>Groups</h1>
                    <ul>
                        {userData?.user_groups?.map((g) =>
        <li key={g.id}>
          <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        //checked={true}
                        //onChange={}
                    />
            &nbsp; {g.name} 
        </li>
      )}
                    </ul>
                    <h1>Privileges</h1>
                    <ul>
                        {privItems}
                    </ul>
                    <h1>Orgs</h1>
                    <ul>
                        {orgItems}
                    </ul>
                </div> 
            </div>


            ): (
                <p className="text-gray-500 text-center">No user details found</p>
            )}
        </div>
    );
};

export default UserDataEntitlements;

