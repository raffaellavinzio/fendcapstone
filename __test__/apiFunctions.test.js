import { parsePixabayData } from '../src/client/js/apiFunctions';

let data = {
  totalHits: 2,
  hits: [{ webformatURL: 'url' }]
};

const getApiDataMock = jest
  .fn()
  .mockImplementation(parsedData => parsePixabayData(data));

describe('tests for parsePixabayData function', () => {
  it('should return a parsed object if valid object parsed in', () => {
    const result = getApiDataMock(data);
    expect(getApiDataMock.mock.calls.length).toBe(1);
    expect(getApiDataMock).toBeCalledWith(data);
    expect(result).toEqual('url');
  });

  it('should return undefined if empty object passed in', () => {
    data = {};
    const result = getApiDataMock(data);
    // second time it is called
    expect(getApiDataMock.mock.calls.length).toBe(2);
    expect(getApiDataMock).toBeCalledWith(data);
    expect(result).toEqual('undefined');
  });
});
