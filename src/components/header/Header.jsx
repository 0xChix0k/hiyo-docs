/** @jsxImportSource @emotion/react */
import { PlusOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as IconSearch } from 'assets/icon-search.svg';
import { ReactComponent as IconSetting } from 'assets/icon-settings.svg';
import { CusAvatar, CusButton, TextInput } from 'components';
import { cssHeader } from './headerCss';
import { useState } from 'react';

const Header = () => {
  const [search, setSearch] = useState('');
  return (
    <Flex
      align="center"
      justify="space-between"
      flex={'0 0 60px'}
      css={cssHeader}
    >
      <Flex align="center" gap={10}>
        <Logo />
        <div style={{ wdth: 100 }}>tabs</div>
      </Flex>
      <Flex align="center" gap={20}>
        <Flex flex={'1 1 300px'}>
          <TextInput
            value={search}
            onChange={setSearch}
            placeholder="搜尋"
            prefix={<IconSearch />}
            suffix={<IconSetting />}
            radius="93px"
          />
        </Flex>
        <CusButton
          text="申請表單"
          icon={<PlusOutlined />}
          bgColor="var(--grey-default)"
          tColor="white"
          radius="33px"
        />
        <CusAvatar />
      </Flex>
    </Flex>
  );
};
export { Header };
