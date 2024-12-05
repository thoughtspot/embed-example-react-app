"use client";

import { useEffect, useState } from "react";

/*
* Display page for any Liveboard, receiving the dashboardId variable from the URL
*/

import {
  LiveboardEmbed,
  useEmbedRef,
} from "@thoughtspot/visual-embed-sdk/react";

// Defines the expectation of the dashbaordId variable from the URL
interface Props {
  params: { dashboardId: string };
}

const Dashboard = ({ params }: Props) => {
  const [dashboardId, setDashboardId] = useState("");

  // Interactions with systems outside of React app get wrapped in useEffect()
  useEffect(() => {
    setDashboardId(params.dashboardId);
    {
      console.log(`Dashboard Id: ${params.dashboardId}`);
      setDashboardId(params.dashboardId);
    }
  }, [params.dashboardId]); // Only runs when dashboardId changes

  const embedRef = useEmbedRef<typeof LiveboardEmbed>();

  return (
    (dashboardId && (
      // ThoughtSpot LiveboardEmbed component with config properties. See https://developers.thoughtspot.com/docs/Interface_LiveboardViewConfig
     
    )) || <div>No dashboard ID set.</div>
  );
};

export default Dashboard;
