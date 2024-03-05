
const useCommon = () => {


  /**
   * @description Get name by id
   * @param {string|number} value 
   * @param {Array<object>} data 
   * @param {string|number} id="Id" 
   * @param {string} name="Name" 
   * @returns 
   */
  const getNameById = (value, data, id="Id", name="Name") => {
    const item = data.find((item) => item[id] === value);
    return item ? item[name] : '';
  }


  return { getNameById };
}
export { useCommon };