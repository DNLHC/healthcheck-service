export default function buildCreateHandleCheck() {
  return function ({ id }) {
    return function () {
      console.log(`Running check for ${id}`);
    };
  };
}
