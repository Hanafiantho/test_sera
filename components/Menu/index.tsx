import {Menu as AntdMenu} from "antd"

type Props = {
    pathname: string
    items: {
        label: string
        key: string
        icon: any
    }[]
}

const Menu = ({pathname, items}:Props) => {
    return (
        <AntdMenu
            mode="inline"
            selectedKeys={[pathname]}
            style={{ height: '100%' }}
            items={items}
        />
    )
}

export default Menu