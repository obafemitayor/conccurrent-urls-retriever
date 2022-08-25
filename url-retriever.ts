import fetch from 'node-fetch';
const crypto = require('crypto');
const pLimit = require('./concurrent-limit');

let hashtable : Map<string,Promise<string>> = new Map<string,Promise<string>>()

const getUrlText = async (url: string) : Promise<string> => {
    try {
        new URL(url);
        const response = await fetch(url);
        return response.text();
    } catch (error: any) {
        if(error.code && error.code === 'ERR_INVALID_URL'){
            return 'Url is invalid, Append The Url with either a http:// or https:// and try again';
        }
        else{
            return 'An Error Occurred Fetching From This Url';
        }
    }
}


async function runInParallel (urls: string[], concurrency: number) : Promise<string[]> {
    if (urls.length === 0) {
        return [];
    }
    const concurrencyLimit = concurrency === 0 ? urls.length : concurrency;
    const limit = pLimit(concurrencyLimit);
    const promises = urls.map((url) => limit(() =>{
        const key = generateHashCode(url);
        if(!hashtable.has(key)){
            const response = getUrlText(url);
            hashtable.set(key, response)
            return response
        }
        else{
            return hashtable.get(key) as Promise<string>;
        }
    }));
    const results = Promise.all(promises);
    return results;
}

function generateHashCode(url : string) : string{
    return crypto.createHash('md5').update(url).digest("hex");
}

export { runInParallel };