"use client";

import { useEffect, useState } from "react";

/*
* Display page for any Liveboard, receiving the dashboardId variable from the URL
*/

import {
  SearchEmbed,
  useEmbedRef,
} from "@thoughtspot/visual-embed-sdk/react";

// Defines the expectation of the dashbaordId variable from the URL
interface Props {
  params: { reportId: string };
}

const Dashboard = ({ params }: Props) => {
  const [reportId, setReportId] = useState("");

  // Interactions with systems outside of React app get wrapped in useEffect()
  useEffect(() => {
    setReportId(params.reportId);
    {
      console.log(`Dashboard Id: ${params.reportId}`);
      setReportId(params.reportId);
    }
  }, [params.reportId]); // Only runs when dashboardId changes

  const embedRef = useEmbedRef<typeof SearchEmbed>();

  return (
    (reportId && (
      // ThoughtSpot LiveboardEmbed component with config properties. See https://developers.thoughtspot.com/docs/Interface_LiveboardViewConfig
      <SearchEmbed
        className="full-height"
        ref={embedRef}
        answerId={reportId}
        //showLiveboardTitle={true}
        //showLiveboardDescription={true}
        //visibleActions={[]}
      />
    
    )) || <div>No dashboard ID set.</div>
  );
};

export default Dashboard;
