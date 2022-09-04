import React, {useState} from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {Form, Input, Button, notification, Row, Col} from "antd"
import AuthService from '../services/Auth.service';
import AuthLayout from "../templates/AuthLayout";

const Register = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleRegist = async(values:any) => {
    delete values.confirm
    
    setLoading(true)
    const res = await AuthService.regist(values)
    
    if (res.status === 200) {
      setLoading(false)
      notification["success"]({
        message: 'Yeay!',
        description:
          'Registration Success.',
      });
      // localStorage.setItem("")
      router.push("/article")
    } else if (res.status === 400) {
      setLoading(false)
      notification["error"]({
        message: 'Ups!',
        description:
          'Email is already used.',
      });
    } else {
      setLoading(false)
      notification["error"]({
        message: 'Ups!',
        description:
          `${res.statusText}`,
      });
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Register</title>
        <meta name="description" content="register page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthLayout title="Register" description="Please fill in this form to create an accoount!">
        <Form
          onFinish={handleRegist}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
          >
            <Input 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              size="large"
              maxLength={300}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              { min: 8, message: 'Password must be minimum 8 characters.' },
              {
                required: true,
                type: "regexp",
                pattern: new RegExp("(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)"),
                message: "Format is wrong"
              },
            ]}
            hasFeedback
          >
            <Input.Password 
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
              size="large"
            />
          </Form.Item>
          <Row justify="center" style={{marginBottom: 10}}>
            <Col>
                <Link href="/login">
                    <a>Already have an account?</a>
                </Link>
            </Col>
          </Row>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </AuthLayout>
    </React.Fragment>
  )
}

export default Register