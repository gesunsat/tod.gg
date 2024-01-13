import { getYesterdayDate } from "../getYesterdayDate";

/**
 * 
 * @param {String} [ocid] 캐릭터 식별자
 * @param {int} [page] 페이지 번호
 * @returns 
 */
export const getRankingAchievement = async (ocid, page) => {
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/ranking/achievement");

        const params = {};
        params.date = getYesterdayDate();
        if (ocid != undefined) params.ocid = ocid;
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