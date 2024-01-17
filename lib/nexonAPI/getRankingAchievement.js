import { getYesterdayDate } from "../getYesterdayDate";

/**
 * 
 * @param {String} [ocid] 캐릭터 식별자
 * @param {int} [page] 페이지 번호
 * @returns 
 */
export const getRankingAchievement = async (ocid, page, selected_date) => {
    if (selected_date) {
        let tempDate = new Date(selected_date);
        if (tempDate <= new Date("2023-12-22")) tempDate = new Date("2023-12-22")
        selected_date = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, "0")}-${String(tempDate.getDate()).padStart(2, "0")}`;
    }
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/ranking/achievement");

        const params = {};
        params.date = selected_date || getYesterdayDate();
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