/**
 *  Fetch data from REST API via HTTP request.
 *
 * @param {string} endpoint.
 * @returns {JSON} response from API.
 */
 const getData = (endpoint) => {
    return fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => {
        throw new Error(
          `There was the following problem: ${err} while fetching ${endpoint}`
        );
      });
  };
  
  export { getData };
  