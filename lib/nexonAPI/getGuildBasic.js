import { getYesterdayDate } from "../getYesterdayDate";

export const getGuildBasic = async (guildID) => {
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/guild/basic");
        const params = {
            "oguild_id": guildID,
            "date": getYesterdayDate()
        };
        url.search = new URLSearchParams(params).toString();
        const option = {
            method: "GET",
            headers: {
                "accept": "application/json",
                "x-nxopen-api-key": process.env.NEXON_API_KEY
            }
        };
        const response = await fetch(url, option);

        return await response.json();
    } catch (err) {
        return {};
    }
}