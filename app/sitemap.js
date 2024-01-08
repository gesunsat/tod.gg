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
            url: `${baseUrl}/guild`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/char`,
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