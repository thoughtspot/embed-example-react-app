"use client";

import {useEffect} from "react";

import {ConversationEmbed} from "@thoughtspot/visual-embed-sdk";

import DivWithId from "@/components/DivWithId"

interface Props {
    params: { worksheetId: string };
}

const DataChat = ({params}: Props) => {

    useEffect(() => {

        const embedDiv = document.getElementById('embed');

        const embed = new ConversationEmbed(embedDiv, {
            worksheetId: params.worksheetId
        });

        embed.render().then();

    }, [params.worksheetId]); // Only runs when worksheetId changes

    return (
        <DivWithId id="embed" className="w-full"/>
    );
};

export default DataChat;

