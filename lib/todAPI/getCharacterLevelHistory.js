export const getCharacterLevelHistory = async (character_name, timeFrom, timeTo) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_TOD_API_HOST}/character_level_history`);
        const params = {
            "character_name": character_name,
            "timeFrom": timeFrom,
            "timeTo": timeTo,
        };
        url.search = new URLSearchParams(params).toString();
        const option = {
            method: "GET",
            headers: {
                "accept": "application/json",
            }
        };
        const response = await fetch(url, option);

        return await response.json();
    } catch (err) {
        return [];
    }
}