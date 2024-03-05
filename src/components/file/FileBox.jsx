/** @jsxImportSource @emotion/react */
import Icon from '@ant-design/icons';
import { css } from '@emotion/react';
import { Flex } from 'antd';
import { ReactComponent as IconDoc } from 'assets/files/icon_doc_fills.svg';
import { ReactComponent as IconImg } from 'assets/files/icon_image_fills.svg';
import { ReactComponent as IconPDF } from 'assets/files/icon_pdf_fills.svg';
import { ReactComponent as IconPpt } from 'assets/files/icon_ppt_fills.svg';
import { ReactComponent as IconUnKnow } from 'assets/files/icon_unknown_fills.svg';
import { ReactComponent as IconVideo } from 'assets/files/icon_video_fills.svg';
import { ReactComponent as IconExcel } from 'assets/files/icon_xls_fills.svg';
import { IconClose } from 'components/icon';
import { memo } from 'react';

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

const onGetFileIcon = (fileName) => {
  const fileExt = fileName.split('.').pop().toLowerCase();
  if (fileExt === 'pdf') {
    return IconPDF;
  } else if (['jpg', 'jpeg', 'png'].includes(fileExt)) {
    return IconImg;
  } else if (['doc', 'docx'].includes(fileExt)) {
    return IconDoc;
  } else if (['xls', 'xlsx'].includes(fileExt)) {
    return IconExcel;
  } else if (['ppt', 'pptx'].includes(fileExt)) {
    return IconPpt;
  } else if (['mp4', 'wmv', 'mov'].includes(fileExt)) {
    return IconVideo;
  } else {
    return IconUnKnow;
  }
};
