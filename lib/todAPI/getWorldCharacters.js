import { cache } from "react";
import { getYesterdayDate } from "../getYesterdayDate";

export const getWorldCharacters = cache(async (worldName, characterName) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_TOD_API_HOST}/world_characters`);
        const params = {
            "date": getYesterdayDate(),
            "world_name": worldName,
            "character_name": characterName
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

        return await response.json();
    } catch (err) {
        return [];
    }
})