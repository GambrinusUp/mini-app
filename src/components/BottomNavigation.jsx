import {useNavigate, useLocation} from 'react-router-dom'
import {KeyOutline, UnorderedListOutline} from "antd-mobile-icons";
import {TabBar} from "antd-mobile";

function BottomNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const setRouteActive = (value) => {
        navigate(value);
    }

    const tabs = [
        {
            key: '/',
            title: 'Список ключей',
            icon: <KeyOutline />,
        },
        {
            key: '/requests',
            title: 'Мои заявки',
            icon: <UnorderedListOutline />,
        }
    ]

    const activeKey = tabs.find(tab => pathname === tab.key)?.key || '/';

    return (
        <TabBar activeKey={activeKey } onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    )
}

export default BottomNavigation;