import { getYesterdayDate } from "../getYesterdayDate";

export const getGuildMembersInfo = async (members, oguild_id) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_TOD_API_HOST}/guild_members_info`);
        const params = {
            "date": getYesterdayDate(),
            "members": members,
            "oguild_id": oguild_id,
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
        return {};
    }
}