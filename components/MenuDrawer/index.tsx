import {Drawer} from "antd"

type Props = {
    open: boolean
    onClose: () => void
    children?: any
}

const MenuDrawer = ({open, onClose, children}:Props) => {
    return (
        <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={open}
            width="60%"
            bodyStyle={{padding: "20px 0px"}}
        >
            {children}
        </Drawer>
    )
}

export default MenuDrawer