import { getYesterdayDate } from "../getYesterdayDate";

export const getCharOCID = async (characterName) => {
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/id");
        const params = { "character_name": characterName };
        url.search = new URLSearchParams(params).toString();
        const option = {
            method: "GET",
            headers: {
                "dummy-date": getYesterdayDate(),
                "accept": "application/json",
                "x-nxopen-api-key": process.env.NEXON_API_KEY
            }
        };
        const response = await fetch(url, option);

        if (!response && !response.status === 200 && !response.statusText === 'OK') return {};

        return await response.json();
    } catch (err) {
        console.log(err)
        return {};
    }
}