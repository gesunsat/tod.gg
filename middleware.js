import { NextResponse } from 'next/server';

export async function middleware(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);

    if (requestHeaders.get("user-agent") == "ELB-HealthChecker/2.0") return NextResponse.next({ request: { headers: requestHeaders } });
    else if (requestHeaders.get("user-agent").indexOf("Amazon-Route53-Health-Check-Service") == 0) return NextResponse.next({ request: { headers: requestHeaders } });
    else {
        try {
            const logData = {
                "method": request.method,
                "url": (request.url).substring((request.url).indexOf(":3000/") + 5, request.url.length),
                "ip": requestHeaders.get("x-forwarded-for"),
                "headers": JSON.stringify(Object.fromEntries(requestHeaders.entries())),
                "query": JSON.stringify(Object.fromEntries(request.nextUrl.searchParams.entries()))
            };

            const url = new URL(`${process.env.NEXT_PUBLIC_TOD_API_HOST}/scr/logging`);
            const params = { "log": JSON.stringify(logData) };
            url.search = new URLSearchParams(params).toString();
            const option = {
                method: "POST",
                headers: { "accept": "application/json" }
            };
            fetch(url, option);
        } catch (e) { console.log(e); }

        return NextResponse.next({ request: { headers: requestHeaders } });
    }
}

export const config = {
    matcher: [
        /*
         * api (API 라우트)
         * _next/static (정적 파일)
         * _next/image (이미지 최적화 파일)
         * favicon.ico (파비콘 파일)
         * 로 시작하지 않는 모든 요청 경로와 일치합니다.
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}