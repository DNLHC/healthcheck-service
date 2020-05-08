import createRequestStatus from './request-status';

describe('Request Status', () => {
  it('Returns a status code', async () => {
    const httpClient = jest.fn().mockResolvedValue({
      statusCode: 200,
      timings: { phases: { total: 100 } },
    });
    const requestStatus = createRequestStatus({ httpClient });

    const result = await requestStatus({ url: 'https://google.com' });
    expect(result.status).toBe(200);
    expect(result.time).toBe(100);
  });

  it('Returns status code when throws', async () => {
    class RequestError extends Error {
      constructor(code, message) {
        super(message);
        this.code = code;
        this.timings = { phases: { total: 10 } };
      }
    }

    const httpClient = jest
      .fn()
      .mockRejectedValue(
        new RequestError('ENOTFOUND', 'getaddrinfo ENOTFOUND')
      );
    const requestStatus = createRequestStatus({ httpClient });

    const result = await requestStatus({ url: 'https://google.com' });

    expect(result.status).toBe('ENOTFOUND');
    expect(result.time).toBeDefined();
  });
});
