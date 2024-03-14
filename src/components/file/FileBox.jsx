/** @jsxImportSource @emotion/react */
import Icon from '@ant-design/icons';
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { IconClose } from 'components/icon';
import { memo } from 'react';
import { useFileType } from 'hooks';

/**
 * @des File Box
 * @param {object} file
 * @param {function} Props.cutFn
 * @param {function} Props.downloadFn
 * @returns {JSX.Element}
 */
const FileBox = memo(({ file, downloadFn = null, cutFn = null }) => {
  // 获取文件的副檔名
  // const fileExt = file.name.split('.').pop();

  // const displayName =
  //   file.name.length > 16
  //     ? `${file.name.substring(0, 16)}...${fileExt}`
  //     : file.name;
  const { onGetFileIcon } = useFileType();
  return (
    <Flex
      justify="space-between"
      align="center"
      css={cssFileBox}
      onClick={downloadFn}
    >
      <Flex align="center" flex="1 1 auto" gap={5} className="info">
        <Flex justify="center" align="center" flex="0 0 30px" className="icon">
          <Icon component={onGetFileIcon(file.name)} style={{ fontSize: 20 }} />
        </Flex>
        <Flex align="center" flex="1 1 auto" className="fileStr">
          <p>{file.name}</p>
        </Flex>
      </Flex>
      <Flex align="center" flex="0 0 auto">
        {cutFn && (
          <IconClose
            wh={20}
            onClick={(e) => {
              e.stopPropagation();
              cutFn(file);
            }}
          />
        )}
      </Flex>
    </Flex>
  );
});

export { FileBox };

const cssFileBox = css`
  height: 40px;
  border-radius: 10px;
  background-color: var(--grey-20);
  padding: 5px;
  cursor: pointer;
  .info {
    .icon {
      width: 30px;
      height: 30px;
    }
    .fileStr {
      p {
        color: var(--grey-default);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
