import { getYesterdayDate } from "../getYesterdayDate";

/**
 * 
 * @param {String} [worldName] 월드 명
 * @param {int} [worldType] 월드 타입 (0:일반, 1:리부트) (기본 값은 0이며, world_name 입력 시 미 반영)
 * @param {String} [character_class] 직업 및 전직
 * @param {String} [ocid] 캐릭터 식별자
 * @param {int} [page] 페이지 번호
 * @example
 * 초보자-전체 전직
전사-전체 전직
전사-검사
전사-파이터
전사-페이지
전사-스피어맨
전사-크루세이더
전사-나이트
전사-버서커
전사-히어로
전사-팔라딘
전사-다크나이트
마법사-전체 전직
마법사-매지션
마법사-위자드(불,독)
마법사-위자드(썬,콜)
마법사-클레릭
마법사-메이지(불,독)
마법사-메이지(썬,콜)
마법사-프리스트
마법사-아크메이지(불,독)
마법사-아크메이지(썬,콜)
마법사-비숍
궁수-전체 전직
궁수-아처
궁수-헌터
궁수-사수
궁수-레인저
궁수-저격수
궁수-보우마스터
궁수-신궁
궁수-아처(패스파인더)
궁수-에인션트아처
궁수-체이서
궁수-패스파인더
도적-전체 전직
도적-로그
도적-어쌔신
도적-시프
도적-허밋
도적-시프마스터
도적-나이트로드
도적-섀도어
도적-세미듀어러
도적-듀어러
도적-듀얼마스터
도적-슬래셔
도적-듀얼블레이더
해적-전체 전직
해적-해적
해적-인파이터
해적-건슬링거
해적-캐논슈터
해적-버커니어
해적-발키리
해적-캐논블래스터
해적-바이퍼
해적-캡틴
해적-캐논마스터
기사단-전체 전직
기사단-노블레스
기사단-소울마스터
기사단-플레임위자드
기사단-윈드브레이커
기사단-나이트워커
기사단-스트라이커
기사단-미하일
아란-전체 전직
에반-전체 전직
레지스탕스-전체 전직
레지스탕스-시티즌
레지스탕스-배틀메이지
레지스탕스-와일드헌터
레지스탕스-메카닉
레지스탕스-데몬슬레이어
레지스탕스-데몬어벤져
레지스탕스-제논
레지스탕스-블래스터
메르세데스-전체 전직
팬텀-전체 전직
루미너스-전체 전직
카이저-전체 전직
엔젤릭버스터-전체 전직
초월자-전체 전직
초월자-제로
은월-전체 전직
프렌즈 월드-전체 전직
프렌즈 월드-키네시스
카데나-전체 전직
일리움-전체 전직
아크-전체 전직
호영-전체 전직
아델-전체 전직
카인-전체 전직
라라-전체 전직
칼리-전체 전직
 * @returns 
 */
export const getRankingOverall = async (worldName, worldType, character_class, ocid, page, selected_date) => {
    if (selected_date) {
        let tempDate = new Date(selected_date);
        if (tempDate <= new Date("2023-12-22")) tempDate = new Date("2023-12-22")
        selected_date = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, "0")}-${String(tempDate.getDate()).padStart(2, "0")}`;
    }
    try {
        const url = new URL("https://open.api.nexon.com/maplestory/v1/ranking/overall");

        const params = {};
        params.date = selected_date || getYesterdayDate();
        if (worldName != undefined) params.world_name = worldName;
        if (worldType != undefined) params.world_type = worldType;
        if (character_class != undefined) params.class = character_class;
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