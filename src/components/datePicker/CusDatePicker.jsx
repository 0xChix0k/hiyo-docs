/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ConfigProvider, DatePicker } from 'antd';
import localeEn from 'antd/es/date-picker/locale/en_US';
import localeZh from 'antd/es/date-picker/locale/zh_TW';
import { ReactComponent as IconCalendar } from 'assets/icon-calendar.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-tw';
import { useEffect, useState } from 'react';
import i18n from 'src/i18n';

const LNG = i18n.language;

const CusDatePicker = ({
  value,
  onChange,
  disabled = false,
  setOpen = null,
}) => {
  const [genValue, setGenValue] = useState(dayjs(value));
  const handleChange = (dates, dateStrings) => {
    // console.log('dates', dates);
    // console.log('dateStrings', dateStrings);
    setOpen && setOpen(false);
    onChange(dateStrings);
  };
  useEffect(() => {
    setGenValue(dayjs(value));
  }, [value]);

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
      <DatePicker
        value={genValue}
        onChange={handleChange}
        allowClear={false}
        locale={LNG === 'zh' ? localeZh : localeEn}
        disabled={disabled}
        format="YYYY-MM-DD"
        size="large"
        inputReadOnly={true}
        suffixIcon={<IconCalendar />}
        css={cssDatePicker}
      />
    </ConfigProvider>
  );
};

export { CusDatePicker };

const cssDatePicker = css`
  height: 40px !important;
  display: flex;
  align-items: center;
  cursor: pointer;
  .ant-picker-input {
    height: 100%;
    display: flex;
    align-items: center;
    input{
      cursor: pointer;
    }
  }
  .ant-picker-range-separator {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
