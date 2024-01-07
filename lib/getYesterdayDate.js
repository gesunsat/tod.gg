export const getYesterdayDate = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const korNow = new Date(utc + koreaTimeDiff);

    if (korNow.getHours() < 1 || (korNow.getHours() === 1 && korNow.getMinutes() < 1))
        korNow.setDate(korNow.getDate() - 2);
    else
        korNow.setDate(korNow.getDate() - 1);

    const refineReqDate = `${korNow.getFullYear()}-${String(korNow.getMonth() + 1).padStart(2, "0")}-${String(korNow.getDate()).padStart(2, "0")}`;

    return refineReqDate;
};