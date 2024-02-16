import { getYesterdayDate } from "../getYesterdayDate";

/**
 * 
 * @param {int} rankingType 랭킹 타입 (0:주간 명성치, 1:플래그 레이스, 2:지하 수로)
 * @param {String} [worldName] 월드 명
 * @param {int} [page] 페이지 번호
 * @param {String} [guildName] 길드 명
 * @param {String} [selected_date] 날짜
 * @returns 
 */
export const getRankingGuild = async (rankingType, worldName, page, guildName, selected_date) => {
    if (selected_date) {
        let tempDate = new Date(selected_date);
        if (tempDate <= new Date("2023-12-22")) tempDate = new Date("2023-12-22")
        selected_date = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, "0")}-${String(tempDate.getDate()).padStart(2, "0")}`;
    }
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/ranking/guild");

        const params = {};
        params.date = selected_date || getYesterdayDate(0, 8, 31);
        params.ranking_type = rankingType;
        if (worldName != undefined) params.world_name = worldName;
        if (guildName != undefined) params.guild_name = guildName;
        if (page != undefined) params.page = page;

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