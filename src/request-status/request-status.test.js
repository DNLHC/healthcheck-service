// @ts-nocheck
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
    const httpClient = jest
      .fn()
      .mockRejectedValue(new Error('Internal Server Error'));
    const requestStatus = createRequestStatus({ httpClient });

    const result = await requestStatus({ url: 'https://google.com' });

    expect(result.status).toBe(500);
    expect(result.time).toBeNull();
  });
});
