export default function createGetChecks({ listChecks }) {
  return async function (httpRequest) {
    const list = await listChecks(httpRequest.params);

    return {
      body: list,
      statusCode: 200,
    };
  };
}
