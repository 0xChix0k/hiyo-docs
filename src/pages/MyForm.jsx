/**@jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import {
  CapsuleTabs,
  CusModal,
  CusRangePicker,
  CusSelect,
  CusSpin,
  CusTable,
} from 'components';
import { useConfirmProps, useDateOption, useModalProps } from 'hooks';
import { useMyFormCol } from 'hooks/myForm';
import { useEffect, useState } from 'react';
import { useGetMyForm, useGetMyForms } from 'services/myFormService';
import { cssMyForm } from './myFormCss';

const MyForm = () => {
  const [cusName, setCusName] = useState('日期範圍');
  const { myFormDates } = useDateOption(cusName);
  const [activeTab, setActiveTab] = useState(0);
  const [formDates, setFormDates] = useState(myFormDates[0].DValue);
  const [SelectId, setSelectId] = useState(myFormDates[0].Id);
  const [isOpen, setIsOpen] = useState(false);
  const [param, setParam] = useState({
    status: '',
    sDate: '',
    eDate: '',
  });
  const [myFormId, setMyFormId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState('');
  const [rejectRemark, setRejectRemark] = useState('');
  const [fData, setFData] = useState(null);
  const status = activeTab === 0 ? 'pending' : 'approved';

  useEffect(() => {
    SelectId !== 'custom' &&
      setFormDates(myFormDates.find((item) => item.Id === SelectId).DValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SelectId]);

  useEffect(() => {
    setParam({
      status: status,
      sDate: formDates[0],
      eDate: formDates[1],
    });
  }, [activeTab, formDates, status]);

  const { data: myFormList, isLoading, isSuccess } = useGetMyForms(param);
  const {
    data: myFormData,
    isLoading: dataLoading,
    isSuccess: dataSuccess,
  } = useGetMyForm(myFormId);

  useEffect(() => {
    if (dataSuccess) {
      setFData(myFormData);
    }
  }, [dataSuccess, myFormData]);

  const columns = useMyFormCol(status);
  const { mProps } = useModalProps(fData, setFData, setOpenConfirm);
  const { confirmProps } = useConfirmProps(
    openConfirm,
    setOpenConfirm,
    setMyFormId,
    rejectRemark,
    setRejectRemark
  );

  const onDateSelect = (v) => {
    if (v === 'custom') {
      setIsOpen(true);
    } else {
      setCusName('日期範圍');
    }
  };

  return (
    <Flex vertical align="center" css={cssMyForm}>
      {!!myFormId && dataSuccess && (
        <CusModal
          open={!!myFormId && dataSuccess}
          title={mProps?.title}
          isClose={mProps?.isClose}
          isFooter={mProps?.isFooter}
          onOk={mProps?.onOk}
          okStr={mProps?.okStr}
          onCancel={() => setMyFormId(null)}
          exFn={mProps?.exFn}
          exStr={mProps?.exStr}
          w={mProps.w}
          h={mProps.h}
          content={mProps?.content}
        />
      )}
      {!!openConfirm && (
        <CusModal
          open={!!openConfirm}
          title={confirmProps?.title}
          titleSize={20}
          onOk={confirmProps?.onOk}
          okStr={'核准'}
          exFn={confirmProps?.exFn}
          exStr={'退件'}
          onCancel={() => setOpenConfirm('')}
          cancelStr={'取消'}
          h={confirmProps?.h}
          content={confirmProps?.content}
        />
      )}
      <Flex vertical gap={30} className="my-form-container">
        <Flex align="center" flex="0 0 auto" className="title">
          我的表單
        </Flex>
        <Flex vertical flex="1 0 500" gap={20} className="form-div">
          <Flex
            justify="space-between"
            flex="0 0 auto"
            align="center"
            className="tool-div"
          >
            <CapsuleTabs
              tabs={['簽核中', '已核准']}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <div>
              <CusRangePicker
                value={formDates}
                onChange={(v) => {
                  setFormDates(v);
                  setCusName(v[0] + ' ~ ' + v[1]);
                }}
                isHiddenInput={true}
                openTrigger={true}
                isOpen={isOpen}
                setOpen={setIsOpen}
              />
              <div style={{ width: 240 }}>
                <CusSelect
                  value={SelectId}
                  options={myFormDates}
                  onChange={(v) => setSelectId(v)}
                  onSelect={onDateSelect}
                />
              </div>
            </div>
          </Flex>
          {isLoading && <CusSpin loading={true} dotSize={30} />}
          {!isLoading &&
            isSuccess &&
            (!!myFormList?.length ? (
              <CusTable
                data={myFormList}
                columns={columns}
                loading={isLoading || dataLoading}
                keyName="Id"
                onRow={(record) => setMyFormId(record.Id)}
              />
            ) : (
              <NoDataBySearch
                text={`沒有任何${
                  status === 'pending' ? '簽核中' : '已核准'
                }表單`}
              />
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyForm;

const NoDataBySearch = ({ text }) => {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={20}
      className="nodata"
      flex="1 1 auto"
    >
      <IconForm className="icon" />
      {text}
    </Flex>
  );
};
