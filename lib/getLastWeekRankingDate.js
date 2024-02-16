export const getLastWeekRankingDate = (day_offset = 1) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // 60 * 1000
    const koreaTimeDiff = 32400000; // 9 * 60 * 60 * 1000
    const korNow = new Date(utc + koreaTimeDiff);

    /* 현재 시간이 월요일 오전 8시 31분 이후일 경우 이번 주 월요일 날짜를 출력 */
    if (korNow.getDay() >= 2 || (korNow.getDay() == 1 && (korNow.getHours() >= 8 && korNow.getMinutes() >= 31)))
        korNow.setDate(korNow.getDate() - korNow.getDay() + day_offset);
    else
        korNow.setDate(korNow.getDate() - korNow.getDay() + day_offset - 7);

    const refineReqDate = `${korNow.getFullYear()}-${String(korNow.getMonth() + 1).padStart(2, "0")}-${String(korNow.getDate()).padStart(2, "0")}`;

    return refineReqDate;
};