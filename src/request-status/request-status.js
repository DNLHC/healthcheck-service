export default function createRequestStatus({ httpClient }) {
  return async function ({ url }) {
    try {
      const response = await httpClient(url, {
        throwHttpErrors: false,
        retry: Number(process.env.HTTP_RETRY_LIMIT) || 2,
      });

      return {
        status: response.statusCode,
        time: response.timings.phases.total,
      };
    } catch (error) {
      return { status: error.code, time: error.timings.phases.total };
    }
  };
}
