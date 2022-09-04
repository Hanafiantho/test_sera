import {useContext, useState} from "react"
import {Row, Col, Button, Layout, Breadcrumb} from "antd"
import {SnippetsOutlined, LogoutOutlined, MenuOutlined} from "@ant-design/icons"
import {Context} from "../../context"
import {PathName} from "../../helpers/PathName"
import MenuDrawer from "../../components/MenuDrawer"
import Menu from "../../components/Menu"

type Props = {
    children?: any
}

const DashboardLayout:React.FC<Props> = ({children}) => {
    const { dispatch }:any = useContext(Context);
    const pathname = PathName()
    const { Header, Content, Sider } = Layout;
    const [visible, setVisible] = useState<boolean>(false)

    const handleLogout = () => {
        localStorage.clear()
        dispatch({
            type: "SET_JWT",
            payload: ""
        })
    }

    return (
        <Layout>
            <Header className="header" style={{backgroundColor: "#096dd9", padding: "0px 25px"}}>
                <Row justify="end">
                    <Col xs={12} sm={12} md={0}>
                        <MenuOutlined 
                            style={{color: "white", fontSize: 16}}
                            onClick={() => setVisible(true)} 
                        />
                        <MenuDrawer
                            open={visible}
                            onClose={() => setVisible(false)}
                        >
                            <Menu 
                                pathname={pathname}
                                items={[
                                    { label: 'Article', key: 'article', icon: <SnippetsOutlined /> }
                                ]}
                            />
                        </MenuDrawer>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <Button 
                            icon={<LogoutOutlined />} 
                            ghost
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '20px 25px' }}>
                <Breadcrumb style={{ marginBottom: '16px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>{pathname}</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0', height: "calc(100vh - 142px)", backgroundColor: "#fff", overflow: "auto" }}>
                    <Sider 
                        breakpoint="md"
                        collapsedWidth="0"
                        zeroWidthTriggerStyle={{display: "none"}}
                        width={200}
                    >
                        <Menu 
                            pathname={pathname}
                            items={[
                                { label: 'Article', key: 'article', icon: <SnippetsOutlined /> }
                            ]}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', height: "calc(100vh-118px)", overflow: "auto" }}>
                        {children}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default DashboardLayout