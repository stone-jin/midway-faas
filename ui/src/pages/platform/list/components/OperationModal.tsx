import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import { BasicListItemDataType } from '../data.d';
import styles from '../style.less';
import request from '@/utils/request';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = props => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  const [info, setInfo] = useState<any>(false);

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current?.id) {
      request(`/api/platform/config`, {
        params: {
          platform: current.id,
        },
      }).then(result => {
        setInfo(result.data);
        form.setFieldsValue({
          ...result.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (current) {
      // form.setFieldsValue({
      //   ...current,
      //   createdAt: current.createdAt ? moment(current.createdAt) : null,
      // });
    }
  }, [props.current]);

  const handleSubmit = async () => {
    if (!form) {
      return;
    }
    const errors = form.getFieldsError();
    for (const item of errors) {
      if (item.errors.length > 0) {
        return;
      }
    }
    const store = form.getFieldsValue();
    const result = Object.assign({}, info, store);
    const res = await request(`/api/platform/config/update`, {
      method: 'POST',
      data: {
        platform: 'aliyun',
        data: result,
      },
    });
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status='success'
          title='操作成功'
          subTitle='一系列的信息描述，很短同样也可以带标点。'
          extra={
            <Button type='primary' onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name='access_key_id'
          label='access_key_id'
          rules={[{ required: true, message: 'access_key_id' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='access_key_secret'
          label='access_key_secret'
          rules={[{ required: true, message: 'access_key_secret' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='endpoint'
          label='endpoint'
          rules={[{ required: true, message: 'endpoint' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='api_version'
          label='api_version'
          rules={[{ required: true, message: 'api_version' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `Serverless平台信息${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={800}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
