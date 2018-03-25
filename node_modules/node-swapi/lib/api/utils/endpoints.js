const {HOSTNAME} = require('./config');
const request = require('./request');

module.exports = (PATH) => {

  /**
   * Returns the list of resourses
   *
   * @return {Promise}
   */
  const list = () => {
    return request(HOSTNAME + PATH);
  }

  /**
   * Returns a resourse with given id
   *
   * @param {Number} id
   *
   * @return {Promise}
   */
  const get = (id) => {
    return request(HOSTNAME + PATH + id + '/');
  }

  /**
   * Get schema of resourse
   * 
   * @return {Promise}
   */
  const schema = () => {
    return request(HOSTNAME + PATH + 'schema');
  }

  /**
   * Search resourse by name term
   *
   * @param {String} term
   *
   * @return {Promise}
   */
  const find = (term) => {
    return request(HOSTNAME + PATH + '?search=' + term);
  }
  
  return {
    get,
    list,
    schema,
    find
  }
}