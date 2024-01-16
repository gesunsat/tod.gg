import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url) => {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};

export const event = (
    action,
    { event_category, event_label, value },
) => {
    window.gtag("event", action, {
        event_category,
        event_label,
        value,
    });
};

export const useGtag = () => {
    const pathname = usePathname();

    const savedPathNameRef = useRef(pathname);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") return;

        const handleRouteChange = (url) => {
            pageview(url);
        };

        if (savedPathNameRef.current !== pathname) {
            handleRouteChange(new URL(pathname, window.location.origin));
            savedPathNameRef.current = pathname;
        }
    }, [pathname,]);
};