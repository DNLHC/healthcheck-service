export default function createRequestStatus({ httpClient }) {
  return async function ({ url }) {
    let status;
    try {
      const response = await httpClient(url, {
        throwHttpErrors: false,
        retry: Number(process.env.HTTP_RETRY_LIMIT) || 2,
      });
      status = response.statusCode;
    } catch (error) {
      status = 500;
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return status;
    }
  };
}
