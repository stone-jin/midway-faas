import React, { FC, useRef, useState, useEffect } from 'react';
import { Avatar, Card, Col, List, Row } from 'antd';

import { findDOMNode } from 'react-dom';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';

interface ListProps {
  platformAndlist: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

export const List2: FC<ListProps> = props => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    platformAndlist: { list },
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: 'platformAndlist/fetch',
    });
  }, [1]);

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    const id = current ? current.id : '';

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: 'platformAndlist/submit',
      payload: { id, ...values },
    });
  };

  return (
    <div>
      <PageHeaderWrapper content='逐步支持国内外Serverless平台及私有化Serverless平台。'>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title='公有Serveless平台数量' value='2个平台' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='私有Serveless平台数量' value='规划中' bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title='支持的Baas能力' value='规划中' />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title='基本列表'
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <List
              size='large'
              rowKey='id'
              loading={loading}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      key='edit'
                      onClick={e => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape='square' size='large' />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      {visible && (
        <OperationModal
          done={done}
          current={current}
          visible={visible}
          onDone={handleDone}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default connect(
  ({
    platformAndlist,
    loading,
  }: {
    platformAndlist: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    platformAndlist,
    loading: loading.models.platformAndlist,
  }),
)(List2);
