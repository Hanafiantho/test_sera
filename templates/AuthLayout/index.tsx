import {Row, Col} from "antd"

type Props = {
    title: string
    description: string
    children: any
}

const AuthLayout: React.FC<Props> = ({title, description, children}) => {
    return (
        <Row align="middle" justify="center" style={{height: "100vh"}}>
            <Col 
                xs={22} sm={8} xl={6}
            >
                <div style={{marginBottom: 50}}>
                    <div style={{fontSize: 24, fontWeight: 600}}>{title}</div>
                    <div>{description}</div>
                </div>

                {children}
            </Col>
        </Row>
    )
}

export default AuthLayout