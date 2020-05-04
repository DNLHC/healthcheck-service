export default function createDeleteCheck({ removeCheck }) {
  return async function (httpRequest) {
    const result = await removeCheck({ id: httpRequest.params.id });

    return {
      statusCode: result.deletedCount === 0 ? 404 : 200,
      body: result,
    };
  };
}
