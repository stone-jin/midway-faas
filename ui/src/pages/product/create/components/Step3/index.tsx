import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step3: React.FC<Step3Props> = props => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const { appName, name, description } = data;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'productAndcreate/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const toProductInfo = () => {
    window.location.href = '/product/info';
  };
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="项目名称"> {name}</Descriptions.Item>
        <Descriptions.Item label="英文名称"> {appName}</Descriptions.Item>
        <Descriptions.Item label="项目描述"> {description}</Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        再创建一个项目
      </Button>
      <Button onClick={toProductInfo}>查看项目</Button>
    </>
  );
  return (
    <Result status="success" title="操作成功" extra={extra} className={styles.result}>
      {information}
    </Result>
  );
};

export default connect(({ productAndcreate }: { productAndcreate: StateType }) => ({
  data: productAndcreate.step,
}))(Step3);
