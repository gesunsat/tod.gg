/**
 * 
 * @param {int} rankingType 랭킹 타입 (0:주간 명성치, 1:플래그 레이스, 2:지하 수로)
 * @param {int} [offset_minus_day] 특정 시간이 지났을 경우 몇일 전 Day 값을 뺄지, 기본 : 하루 전(1)
 * @param {int} [offset_hour] 해당 hour가 지나지 않았을 경우 오늘 날짜의 minus_day만큼 빼서 반환함, 기본 : 1시(1)
 * @param {int} [offset_minute] 해당 minute가 지나지 않았을 경우 오늘 날짜의 minus_day만큼 빼서 반환함, 기본 : 1분(1)
 * @returns 
 */
export const getYesterdayDate = (offset_minus_day = 1, offset_hour = 1, offset_minute = 1) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // 60 * 1000
    const koreaTimeDiff = 32400000; // 9 * 60 * 60 * 1000
    const korNow = new Date(utc + koreaTimeDiff);

    if (korNow.getHours() < offset_hour || (korNow.getHours() === offset_hour && korNow.getMinutes() < offset_minute))
        korNow.setDate(korNow.getDate() - (offset_minus_day + 1));
    else
        korNow.setDate(korNow.getDate() - (offset_minus_day));

    const refineReqDate = `${korNow.getFullYear()}-${String(korNow.getMonth() + 1).padStart(2, "0")}-${String(korNow.getDate()).padStart(2, "0")}`;

    return refineReqDate;
};