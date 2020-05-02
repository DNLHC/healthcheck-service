export default function createRemoveCheck({ checksDb }) {
  return async function ({ id }) {
    if (!id) {
      throw new Error('You must supply an id.');
    }

    const checkToDelete = await checksDb.findById({ id });

    if (!checkToDelete) {
      return {
        deletedCount: 0,
        message: 'Check not found, nothing to delete.',
      };
    }

    await checksDb.remove({ id });

    return {
      deletedCount: 1,
      message: `Check with id of ${id} has been deleted.`,
    };
  };
}
