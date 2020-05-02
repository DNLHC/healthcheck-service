export default function createPostCheck({ addCheck }) {
  return async function (httpRequest) {
    const posted = await addCheck(httpRequest.body);

    return {
      statusCode: 201,
      body: posted,
      headers: {
        'Last-Modified': new Date(posted.modifiedAt).toUTCString(),
      },
    };
  };
}
