export default async function sitemap() {
    const baseUrl = "https://tod.gg";

    // const arrs = {};
    // const arrsUrls = arrs?.map((arr) => {
    //     return {
    //         url: `${baseUrl}/${arr.slug}`,
    //         lastModified: new Date()
    //     };
    // }) ?? [];

    const categories = [
        {
            url: `${baseUrl}/guild/크로아/지존`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/guild/스카니아/리더`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/아델`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/도적`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/토르`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/진격캐넌`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/명예훈장`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/팡이요`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/아크`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/알티`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/오지환`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/형님`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/청묘`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/주황맛감귤`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/공주`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/단솜`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/맑음`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/타락파워전사`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/수호`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char/페이커`,
            lastModified: new Date(),
        }
    ];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...categories
        // ...arrs2Urls
    ];
}