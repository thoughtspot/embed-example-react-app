"use client";

import { useEffect, useState } from "react";

import {
  LiveboardEmbed,
  useEmbedRef,
} from "@thoughtspot/visual-embed-sdk/react";

interface Props {
  params: { dashboardId: string };
}

const Dashboard = ({ params }: Props) => {
  const [dashboardId, setDashboardId] = useState("");

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
      <LiveboardEmbed
        className="full-height"
        ref={embedRef}
        liveboardId={dashboardId}
        showLiveboardTitle={true}
        showLiveboardDescription={true}
        visibleActions={[]}
      />
    )) || <div>No dashboard ID set.</div>
  );
};

export default Dashboard;
