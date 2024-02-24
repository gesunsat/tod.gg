import { getYesterdayDate } from "../getYesterdayDate";

export const updateCharacterHistory = async (character_name) => {
    try {
        if (!character_name) return;

        const url = new URL(`${process.env.NEXT_PUBLIC_TOD_API_HOST}/update_character_history`);
        const params = {
            "character_name": character_name
        };
        url.search = new URLSearchParams(params).toString();
        const option = {
            method: "POST",
            headers: {
                "dummy-date": getYesterdayDate(),
                "accept": "application/json",
            }
        };
        const response = await fetch(url, option);

        return await response.json();
    } catch (err) {
        return {};
    }
}