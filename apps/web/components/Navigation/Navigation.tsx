import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: '',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'two',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation Three',
    key: 'three',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation Four',
    key: 'four',
    icon: <AppstoreOutlined />,
  },
];

export const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const router = useRouter()

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    router.push(`/${e.key}`);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}