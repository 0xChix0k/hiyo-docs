/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, DatePicker } from 'antd';
import localeEn from 'antd/es/date-picker/locale/en_US';
import localeZh from 'antd/es/date-picker/locale/zh_TW';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-tw';
import i18n from 'src/i18n';
import dayjs from 'dayjs';

const LNG = i18n.language;

/**
 * @description Custom RangePicker
 * @param {dayjs} value
 * @param {function} onChange
 * @param {boolean} disabled = false
 * @param {boolean} isHiddenInput = false
 * @param {boolean} openTrigger = false
 * @param {boolean} isOpen = false
 * @returns
 */
const CusRangePicker = ({
  value,
  onChange,
  disabled = false,
  isHiddenInput = false,
  openTrigger = false,
  isOpen = false,
  setOpen = null,
}) => {
  const exProps = openTrigger
    ? {
        open: isOpen,
      }
    : null;

  const handleChange = (dates, dateStrings) => {
    // console.log('dates', dates);
    // console.log('dateStrings', dateStrings);
    setOpen && setOpen(false);
    onChange(dateStrings);
  };

  const objectValue = value.map((item) => {
    return item ? dayjs(item) : null;
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'var(--grey-20)',
          colorBorder: 'var(--grey-20)',
          borderRadiusLG: 10,
          borderRadius: 10,
          lineHeight: 1.5,
          colorTextPlaceholder: 'var(--grey-50)',
          fontSizeLG: 14,
        },
        components: {
          DatePicker: {
            activeBg: 'var(grey-20)',
            addonBg: 'var(--grey-20)',
            hoverBg: 'var(--grey-20)',
            hoverBorderColor: 'black',
            activeBorderColor: 'var(--blue-bright)',
            paddingInline: 14,
            paddingBlock: 11,
            cellActiveWithRangeBg: 'var(--primary-light)',
            cellHeight: 30,
            cellWidth: 30,
            cellHoverBg: 'var(--primary-default)',
          },
        },
      }}
    >
      <DatePicker.RangePicker
        {...exProps}
        value={objectValue}
        onChange={handleChange}
        locale={LNG === 'zh' ? localeZh : localeEn}
        disabled={disabled}
        format="YYYY-MM-DD"
        size="large"
        inputReadOnly={true}
        // separator="~"
        css={cssDatePicker}
        style={
          isHiddenInput
            ? { opacity: 0, width: 0, height: 0, position: 'absolute' }
            : {}
        }
      />
    </ConfigProvider>
  );
};

export { CusRangePicker };

const cssDatePicker = css`
  height: 40px !important;
  display: flex;
  align-items: center;
  .ant-picker-input {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .ant-picker-range-separator {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
