import { getYesterdayDate } from "../getYesterdayDate";

export const getRankingUnion = async (ocid) => {
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/ranking/union");
        const params = {
            "ocid": ocid,
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

        if (!response && !response.status === 200 && !response.statusText === 'OK') return {};

        return await response.json();
    } catch (err) {
        return {};
    }
}