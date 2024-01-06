export const getCharacterByName = async (characterName) => {
    try {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
        const koreaTimeDiff = 9 * 60 * 60 * 1000;
        const korNow = new Date(utc + koreaTimeDiff);
        if (korNow.getHours() < 1 || (korNow.getHours() === 1 && korNow.getMinutes() < 1)) korNow.setDate(korNow.getDate() - 2);
        else korNow.setDate(korNow.getDate() - 1);
        const refineReqDate = `${korNow.getFullYear()}-${korNow.getMonth() + 1}-${korNow.getDate()}`;

        const resCharacter = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/char?name=${characterName}&reqDate=${refineReqDate}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // cache: "no-store"
        });
        if (resCharacter.status !== 200) return {}

        return await resCharacter.json();
    } catch (err) {
        console.log(err);
    }
}