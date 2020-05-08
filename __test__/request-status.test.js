import requestStatus from '../src/request-status';

describe('Request Status', () => {
  it('Requests a status', async () => {
    const result = await requestStatus({ url: 'https://google.com' });
    expect(result.status).toBe(200);
    expect(result.time).toBeDefined();
  });

  it('Returns a error status', async () => {
    const result = await requestStatus({
      url: 'http://hopefullyanonexistentwebsite123.io',
    });

    expect(result.status).toBe('ENOTFOUND');
    expect(result.time).toBeDefined();
  });
});
