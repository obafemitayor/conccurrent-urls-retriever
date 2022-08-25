import { runInParallel } from "../url-retriever";
const INVALID_URL_ERROR = 'Url is invalid, Append The Url with either a http:// or https:// and try again'
const HTTP_FETCH_ERROR = 'An Error Occurred Fetching From This Url'
describe("test add function", () => {
  it("should make successful calls and return results for 2 valid urls with no concurrent limit", async () => {
    const urls : string[] = ['https://www.google.com/', 'https://www.facebook.com/'];
    const concurrencyNumber = 0;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(2);
    expect(result[0]).not.toBe(INVALID_URL_ERROR);
    expect(result[0]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[1]).not.toBe(INVALID_URL_ERROR);
    expect(result[1]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should make successful calls and return results for 5 valid urls with concurrent limit", async () => {
    const urls : string[] = [
    'https://www.google.com/', 
    'https://www.facebook.com/',
    'https://www.amazon.com/', 
    'https://stackoverflow.co/',
    'https://www.airbnb.com/'
    ];
    const concurrencyNumber = 2;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(5);
    expect(result[0]).not.toBe(INVALID_URL_ERROR);
    expect(result[0]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[1]).not.toBe(INVALID_URL_ERROR);
    expect(result[1]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[2]).not.toBe(INVALID_URL_ERROR);
    expect(result[2]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[3]).not.toBe(INVALID_URL_ERROR);
    expect(result[3]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[4]).not.toBe(INVALID_URL_ERROR);
    expect(result[4]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should make successful calls and return results for 3 valid urls and 2 invalid urls with concurrent limit", async () => {
    const urls : string[] = [
    'www.google.com', 
    'www.facebook.com',
    'https://www.amazon.com/', 
    'https://stackoverflow.co/',
    'https://www.airbnb.com/'
    ];
    const concurrencyNumber = 2;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(5);
    expect(result[0]).toBe(INVALID_URL_ERROR);
    expect(result[1]).toBe(INVALID_URL_ERROR);
    expect(result[2]).not.toBe(INVALID_URL_ERROR);
    expect(result[2]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[3]).not.toBe(INVALID_URL_ERROR);
    expect(result[3]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[4]).not.toBe(INVALID_URL_ERROR);
    expect(result[4]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should make successful calls and return results for 4 valid urls and 1 duplicate url with concurrent limit", async () => {
    const urls : string[] = [
        'https://www.google.com/', 
        'https://www.google.com/',
        'https://www.amazon.com/', 
        'https://stackoverflow.co/',
        'https://www.airbnb.com/'
    ];
    const concurrencyNumber = 2;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(5);
    expect(result[0]).not.toBe(INVALID_URL_ERROR);
    expect(result[0]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[1]).not.toBe(INVALID_URL_ERROR);
    expect(result[1]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[2]).not.toBe(INVALID_URL_ERROR);
    expect(result[2]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[3]).not.toBe(INVALID_URL_ERROR);
    expect(result[3]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[4]).not.toBe(INVALID_URL_ERROR);
    expect(result[4]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should make successful calls and return empty map for empty url array", async () => {
    const urls : string[] = [];
    const concurrencyNumber = 2;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(0);
  });
  it("should make successful calls and return for 1 Valid Url with no concurrent limit", async () => {
    const urls : string[] = ['https://www.google.com/'];
    const concurrencyNumber = 0;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(1);
    expect(result[0]).not.toBe(INVALID_URL_ERROR);
    expect(result[0]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should make successful calls and return for 1 Valid Url with concurrent limit", async () => {
    const urls : string[] = ['https://www.google.com/'];
    const concurrencyNumber = 5;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(1);
    expect(result[0]).not.toBe(INVALID_URL_ERROR);
    expect(result[0]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should make successful calls to same domain urls but different paths", async () => {
    const urls : string[] = [
      'https://www.google.com/',
      'https://www.google.com/search?q=facebook&sxsrf=ALiCzsYc4DmKWnToINOEQOhAZn9aQw0pzg%3A1658802187496&source=hp&ei=C1DfYpjDGuqrxc8P5M-p4AE&iflsig=AJiK0e8AAAAAYt9eG6AxVG5BpOCpCw3QVjwfSRv_mIPu&oq=fa&gs_lcp=Cgdnd3Mtd2l6EAEYADIECCMQJzIECCMQJzIECCMQJzIKCC4QxwEQ0QMQQzIICAAQgAQQsQMyCAgAEIAEELEDMhAIABCABBCHAhCxAxCDARAUMgUILhCABDIFCAAQsQMyCwgAEIAEELEDEIMBOgcIIxDqAhAnOgUIABCABDoOCC4QgAQQsQMQxwEQ0QNQgwdYiglgzBFoAXAAeACAAbIBiAHaApIBAzAuMpgBAKABAbABCg&sclient=gws-wiz'
    ];
    const concurrencyNumber = 0;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(2);
    expect(result[0]).not.toBe(INVALID_URL_ERROR);
    expect(result[0]).not.toBe(HTTP_FETCH_ERROR);
    expect(result[1]).not.toBe(INVALID_URL_ERROR);
    expect(result[2]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should make successful calls to urls that returns not successful http response e.g (404) but with data", async () => {
    const urls : string[] = [
      'https://www.medable.com/us'
    ];
    const concurrencyNumber = 0;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(1);
    expect(result[0]).not.toBe(INVALID_URL_ERROR);
    expect(result[0]).not.toBe(HTTP_FETCH_ERROR);
  });
  it("should return Error Text for faulty urls or urls that do not exist and hence would not have text response", async () => {
    const urls : string[] = [
      'https://www.stcksyyst.com/'
    ];
    const concurrencyNumber = 0;
    const result = await runInParallel(urls, concurrencyNumber);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(HTTP_FETCH_ERROR);
  });
});