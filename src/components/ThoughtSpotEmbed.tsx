"use client";

// Wrapper component for embedding ThoughtSpot content in a React application.
import {
    AuthStatus,
    AuthType,
    customCssInterface, EmbedConfig,
    init,
} from "@thoughtspot/visual-embed-sdk";

import {getAuthToken} from "@/lib/utils";
import {constants, cssFiles} from "@/lib/constants";

export default function ThoughtSpotEmbed({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const tsInitialize = () => {
        console.log("Initializing ThoughtSpot SDK");

        // let customCss: customCssInterface;

        // Inline CSS customization for ThoughtSpot Components: https://developers.thoughtspot.com/docs/custom-css
        let customCss = {
            variables: {
                "--ts-var-button--primary-background": "black",
                "--ts-var-button--primary-color": "white",
                "--ts-var-button--primary--hover-background": constants.primaryColorCode,
                "--ts-var-button--secondary-background": "black",
                "--ts-var-button--secondary-color": "white",
                "--ts-var-button--secondary--hover-background": constants.primaryColorCode,
                "--ts-var-button-border-radius": "0px",
               "--ts-var-root-font-family": "Madimi One"
            },
            rules_UNSTABLE: {
                '/* ff-400 */ @font-face': {
                    'font-family': 'Madimi One',
                    'font-style': 'normal',
                    'font-weight': '400',
                    'font-display': 'swap',
                    'src': "url(https://fonts.gstatic.com/s/madimione/v1/2V0YKIEADpA8U6RygDnZVFMiB6PPZ2Q.woff2) format('woff2')"
                },
                // Table Headers
                ".ag-theme-alpine" : {
                    "font-family": 'Madimi One!important'
                },
                // Table Cells
                ".ag-cell": {
                    "font-family": "Madimi One!important"
                }
                
              }
            }
        /*
        * Replace any desired text: https://developers.thoughtspot.com/docs/customize-text
        */
        const stringsCustom = {
            "Go": "Search",
            "Liveboard": "Dashboard",
            "Spotter": "AI Analyst",
            //"your AI analyst": " "
        }
        
        // SVG Icon sprite replacement: https://developers.thoughtspot.com/docs/customize-icons
        const iconUrl = "https://cdn.jsdelivr.net/gh/thoughtspot/custom-css-demo/alternate-spotter-icon.svg";

        // init() function defines basic configuration and auth for all ThoughtSpot embed components
        // https://developers.thoughtspot.com/docs/Interface_EmbedConfig for all configurations
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
                    customCSS: customCss,
                },
                content: {
                    strings: stringsCustom
                },
                iconSpriteUrl: iconUrl
            },
        } as EmbedConfig);

        // Checks for Auth process completed as expected
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
