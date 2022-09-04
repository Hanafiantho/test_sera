import React from 'react'
import {Modal, Form, Input, Row, Col, Button} from "antd"

type Props = {
    formType: "create" | "edit"
    visible: boolean
    data?: {
        id: number
        title: string
        content: string
    }
    toggle: () => void
    loading: boolean
    handleSubmit: (values:{title:string, content:string}, id:number) => void
}

const ModalFormArticle: React.FC<Props> = ({formType, visible, data, toggle, loading, handleSubmit}) => {
    return (
        <Modal 
            footer={null}
            visible={visible}
            closable={false}
        >
            <div style={{fontSize: 20, fontWeight: 500, marginBottom: 20}}>
                Form {formType === "create" ? "Create" : "Edit"}
            </div>
            <Form
                onFinish={(values) => handleSubmit(values, data ? data.id : 0)}
                layout="vertical"
                scrollToFirstError
            >
                <Form.Item
                    name="title"
                    label="Title"
                    initialValue={data?.title}
                    rules={[{ required: true, message: 'Please input title!', whitespace: true }]}
                >
                    <Input 
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    initialValue={data?.content}
                    rules={[{ required: true, message: 'Please input content!', whitespace: true }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Row justify='end'>
                    <Col>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                block 
                                size="large"
                                loading={loading}
                            >
                                {formType === "create" ? "Create" : "Update"}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col style={{paddingLeft: 5}}>
                        <Button 
                            type="primary" 
                            danger 
                            size='large' 
                            onClick={toggle}
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalFormArticle