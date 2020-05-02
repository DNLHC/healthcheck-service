import ErrorResponse from '../utils/error-response';
export default function createRemoveCheck({ checksDb, scheduler }) {
  return async function ({ id }) {
    if (!id) {
      throw new ErrorResponse('You must supply an id.', 400);
    }

    const checkToDelete = await checksDb.findById({ id });

    if (!checkToDelete) {
      return {
        deletedCount: 0,
        message: 'Check not found, nothing to delete.',
      };
    }

    await checksDb.remove({ id });

    scheduler.destroy({ id });

    return {
      deletedCount: 1,
      message: `Check with id of ${id} has been deleted.`,
    };
  };
}
