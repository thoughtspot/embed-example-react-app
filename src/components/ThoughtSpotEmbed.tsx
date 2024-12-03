"use client";

// Wrapper component for embedding ThoughtSpot content in a React application.
import {
  AuthStatus,
  AuthType,
  customCssInterface,
  init,
} from "@thoughtspot/visual-embed-sdk";

import { getAuthToken } from "@/lib/utils";
import { constants, cssFiles } from "@/lib/constants";

import { useStyle } from "../contexts/StyleContext";

export default function ThoughtSpotEmbed({
  children,
}: {
  children: React.ReactNode;
}) {
  const { style, setStyle } = useStyle();

  const tsInitialize = () => {
    console.log("Initializing ThoughtSpot SDK");

    let customCss: customCssInterface;
    if (style === "dark") {
      // dark mode requires a special CSS rule for tables.
      customCss = {
        rules_UNSTABLE: {
          ".bk-outline .ag-theme-alpine .ag-row": {
            color: "white",
          },
        },
      };
    } else {
      customCss = {};
    }

    customCss = {
      variables: {
       "--ts-var-button--primary-background": "black",
       "--ts-var-button--primary-color": "white",
       "--ts-var-button--primary--hover-background": "#EE0000",
       "--ts-var-button--secondary-background": "black",
       "--ts-var-button--secondary-color": "white",
       "--ts-var-button--secondary--hover-background": "#EE0000", 
     
       }
      }
    /*
    * Replace any desired text
    */
    const stringsCustom = {
      "Go": "Search",
      "Liveboard": "Dashboard",
      "Spotter": "Data Chat",
      //"your AI analyst": " "
    }

    const iconUrl = "https://cdn.jsdelivr.net/gh/bryanthowell-ts/bryanthowell-ts.github.io/icon_6.svg";

    // TODO - add a basic init
    const ee = init({
      thoughtSpotHost: constants.tsURL,
      authType: AuthType.None,
      username: constants.username,
      getAuthToken: () => {
        return getAuthToken(constants.username);
      },
      callPrefetch: true,
      customizations: {
        style: {
          customCSSUrl: cssFiles[style as keyof typeof cssFiles],
          customCSS: customCss,
        },
        content: {
          strings: stringsCustom
        },
        iconSpriteUrl: iconUrl
      },
    });

    if (ee) {
      ee.on(AuthStatus.SUCCESS, () => {
        console.log("Success");
      })
        .on(AuthStatus.SDK_SUCCESS, () => {
          console.log("SDK Success");
        })
        .on(AuthStatus.FAILURE, (reason) => {
          console.log("Failure:  " + reason);
        });
    }
  };

  tsInitialize();

  return (
    <div className="w-full h-full">
      <div className="w-full h-full" id="ts-embed">
        {children}
      </div>
    </div>
  );
}
