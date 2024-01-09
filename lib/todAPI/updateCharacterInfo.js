import { getYesterdayDate } from "../getYesterdayDate";

export const updateCharacterInfo = async (ocid, character) => {
    try {
        if (!character?.characterBasic?.character_class) return;

        let characterCombatPower = 0;
        if (character?.characterStat?.final_stat && Object.keys(character?.characterStat?.final_stat).length >= 1) {
            character.characterStat.final_stat.reverse().forEach((stat) => stat.stat_name == "전투력" ? characterCombatPower = parseInt(stat.stat_value) : null);
        }

        const url = new URL(`${process.env.NEXT_PUBLIC_TOD_API_HOST}/scr/character_info`);
        const params = {
            "date": getYesterdayDate(),
            "ocid": ocid,
            "characterBasic": JSON.stringify(character?.characterBasic),
            "combat_power": characterCombatPower
        };
        url.search = new URLSearchParams(params).toString();
        const option = {
            method: "POST",
            headers: {
                "accept": "application/json",
            }
        };
        const response = await fetch(url, option);

        if (!response && !response.status === 200 && !response.statusText === 'OK') return {};

        return await response.json();
    } catch (err) {
        return {};
    }
}