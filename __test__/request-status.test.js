import requestStatus from '../src/request-status';

describe('Request Status', () => {
  it('Requests a status', async () => {
    const result = await requestStatus({ url: 'https://google.com' });
    expect(result.status).toBe(200);
    expect(result.time).toBeDefined();
  });

  it('Returns a status code when throws', async () => {
    const result = await requestStatus({
      url: 'https://hopefullynonexistentwebsite1235.com',
    });

    expect(result.status).toBe(500);
    expect(result.time).toBeNull();
  });
});
