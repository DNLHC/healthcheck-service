// @ts-nocheck
import createRequestStatus from './request-status';

describe('Request Status', () => {
  it('Returns a status code', async () => {
    const httpClient = jest.fn().mockResolvedValue({
      statusCode: 200,
    });
    const requestStatus = createRequestStatus({ httpClient });

    const status = await requestStatus({ url: 'https://google.com' });
    expect(status).toBe(200);
  });

  it('Returns statsu code when throws', async () => {
    const httpClient = jest
      .fn()
      .mockRejectedValue(new Error('Internal Server Error'));
    const requestStatus = createRequestStatus({ httpClient });

    const status = await requestStatus({ url: 'https://google.com' });
    expect(status).toBe(500);
  });
});
