import { getYesterdayDate } from "../getYesterdayDate";

/**
 * 
 * @param {String} worldName 
 * @param {String} guildName 
 * @param {int} rankingType 0:주간 명성치, 1:플래그 레이스, 2:지하 수로
 * @returns 
 */
export const getRankingGuildOne = async (worldName, guildName, rankingType) => {
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/ranking/guild");
        const params = {
            "world_name": worldName,
            "guild_name": guildName,
            "ranking_type": rankingType,
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