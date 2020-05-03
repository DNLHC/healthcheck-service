export default function createRequestStatus({ httpClient }) {
  return async function ({ url }) {
    const result = {
      status: null,
      time: null,
    };

    try {
      const response = await httpClient(url, {
        throwHttpErrors: false,
        retry: Number(process.env.HTTP_RETRY_LIMIT) || 2,
      });

      result.status = response.statusCode;
      result.time = response.timings.phases.total;
    } catch (error) {
      result.status = 500;
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return result;
    }
  };
}
