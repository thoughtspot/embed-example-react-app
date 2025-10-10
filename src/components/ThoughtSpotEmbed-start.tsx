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

            }
        }
        /*
        * Replace any desired text: https://developers.thoughtspot.com/docs/customize-text
        */
        const stringsCustom = {

        }
        
        // SVG Icon sprite replacement: https://developers.thoughtspot.com/docs/customize-icons
        const iconUrl = "";

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
