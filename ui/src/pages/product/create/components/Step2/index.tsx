import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import request from '@/utils/request';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = props => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'productAndcreate/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'productAndcreate/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'productAndcreate/submitStepForm',
        payload: {
          ...data,
          ...values,
        },
      });
    }
    console.log(data);
    const result = await request('/api/product/create', {
      method: 'POST',
      data,
    });
    console.log('=====/api/product/create');
    console.log(result);
  };

  const { name, appName, description } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout='horizontal'
      className={styles.stepForm}
      initialValues={{ password: '123456' }}
    >
      <Descriptions column={1}>
        <Descriptions.Item label='项目名称'> {name}</Descriptions.Item>
        <Descriptions.Item label='英文名称'> {appName}</Descriptions.Item>
        <Descriptions.Item label='项目简介'> {description}</Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <div>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
          &nbsp;&nbsp;
          <Button type='primary' onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    productAndcreate,
    loading,
  }: {
    productAndcreate: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['productAndcreate/submitStepForm'],
    data: productAndcreate.step,
  }),
)(Step2);
