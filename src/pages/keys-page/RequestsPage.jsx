import {Dialog, DotLoading, ErrorBlock, List, PullToRefresh, Tabs, Tag, Toast} from "antd-mobile";
import {sleep} from "antd-mobile/es/utils/sleep";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRequestsThunkCreator} from "../../store/bookingReducer";
import {requestStatus} from "../../constants/constants";

function RequestsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.bookingReducer.isLoading);
    const requests = useSelector((state) => state.bookingReducer.requests);
    const errors = useSelector((state) => state.bookingReducer.errors);

    useEffect(() => {
        dispatch(getRequestsThunkCreator('aafde073-e7ad-4492-8dbf-19df5d4f3c15'))
            .catch(() => console.log('err'));
    }, [dispatch]);

    return (
        <div>
            <Tabs style={{
                '--title-font-size': '14px'
            }}>
                <Tabs.Tab title='Принятые заявки' key='accept'>
                    <PullToRefresh
                        pullingText={'Потяните вниз для обновления'}
                        canReleaseText={'Отпустите'}
                        refreshingText={'Загрузка...'}
                        completeText={''}
                        onRefresh={async () => {
                            dispatch(getRequestsThunkCreator('aafde073-e7ad-4492-8dbf-19df5d4f3c15'))
                                .catch(() => console.log('err'));
                        }}
                    >
                    <List>
                        {errors && errors[0] === 'Network Error' ? (
                            <ErrorBlock status='disconnected'
                                        description='Попробуйте обновить страницу'
                                        title='Нет соединения с интернетом'
                            />
                        ) : (
                            ''
                        )}
                        {isLoading ? (
                            <List.Item>
                                <span style={{fontSize: 18}}>
                                    <DotLoading color="primary"/>
                                </span>
                            </List.Item>
                        ) : (
                            requests.length > 0 && requests
                                .filter(item => item.bidStatus === 1)
                                .map(item => (
                                    <List.Item key={item.bidId} clickable onClick={() =>
                                        Dialog.confirm({
                                            content: 'Подтвердить получение ключа?',
                                            onConfirm: async () => {
                                                await sleep(3000)
                                                Toast.show({
                                                    icon: 'success',
                                                    content: 'Ключ получен',
                                                    position: 'bottom',
                                                })
                                            },
                                            closeOnMaskClick: true,
                                            confirmText: 'Подтвердить',
                                            cancelText: 'Отмена'
                                        })
                                    }>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                            <span>
                                                {item.audienceName}
                                            </span>
                                                <span style={{fontSize: 14}}>
                                                {item.date.split('T')[0]}, {item.lessonNumber} пара
                                            </span>
                                            </div>
                                            <Tag color='success' style={{fontSize: 16}}>
                                                {requestStatus[item.bidStatus]}
                                            </Tag>
                                        </div>
                                    </List.Item>)))}
                    </List>
                    </PullToRefresh>
                </Tabs.Tab>
                <Tabs.Tab title='Активные заявки' key='active'>
                    <PullToRefresh
                        pullingText={'Потяните вниз для обновления'}
                        canReleaseText={'Отпустите'}
                        refreshingText={'Загрузка...'}
                        completeText={''}
                        onRefresh={async () => {
                            dispatch(getRequestsThunkCreator('aafde073-e7ad-4492-8dbf-19df5d4f3c15'))
                                .catch(() => console.log('err'));
                        }}
                    >
                    <List>
                        {errors && errors[0] === 'Network Error' ? (
                            <ErrorBlock status='disconnected'
                                        description='Попробуйте обновить страницу'
                                        title='Нет соединения с интернетом'
                            />
                        ) : (
                            ''
                        )}
                        {isLoading ? (
                            <List.Item>
                                <span style={{fontSize: 18}}>
                                    <DotLoading color="primary"/>
                                </span>
                            </List.Item>
                        ) : (
                            requests.length > 0 && requests
                                .filter(item => item.bidStatus === 0)
                                .map(item => (
                                    <List.Item key={item.bidId}>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                            <span>
                                                {item.audienceName}
                                            </span>
                                                <span style={{fontSize: 14}}>
                                                {item.date.split('T')[0]}, {item.lessonNumber} пара
                                            </span>
                                            </div>
                                            <Tag color='default' style={{fontSize: 16}}>
                                                {requestStatus[item.bidStatus]}
                                            </Tag>
                                        </div>
                                    </List.Item>
                                ))
                            )
                        }
                    </List>
                    </PullToRefresh>
                </Tabs.Tab>
                <Tabs.Tab title='История заявок' key='history'>
                    <PullToRefresh
                        pullingText={'Потяните вниз для обновления'}
                        canReleaseText={'Отпустите'}
                        refreshingText={'Загрузка...'}
                        completeText={''}
                        onRefresh={async () => {
                            dispatch(getRequestsThunkCreator('aafde073-e7ad-4492-8dbf-19df5d4f3c15'))
                                .catch(() => console.log('err'));
                        }}
                    >
                    <List>
                        {errors && errors[0] === 'Network Error' ? (
                            <ErrorBlock status='disconnected'
                                        description='Попробуйте обновить страницу'
                                        title='Нет соединения с интернетом'
                            />
                        ) : (
                            ''
                        )}
                        {isLoading ? (
                            <List.Item>
                                <span style={{fontSize: 18}}>
                                    <DotLoading color="primary"/>
                                </span>
                            </List.Item>
                        ) : (
                            requests.length > 0 && requests
                                .filter(item => item.bidStatus === 2)
                                .map(item => (
                                    <List.Item key={item.bidId}>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                            <span>
                                                {item.audienceName}
                                            </span>
                                                <span style={{fontSize: 14}}>
                                                {item.date.split('T')[0]}, {item.lessonNumber} пара
                                            </span>
                                            </div>
                                            <Tag color='danger' style={{fontSize: 16}}>
                                                {requestStatus[item.bidStatus]}
                                            </Tag>
                                        </div>
                                    </List.Item>
                                ))
                        )
                        }
                    </List>
                    </PullToRefresh>
                </Tabs.Tab>
            </Tabs>
        </div>
    )
}

export default RequestsPage;
