export default function createListChecks({ checksDb }) {
  return function (params) {
    return checksDb.findAll(params);
  };
}
