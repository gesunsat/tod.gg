import { getYesterdayDate } from "../getYesterdayDate";

export const getGuildBasic = async (guildID, selected_date) => {
    if (selected_date) {
        const tempDate = new Date(selected_date);
        selected_date = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, "0")}-${String(tempDate.getDate()).padStart(2, "0")}`;
    }
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/guild/basic");
        const params = {
            "oguild_id": guildID,
            "date": selected_date || getYesterdayDate()
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