// url = 'http://localhost:3000/tours/title?ref=100&ref2=200&ref3=300'

const divideQueryByQuestionMark = (url) => url.split('?')[1];
const divideEachQueries = (stringQueryParams) =>
    stringQueryParams.split('&');
const queryParamsResult = (eachQueries) =>
    eachQueries.map(query => {
        const queryKey = query.split('=')[0];
        const queryValue = query.split('=')[1];
        return { [queryKey]: queryValue };
    });

// returns [{ ref = '100' },{ ref2 = '200' },{ ref3 = '300' }]
export const getQueryParams = (url) => {
    const stringQueryParams = divideQueryByQuestionMark(url);
    const eachQueries = divideEachQueries(stringQueryParams || "");
    const result = queryParamsResult(eachQueries);
    return result;
};

//
//
//

export const searchQueryParams = ({ query, queryParams, fullUrl }) => {
    if (queryParams) {
        const queryKeys = queryParams.map(keyValuePair => {
            const keys = Object.keys(keyValuePair); // ['ref']
            const values = Object.values(keyValuePair); // ['1']
            if (!keys.includes(query)) {
                return;
            } else {
                const targetIndex = keys.findIndex(key => key === query);
                const result = values[targetIndex];
                return result;
            }
        });
        const excludePossibleUndefined = queryKeys.filter(el => el !== undefined);
        return excludePossibleUndefined[0];
    } else if (fullUrl) {
        const queryParams = getQueryParams(fullUrl);
        const result = searchQueryParams({
            queryParams,
            query,
        });
        return result;
    } else {
        return undefined;
    }
};
