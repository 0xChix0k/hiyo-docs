const useStatus = () => {
  /**
   * @description Get the text of the status
   * @param {string} status
   * @returns {string}
   */
  const getText = (status) => {
    switch (status) {
      case 'pending':
        return '審核中';
      case 'approved':
        return '已核准';
      case 'rejected':
        return '退件';
      default:
        return '??';
    }
  };

  /**
   * @description Get the color of the status
   * @param {string} status
   * @returns {string}
   */
  const getColor = (status) => {
    switch (status) {
      case 'pending':
        return 'var(--blue-default)';
      case 'approved':
        return 'var(--primary-default)';
      case 'rejected':
        return 'var(--red-default)';
      default:
        return '#000000';
    }
  };

  return { getText, getColor };
};

export { useStatus };
