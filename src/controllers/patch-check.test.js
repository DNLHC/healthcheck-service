import createPatchCheck from './patch-check';
import createFakeCheck from '../../__test__/fixtures/check';

describe('Patch Check Controller', () => {
  it('Successfully patches check', async () => {
    const fakeCheck = await createFakeCheck();
    const patchCheck = createPatchCheck({ editCheck: (check) => check });

    const request = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id: fakeCheck.id,
      },
      body: fakeCheck,
    };

    const expectedResponse = {
      statusCode: 200,
      body: fakeCheck,
      headers: {
        'Last-Modified': new Date(fakeCheck.modifiedAt).toUTCString(),
      },
    };

    const actualResponse = await patchCheck(request);
    expect(actualResponse).toEqual(expectedResponse);
  });
});
