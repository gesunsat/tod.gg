"use client"

import Script from "next/script";
import * as gtag from "@/lib/gtag";

export default function GoogleAnalytics() {

    if (process.env.NODE_ENV === "development") return;

    gtag.useGtag();

    return (
        <>
            <Script
                async
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag("js", new Date());
                        gtag("config", "${gtag.GA_TRACKING_ID}", {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}