import React from 'react';
import { Form, Button, Divider, Input, Select } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = props => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'productAndcreate/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'productAndcreate/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="项目名称"
          name="name"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input style={{ width: 'calc(100% - 100px)' }} placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item
          label="英文名称"
          name="appName"
          rules={[{ required: true, message: '请输入英文名称' }]}
        >
          <Input style={{ width: 'calc(100% - 100px)' }} placeholder="请输入英文名称" />
        </Form.Item>
        <Form.Item
          label="项目介绍"
          name="description"
          rules={[{ required: true, message: '请输入项目的简介信息' }]}
        >
          <Input style={{ width: 'calc(100% - 100px)' }} placeholder="请输入项目的简介信息" />
        </Form.Item>
        <Form.Item label="本地路径" name="path" rules={[{ required: true, message: '本地路径' }]}>
          <Input style={{ width: 'calc(100% - 100px)' }} placeholder="本地路径" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>转账到支付宝账户</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
        <h4>转账到银行卡</h4>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </div>
    </>
  );
};

export default connect(({ productAndcreate }: { productAndcreate: StateType }) => ({
  data: productAndcreate.step,
}))(Step1);
