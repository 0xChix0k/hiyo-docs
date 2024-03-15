/** @jsxImportSource @emotion/react */
import { Flex } from 'antd';
import { ReactComponent as IconBook } from 'assets/icon-book.svg';
import { ReactComponent as IconBox } from 'assets/icon-empty-box.svg';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { CusModal, CusSpin, CusTable, FolderDoc } from 'components';
import { DocContent } from 'components/modal/content';
import { useDocmentCol, useDocument } from 'hooks/document';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetFolder, useGetFolders } from 'services/documentService';
import { selectUser } from 'store/userSlice';
import { cssDocument } from './documentCss';

const Document = () => {
  const { userInfo } = useSelector(selectUser);
  const isMa = userInfo.role === 'manager';
  const isForm = true;
  const [openNoMA, setOpenNoMA] = useState(false);
  const [selectData, setSelectData] = useState(null);
  const { onGoSet } = useDocument();
  const { data: folders, isLoading, isSuccess } = useGetFolders();

  const [act, setAct] = useState({});
  useEffect(() => {
    if (isSuccess) {
      setAct({ Id: folders[0].Id, Name: folders[0].Name, type: 'folder' });
    }
  }, [isSuccess, folders]);
  const {
    data: folder,
    isLoading: folderLoading,
    isSuccess: folderSuccess,
  } = useGetFolder(act.Id);
  const sortData = folder?.Children.sort((a, b) => {
    const typeValue = (type) => {
      if (type === 'folder') return 1;
      if (type === 'form') return 2;
      return 3; // 預設值，如果有其他類型
    };

    return typeValue(a.Type) - typeValue(b.Type);
  });

  const columns = useDocmentCol(folder?.Type);

  return (
    <Flex css={cssDocument}>
      <Flex vertical flex="0 0 300px" className="left">
        {openNoMA && (
          <CusModal
            open={openNoMA}
            title={{
              text: '你必須擁有文件管理員權限才能設定\n請聯絡系統管理員',
            }}
            titleSize={20}
            onOk={() => setOpenNoMA(false)}
            okStr="知道了"
          />
        )}
        {selectData && (
          <CusModal
            open={selectData}
            title={{
              text: '',
              icon: <IconForm />,
            }}
            isClose={true}
            isFooter={false}
            onCancel={() => setSelectData(null)}
            h={640}
            content={<DocContent isMa={isMa} docData={selectData} />}
          />
        )}
        <Flex flex="0 0 auto" className="left-title">
          文件庫
        </Flex>
        <Flex
          vertical
          align={folders && isSuccess ? 'start' : 'center'}
          justify={folders && isSuccess ? 'start' : 'center'}
          flex="1 1 auto"
          className="left-list"
        >
          <CusSpin loading={isLoading} dotSize={20} />
          {isSuccess &&
            (!folders?.length ? (
              <Flex vertical align="center" gap={10} className="no-forms">
                <p className="des">
                  請先前往「表單設定」頁面進行表單相關設定。
                </p>
                <p className="btn" onClick={() => onGoSet(isMa, setOpenNoMA)}>
                  前往表單設定
                </p>
              </Flex>
            ) : (
              <FolderDoc list={folders} active={act} setActive={setAct} />
            ))}
        </Flex>
      </Flex>
      <Flex
        vertical
        flex="1 1 auto"
        gap={8}
        className="right"
        style={{ background: isForm ? 'white' : 'transparent' }}
      >
        {isForm && (
          <Flex flex="0 0 auto" className="right-title">
            {folder?.Name}
          </Flex>
        )}
        <Flex
          vertical
          flex="1 1 auto"
          justify={!isForm || !sortData?.length ? 'center' : 'start'}
          align={!isForm || !sortData?.length ? 'center' : 'start'}
          className="right-list"
        >
          {!isForm ? (
            <Flex
              vertical
              gap={16}
              justify="center"
              align="center"
              className="no-forms"
            >
              <IconBook className="book-icon" />
              <p className="des">此處將展示已申請並批准的相關文件和檔案。</p>
            </Flex>
          ) : (
            <>
              <CusSpin loading={folderLoading} />
              {!folderLoading &&
                folderSuccess &&
                (!!sortData?.length ? (
                  <CusTable
                    columns={columns}
                    data={sortData}
                    onRow={(record) =>
                      ['folder', 'form'].includes(record.Type)
                        ? setAct({
                            Id: record.Id,
                            Name: record.Name,
                            type: record.Type,
                          })
                        : setSelectData(record)
                    }
                    // loading={folderLoading}
                    sticky={true}
                  />
                ) : (
                  <Flex
                    vertical
                    gap={16}
                    justify="center"
                    align="center"
                    className="no-forms"
                  >
                    <IconBox className="book-icon" />
                    <Flex vertical justify="center" align="center" gap={8}>
                      <p className="no-form-title">這裡是空的</p>
                      <p className="des">這個類別尚未有任何資料</p>
                    </Flex>
                  </Flex>
                ))}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Document;
