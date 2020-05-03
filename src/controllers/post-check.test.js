// @ts-nocheck
import createPostCheck from './post-check';
import createFakeCheck from '../../__test__/fixtures/check';

describe('Post Check Controller', () => {
  it('Successfully posts check', async () => {
    const fakeCheck = await createFakeCheck();
    const postCheck = createPostCheck({ addCheck: (check) => check });

    const request = {
      headers: {
        'Content-Type': 'appliciation/json',
      },
      body: fakeCheck,
    };

    const expectedResponse = {
      statusCode: 201,
      body: fakeCheck,
      headers: {
        'Last-Modified': new Date(fakeCheck.modifiedAt).toUTCString(),
      },
    };

    const actualResponse = await postCheck(request);
    expect(actualResponse).toEqual(expectedResponse);
  });
});
