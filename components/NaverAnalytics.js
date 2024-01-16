"use client"

import Script from "next/script";

export default function NaverAnalytics() {

    return (
        <>
            {process.env.NODE_ENV !== "development" && (
                <>
                    <Script
                        async
                        strategy="afterInteractive"
                        src={`https://wcs.naver.net/wcslog.js`}
                    />
                    <Script
                        id="naver-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!wcs_add) var wcs_add = {};
                                wcs_add["wa"] = "${process.env.NEXT_PUBLIC_NA_ID}";
                                if(window.wcs) {
                                wcs_do();
                                }
                            `,
                        }}
                    />
                </>
            )}
        </>
    )
}