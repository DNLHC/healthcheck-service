export default function createGetCheck({ findCheck }) {
  return async function (httpRequest) {
    const result = await findCheck({ id: httpRequest.params.id });

    return {
      body: result,
      statusCode: 200,
    };
  };
}
