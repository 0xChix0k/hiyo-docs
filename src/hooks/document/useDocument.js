import { useNavigate } from 'react-router-dom';

const useDocument = () => {
  const navigate = useNavigate();

  /**
   * @description Go to setting page
   * @param {boolean} isMa
   * @param {Function} setOpen
   * @returns {void}
   */
  const onGoSet = (isMa, setOpen) => {
    isMa ? navigate('/setting') : setOpen(true);
  };

  return { onGoSet };
};
export { useDocument };
