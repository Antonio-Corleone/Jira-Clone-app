import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, Row, Input } from 'antd';

import { Editor } from '@tinymce/tinymce-react';

import { actSubmitEditModal } from '../../redux/actions/actModalPopUp'

export default function FormEditProject() {
  const { visible, componentContent, callBackSubmit } = useSelector(state => state.modalPopUpRenderer);
  const dispatch = useDispatch();
  const handleEditorChange = (content, editor) => {
    console.log(content);
  }
  const submitForm = (e) => {
    e.preventDefault();
    alert('FormEditProject submit')
  }
  useEffect(() => {
    dispatch(actSubmitEditModal(submitForm))
  }, [])
  return (
    <Form onFinish={callBackSubmit} className="container-fluid" layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="id"
            label="Project id"
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="projectName"
            label="Project name"
          >
            <Input
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="projectCategory"
            label="Project Category"
          >
            <Input
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <label htmlFor="description">Description</label>
          <Editor
            name="description123"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </Col>
      </Row>
    </Form>
  )
}
