import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux'

import { actionLogin } from '../redux/actions/actUser';

function LoginForm(props) {
  // console.log(props);
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight }}>
      <Form
        onFinish={handleSubmit}
        style={{ width: '100%' }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="on"
      >
        <h3 className="text-center mb-4">Login Form</h3>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Input size="large" name="email" onBlur={handleBlur} onChange={handleChange} placeholder="Enter your email" prefix={<UserOutlined />} />
          {touched.email && errors.email && <div className="text-danger mb-0 mt-2">{errors.email}</div>}

        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Input.Password size="large" name="password" onBlur={handleBlur} onChange={handleChange} placeholder="Enter your password" prefix={<LockOutlined />} />

          {touched.password && errors.password && <div className="text-danger mb-0 mt-2">{errors.password}</div>}
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ minWidth: 320 }}
          >
            Login
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 8,
          }}
        >
          <Button
            className="mr-3"
            type="primary"
            htmlType="button"
            size="large"
            shape="circle"
            style={{ backgroundColor: 'rgb(59,89,152)', borderColor: 'rgb(59,89,152)' }}
          >
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            shape="circle"
          >
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </Button>
        </Form.Item>

      </Form>
    </div >
  )
}

const LoginFormWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required').email('* Email is inValid'),
    password: Yup.string().required('Password is required').min(6, "Password at least 6 character").max(12, "Password less than 12 character"),
  }),
  handleSubmit: (values, {props, setSubmitting}) => {
    props.dispatch(actionLogin(values.email, values.password))
  },

  displayName: 'Login Form',
})(LoginForm);
export default connect()(LoginFormWithFormik);