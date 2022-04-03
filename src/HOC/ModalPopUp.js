import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actOpenModal, actCloseModal } from '../redux/actions/actModalPopUp'

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.css'

export default function ModalPopUp() {

  const { visible,componentContent, callBackSubmit, title } = useSelector(state => state.modalPopUpRenderer);
  const dispatch = useDispatch();
  const showDrawer = () => {
    dispatch(actOpenModal())
  };

  const onClose = () => {
    dispatch(actCloseModal())
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {componentContent}
      </Drawer>
    </>
  )
}
