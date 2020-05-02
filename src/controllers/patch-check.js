export default function createPatchCheck({ editCheck }) {
  return async function (httpRequest) {
    const patched = await editCheck({
      id: httpRequest.params.id,
      ...httpRequest.body,
    });

    return {
      statusCode: 200,
      body: patched,
      headers: {
        'Last-Modified': new Date(patched.modifiedAt).toUTCString(),
      },
    };
  };
}
