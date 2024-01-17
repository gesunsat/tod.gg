import { getYesterdayDate } from "../getYesterdayDate";

export const getGuildID = async (worldName, guildName, selected_date) => {
    if (selected_date) {
        const tempDate = new Date(selected_date);
        selected_date = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, "0")}-${String(tempDate.getDate()).padStart(2, "0")}`;
    }
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/guild/id");
        const params = {
            "world_name": worldName,
            "guild_name": guildName
        };
        url.search = new URLSearchParams(params).toString();
        const option = {
            method: "GET",
            headers: {
                "dummy-date": selected_date || getYesterdayDate(),
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