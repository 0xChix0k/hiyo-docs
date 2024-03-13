/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconAdd } from 'assets/icon-add.svg';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import {
  CusButton,
  CusCollpaseF,
  CusModal,
  CusSpin,
  CusTable,
} from 'components';
import {
  useEditProps,
  useFormProps,
  useSetFormsCol,
  useSetting,
} from 'hooks/settings';
import { useEffect, useRef, useState } from 'react';
import {
  useGetFolders,
  useGetFormData,
  useGetForms,
} from 'services/settingService';
import { cssSetting } from './settingCss';

const Setting = () => {
  const { iniFormData } = useSetting();
  const { data: folders, isLoading, isSuccess } = useGetFolders();
  const [collId, setCollId] = useState('');
  useEffect(() => {
    if (isSuccess) {
      setCollId(folders[0].Id);
      setFolderName(folders[0].Name);
    }
  }, [isSuccess, folders]);
  const [folderId, setFolderId] = useState('');
  const [formOpen, setFormOpen] = useState({ open: false, id: null });
  const [level, setLevel] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [extraAction, setExtraAction] = useState({
    action: 'rename',
    fName: '',
    place: [],
  });
  const {
    data: formList,
    isLoading: formLoading,
    isSuccess: formSuccess,
  } = useGetForms(collId);

  const {
    data: formData,
    isLoading: dataLoading,
    isSuccess: dataSuccess,
  } = useGetFormData(formOpen.id);
  const [newFormData, setNewFormData] = useState(iniFormData);
  useEffect(() => {
    if (dataSuccess) {
      setNewFormData(formData);
    }
  }, [dataSuccess, formData]);

  const columns = useSetFormsCol();
  const editRef = useRef(null);
  const { editProps } = useEditProps(
    editRef,
    extraAction,
    setFolderId,
    setAddOpen
  );
  const formRef = useRef(null);
  const sub1Ref = useRef(null);
  const sub2Ref = useRef(null);
  const sub3Ref = useRef(null);
  const { props } = useFormProps(
    [formRef, sub1Ref, sub2Ref, sub3Ref],
    formOpen.id,
    newFormData,
    setNewFormData,
    setFormOpen,
    level,
    setLevel,
    iniFormData
  );

  const handleAddCategory = () => {
    setAddOpen(true);
    setExtraAction({ action: 'add', fName: '', place: [175, 50] });
  };

  return (
    <Flex css={cssSetting}>
      {(folderId || addOpen) && (
        <CusModal
          open={folderId || addOpen}
          title={editProps?.title}
          titleSize={editProps?.titleSize}
          onOk={editProps?.onOk}
          okStr={editProps?.okStr}
          onCancel={editProps?.onCancel}
          cancelStr={editProps?.cancelStr}
          w={editProps?.w}
          h={editProps?.h}
          placement={editProps?.placement}
          content={editProps?.content}
        />
      )}
      {formOpen.open && (
        <CusModal
          open={formOpen.open}
          title={props?.title}
          isClose={props?.isClose}
          onOk={props?.onOk}
          okStr={props?.okStr}
          okBgColor={props?.okBgColor}
          onCancel={props?.onCancel}
          exFn={props?.exFn}
          exStr={props?.exStr}
          exType={props?.exType}
          exBgColor={props?.exBgColor}
          w={props?.w}
          h={props?.h}
          content={props?.content}
        />
      )}

      <Flex vertical flex="0 0 300px" className="setting-left">
        <Flex vertical gap={16} flex="0 0 auto" className="tool-div">
          <p className="title">表單設定</p>
          {!!folders?.length && (
            <CusButton
              text="新增類別"
              icon={<IconAdd className="btn-icon" />}
              bgColor="#F1F6FF"
              onClick={handleAddCategory}
            />
          )}
        </Flex>
        {!!folders?.length ? (
          <Flex vertical flex="1 1 auto" className="list-div">
            <CusCollpaseF
              itemsData={folders}
              activeId={collId}
              setId={setCollId}
              setFolderId={setFolderId}
              setName={setFolderName}
              setExtraAction={setExtraAction}
            />
          </Flex>
        ) : (
          <>
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
                onClick={handleAddCategory}
              />
            </Flex>
          </>
        )}
      </Flex>
      <Flex
        vertical
        justify={!!folders?.length && !!formList?.length ? 'start' : 'center'}
        align={!!folders?.length && !!formList?.length ? 'start' : 'center'}
        flex="1 1 auto"
        className="setting-right"
        style={{ background: !!folders?.length ? 'white' : 'var(--grey-20)' }}
      >
        <CusSpin loading={isLoading || formLoading} />
        {isSuccess &&
          formSuccess &&
          (!folders?.length ? (
            <Flex vertical justify="center" align="center" gap={16}>
              <IconForm width={50} height={50} />
              <p className="des">建立類別後，您可以在資料夾中新增表單</p>
            </Flex>
          ) : !!formList?.length ? (
            <>
              <Flex
                justify="space-between"
                align="center"
                flex="0 0 40px"
                className="title-div"
              >
                <div className="title">{folderName}</div>
                <CusButton
                  text="新增表單"
                  icon={<IconAdd />}
                  bgColor="#07CE6F"
                  onClick={() => console.log('click')}
                />
              </Flex>
              <CusTable
                data={formList}
                columns={columns}
                onRow={(record) => {
                  // console.log(record);
                  setLevel(1);
                  setFormOpen({ open: true, id: record.Id });
                }}
                loading={dataLoading}
                sticky={true}
              />
            </>
          ) : (
            <Flex vertical justify="center" align="center" gap={16}>
              <IconForm width={50} height={50} />
              <p className="des">開始添加一些新表單吧</p>
              <CusButton
                text="新增表單"
                icon={<IconAdd />}
                bgColor="#07CE6F"
                onClick={() => console.log('click')}
              />
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default Setting;
