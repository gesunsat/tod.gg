import { cache } from "react";
import { getYesterdayDate } from "../getYesterdayDate";

export const getAccountCharacters = cache(async (rankingUnion) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_TOD_API_HOST}/account_characters`);
        const params = {
            "date": getYesterdayDate(),
            "rankingUnion": JSON.stringify(rankingUnion)
        };
        url.search = new URLSearchParams(params).toString();
        const option = {
            method: "GET",
            headers: {
                "accept": "application/json",
            },
            next: {
                revalidate: 5
            }
        };
        const response = await fetch(url, option);

        if (!response && !response.status === 200 && !response.statusText === 'OK') return {};

        return await response.json();
    } catch (err) {
        return {};
    }
})