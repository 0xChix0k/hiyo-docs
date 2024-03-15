/** @jsxImportSource @emotion/react */
import { App, Flex } from 'antd';
import { ReactComponent as IconCheckRound } from 'assets/icon-check_round_w.svg';
import { ReactComponent as IconErr } from 'assets/icon-close.svg';
import { useDispatch } from 'react-redux';
import { setMesType } from 'store/commonSlice';

const useMessage = () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();


  /**
   * @description openMes
   * @param {string} str 
   * @param {string} type
   * @returns {void} 
   */
  const openMes = (str = 'NA', type = 'success') => {
    onMesType(type);
    message.open({
      duration: 2,
      key: Date.now(),
      style: {
        marginTop: '40px',
        height: '45px',
        fontSize: '16px',
        fontWeight: 600,
        color: type === 'success' ? 'white' : 'var(-red-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingInline: '0px 40px',
      },
      content: (
        <Flex align="center" gap={6} style={{ width: 330 }}>
          {type === 'success' ? (
            <IconCheckRound fill="#000" style={{ color: '#fff' }} />
          ) : (
            <IconErr />
          )}
          <p>{str}</p>
        </Flex>
      ),
    });
  };

  const onMesType = (type) => {
    dispatch(setMesType(type));
  };

  return { openMes };
};

export { useMessage };
