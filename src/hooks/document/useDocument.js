import { useNavigate } from 'react-router-dom';

const useDocument = () => {
  const navigate = useNavigate();

  const onGoSet = (isMa, setOpen) => {
    isMa ? navigate('/setting') : setOpen(true);
  };

  return { onGoSet };
};
export { useDocument };
