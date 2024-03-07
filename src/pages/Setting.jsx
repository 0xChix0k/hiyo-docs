/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconAdd } from 'assets/icon-add.svg';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { CusButton, CusCollpaseF } from 'components';
import { useGetFolders } from 'services/settingService';
import { cssSetting } from './settingCss';
import { useState } from 'react';

const Setting = () => {
  const { data: folders, isLoading, isSuccess } = useGetFolders();
  const [collId, setCollId] = useState('');
  console.log('collId', collId);
  return (
    <Flex css={cssSetting}>
      <Flex vertical flex="0 0 300px" className="setting-left">
        <Flex vertical gap={16} flex="0 0 auto" className="tool-div">
          <p className="title">表單設定</p>
          {!!folders?.length && (
            <CusButton
              text="新增類別"
              icon={<IconAdd className="btn-icon" />}
              bgColor="#F1F6FF"
              onClick={() => console.log('click')}
            />
          )}
        </Flex>
        {!!folders?.length ? (
          <Flex vertical flex="1 1 auto" className="list-div">
            <CusCollpaseF
              itemsData={folders}
              activeId={collId}
              setId={setCollId}
            />
          </Flex>
        ) : (
          <Flex
            vertical
            align="center"
            flex="1 1 auto"
            gap={16}
            className="noList-div"
          >
            <p className="des">讓我們從建立類別開始。</p>
            <CusButton
              text="新增類別"
              icon={<IconAdd className="btn-icon" />}
              bgColor="#F1F6FF"
              onClick={() => console.log('click')}
            />
          </Flex>
        )}
      </Flex>
      <Flex
        vertical
        justify={!!folders?.length ? 'start' : 'center'}
        align={!!folders?.length ? 'start' : 'center'}
        flex="1 1 auto"
        className="setting-right"
      >
        {!folders?.length ? (
          <Flex vertical justify="center" align="center" gap={16}>
            <IconForm width={50} height={50} />
            <p className="des">建立類別後，您可以在資料夾中新增表單</p>
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
};

export default Setting;
