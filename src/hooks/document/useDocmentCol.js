import Icon from '@ant-design/icons';
import { Flex } from 'antd';
import { ReactComponent as IconForm } from 'assets/icon-form.svg';
import { ReactComponent as IconAMark } from 'assets/icon-mark.svg';
import { CusAvatar } from 'components';
import { useCommon, useFileType } from 'hooks';

/**
 * @description Document List Column
 * @param {string} topType
 * @returns
 */
const useDocmentCol = (topType) => {
  const isFolder = topType === 'folder';
  const { onGetFileIcon } = useFileType();
  const { EMPRTY_COLUMN } = useCommon();

  const license = !isFolder
    ? [
        { ...EMPRTY_COLUMN },
        {
          title: '版本',
          dataIndex: 'License',
          key: 'License',
          width: 50,
          ellipsis: true,
        },
      ]
    : [];

  const postDate = !isFolder
    ? [
        { ...EMPRTY_COLUMN },
        {
          title: '發佈日期',
          dataIndex: 'PsotDate',
          key: 'PsotDate',
          width: 80,
          ellipsis: true,
        },
      ]
    : [];

  const readed = !isFolder
    ? [
        { ...EMPRTY_COLUMN },
        {
          title: '觀看數',
          dataIndex: 'RealReadCunt',
          key: 'RealReadCunt',
          width: 50,
          ellipsis: true,
          render: (RealReadCunt, record) => {
            return (
              <p>
                {RealReadCunt}/{record.ReadCount}
              </p>
            );
          },
        },
      ]
    : [];

  const owner = !isFolder
    ? [
        { ...EMPRTY_COLUMN },
        {
          title: '擁有者',
          dataIndex: 'Owner',
          key: 'Owner',
          width: 120,
          ellipsis: true,
          render: (Owner, record) => {
            return (
              <Flex gap={12} align="center">
                <CusAvatar size={20} />
                {Owner?.Dep} {Owner?.Name}
              </Flex>
            );
          },
        },
      ]
    : [];

  return [
    {
      title: '名稱',
      dataIndex: 'Name',
      key: 'Name',
      width: isFolder ? '100%' : 480,
      ellipsis: true,
      render: (Name, record) => {
        return (
          <Flex align="center" gap={8}>
            {isFolder ? FolderIcon(record.Type) : FormIcon(Name, onGetFileIcon)}
            <div>{Name}</div>
          </Flex>
        );
      },
      // sortIcon: (e) => <SorterIcon event={e} />,
      //fixed: 'left',
    },
    ...license,
    ...postDate,
    ...readed,
    ...owner,
  ];
};

export { useDocmentCol };

/**
 * @description Form Icon
 * @param {string} name
 * @param {Function} getIcon
 * @returns {JSX.Element}
 */
const FormIcon = (name, getIcon) => {
  return <Icon component={getIcon(name)} style={{ fontSize: 15 }} />;
};

/**
 * @description Folder Icon
 * @param {string} type
 * @returns {JSX.Element}
 */
const FolderIcon = (type) => {
  return (
    <Icon
      component={type === 'folder' ? IconAMark : IconForm}
      style={{
        fontSize: 25,
      }}
    />
  );
};
