import Script from "next/script";

export default function GoogleADSense() {

    if (process.env.NODE_ENV === "development") return;

    return (
        <Script
            async
            strategy="afterInteractive"
            crossorigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_MC_ID}`}
        />
    )
}