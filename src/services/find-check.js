import ErrorResponse from '../utils/error-response';

export default function createFindCheck({ checksDb }) {
  return async function ({ id }) {
    if (!id) {
      throw new ErrorResponse('You must supply an id.', 400);
    }

    const found = await checksDb.findById({ id });

    if (!found) {
      throw new ErrorResponse(`Check was not found with id of ${id}.`, 401);
    }

    return found;
  };
}
