const getParams = (query) => {
  if (query) {
    const queryString = query.search.split("?")[1];
    return queryString;
  }
};
export default getParams;
