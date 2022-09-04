import React, {useState, useContext, useEffect} from "react"
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {Form, Input, Button, notification, Row, Col} from "antd"
import {Context} from "../context"
import AuthService from "../services/Auth.service"
import AuthLayout from "../templates/AuthLayout"
import {ILogin} from "../models/RegisterModel"

const Login = () => {
    const { state, dispatch }:any = useContext(Context);
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const handleLogin = async(values:ILogin) => {
        setLoading(true)
        const res = await AuthService.login(values)

        if (res.status === 200) {
            setLoading(false)
            localStorage.setItem("jwt", res.data.jwt)
            localStorage.setItem("username", res.data.user.username)
            dispatch({
                type: "SET_JWT",
                payload: res.data.jwt
            })
            dispatch({
                type: "LOGGED_IN_USER",
                payload: res.data.user
            })
            router.push("/article")
        } else if (res.status === 400) {
            setLoading(false)
            notification["error"]({
                message: 'Ups!',
                description:
                  'Wrong username or password.',
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

    useEffect(() => {
        state.jwt !== "" && router.push("/article")
    }, [state, router]);

    console.log(state);
    

    return (
        <React.Fragment>
            <Head>
                <title>Login</title>
                <meta name="description" content="login page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthLayout title="Login" description="Please login to your account">
                <Form
                    onFinish={handleLogin}
                    layout="vertical"
                    scrollToFirstError
                >
                    <Form.Item
                        name="identifier"
                        label="Username / Email"
                        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                    >
                        <Input 
                            size="large"
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
                        ]}
                    >
                        <Input.Password 
                            size="large"
                        />
                    </Form.Item>
                    <Row justify="center" style={{marginBottom: 10}}>
                        <Col>
                            <Link href="/register">
                                <a>Dont have an account?</a>
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
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </AuthLayout>
        </React.Fragment>
    )
}

export default Login