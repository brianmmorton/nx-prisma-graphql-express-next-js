import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import type { FormItemProps } from 'antd';
import gql from 'graphql-tag';
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

export const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraft($title: String!, $content: String!, $authorEmail: String!) {
    createDraft(data: { title: $title, content: $content }, authorEmail: $authorEmail) {
      id
    }
  }
`

export const CreatePost: React.FC = () => {
  const [form] = Form.useForm();
  const { mutate: createDraft } = useMutation(
    async () => request(
      'http://localhost:4000/graphql',
      CREATE_DRAFT_MUTATION,
      {
        ...form.getFieldsValue().post,
        authorEmail: 'alice@prisma.io'
      },
    ),
    {
      onSuccess() {
        form.resetFields();
      },
    }
  )

  const onFinish = () => createDraft();

  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish} form={form}>
      <MyFormItemGroup prefix={['post']}>
        <MyFormItem name="title" label="Title">
          <Input />
        </MyFormItem>
        <MyFormItem name="content" label="Content">
          <Input />
        </MyFormItem>
      </MyFormItemGroup>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};