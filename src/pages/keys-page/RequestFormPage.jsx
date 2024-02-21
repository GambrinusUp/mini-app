import styles from './keys-page.module.css'
import {useEffect, useState} from "react";
import {
    Button,
    CenterPopup,
    CheckList,
    DatePicker, DotLoading,
    Modal,
    NavBar,
    Popup, Result,
    SearchBar,
    Selector
} from "antd-mobile";
import {CalendarOutline, ClockCircleOutline} from "antd-mobile-icons";
import {findRange, times} from "../../constants/constants";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getKeysThunkCreator} from "../../store/keysReducer";
import {bookingAPI} from "../../api/bookingAPI";
import {getUsersThunkCreator} from "../../store/userReducer";

function RequestFormPage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.keysReducer.keys);
    const users = useSelector((state) => state.userReducer.users);
    const isLoading = useSelector((state) => state.userReducer.isLoading);
    const [selectedOption, setSelectedOption] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [selected, setSelected] = useState(items.length > 0 ? items[0].keyId : null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchTextUser, setSearchTextUser] = useState('');
    const navigate = useNavigate();

    const options2 = times.map(({ id, range }) => ({
        value: id,
        label: range,
    }));

    const [currentTime, setCurrentTime] = useState(moment());
    const [selectedTime, setSelectedTime] = useState(findCurrentRangeIndex(currentTime));

    const filteredItems = searchText
        ? items.filter(item => item.audeinceName.includes(searchText))
        : items;

    const searchWords = searchTextUser.toLowerCase().split(' ');

    const filteredItemsUser = searchTextUser
        ? users.filter(item => {
            const fullName = item.name.toLowerCase();
            return searchWords.every(word => fullName.includes(word));
        })
        : users;

    const options = [
        {
            label: 'Забронировать ключ',
            value: '1',
        },
        {
            label: 'Передать ключ',
            value: '2',
        }
    ];

    function findCurrentRangeIndex(currentTime) {
        const currentMoment = moment(currentTime, 'HH:mm');
        for (let i = 0; i < findRange.length; i++) {
            const [start, end] = findRange[i].split('-').map(range => moment(range, 'HH:mm'));
            if (
                (currentMoment.isSameOrAfter(start) && currentMoment.isSameOrBefore(end))
            ) {
                return i === 0 ? i + 1 : i;
            }
        }
        return 1;
    }

    const createRequest = () => {
        console.log(selected, currentTime, selectedTime);
        if(selected !== null && currentTime !== null && selectedTime !== null) {
            console.log('aafde073-e7ad-4492-8dbf-19df5d4f3c15', selected,  //  80ec984b-9e87-4cfd-affb-5110aeb43972
                moment(currentTime).format("YYYY-MM-DD"), selectedTime);
            bookingAPI.createRequest('aafde073-e7ad-4492-8dbf-19df5d4f3c15', selected,  //  80ec984b-9e87-4cfd-affb-5110aeb43972
                moment(currentTime).format("YYYY-MM-DD"), selectedTime).then(() => {
                    setVisible3(true);
                    setTimeout(() => {
                        setVisible3(false);
                    }, 1500);
            });
        }
    }

    useEffect(() => {
        dispatch(getKeysThunkCreator(moment(currentTime).format('YYYY-MM-DD'), selectedTime));
    }, [dispatch, currentTime, selectedTime]);

    return (
        <div className={styles.mainWrapper2} style={{justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection: "column", paddingLeft: 5, paddingRight: 5}}>
                <NavBar
                    onBack={() => navigate('/')}
                >
                    Создание заявки
                </NavBar>
                <span style={{paddingTop: 20, fontSize: 16}}>
                    Выберите тип заявки
                </span>
                <Selector
                    style={{paddingTop: 10}}
                    options={options}
                    value={[selectedOption]}
                    onChange={(arr, extend) => {
                        if (arr.length) {
                            setSelectedOption(arr[0]);
                        }
                    }}
                />
                {selectedOption && selectedOption === "1" && (
                    <>
                        <span style={{paddingTop: 20, fontSize: 16}}>
                            Выберите дату и время
                        </span>
                        <div style={{display: "flex", gap: 10, paddingTop: 10}}>
                            <Button onClick={() => {
                                setVisible2(true)
                            }}>
                                <CalendarOutline style={{paddingRight: 5}}/>
                                {currentTime.format('DD.MM.YY')}
                            </Button>
                            <Button
                                onClick={() => {
                                    Modal.alert({
                                        title: 'Выберите время',
                                        content: (
                                            <>
                                                <Selector
                                                    columns={2}
                                                    options={options2}
                                                    defaultValue={[selectedTime]}
                                                    onChange={(arr, extend) => {
                                                        console.log(arr, extend.items);
                                                        if (arr.length > 0)
                                                            setSelectedTime(extend.items[0].value);
                                                    }}
                                                />
                                            </>
                                        ),
                                        closeOnMaskClick: true,
                                        confirmText: 'Принять'
                                    })
                            }}>
                                <ClockCircleOutline style={{paddingRight: 5}} />
                                {times.find(time => time.id === selectedTime).range}
                            </Button>
                        </div>
                        <DatePicker
                            title='Выбрать дату'
                            visible={visible2}
                            min={new Date()}
                            onClose={() => {
                                setVisible2(false)
                            }}
                            onConfirm={(val) => {
                                setCurrentTime(moment(val));
                            }}
                            confirmText={'Выбрать'}
                            cancelText={'Отмена'}
                        />
                        <span style={{paddingTop: 20, fontSize: 16}}>
                            Выберите аудиторию
                        </span>
                        <div style={{display: "flex", gap: 10, paddingTop: 10, flexDirection: "column"}}>
                            <span style={{fontSize: 16}}>
                                {items.length > 0 && selected && items.find(item => item.keyId === selected) ? (
                                    'Аудитория: ' + items.find(item => item.keyId === selected).audeinceName
                                ) : (
                                    <DotLoading color='primary' />
                                )}
                            </span>
                            <Button
                                color='primary'
                                size='middle'
                                onClick={() => {
                                    setVisible(true)
                                }}
                                style={{width: '50%'}}
                            >
                                Выбрать аудиторию
                            </Button>
                        </div>
                        <Popup
                            visible={visible}
                            onMaskClick={() => {
                                setVisible(false)
                            }}
                            destroyOnClose
                        >
                            <div className={styles.searchBarContainer}>
                                <SearchBar
                                    placeholder='Наберите номер аудитории'
                                    value={searchText}
                                    onChange={v => {
                                        setSearchText(v)
                                    }}
                                />
                            </div>
                            <div className={styles.checkListContainer}>
                                <CheckList
                                    className={styles.myCheckList}
                                    defaultValue={selected ? [selected] : []}
                                    onChange={val => {
                                        console.log(val[0]);
                                        setSelected(val[0])
                                        setVisible(false)
                                    }}
                                >
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map(item => (
                                            <CheckList.Item
                                                key={item.keyId}
                                                value={item.keyId}
                                            >
                                                {item.audeinceName}
                                            </CheckList.Item>
                                        ))
                                    ) : (
                                        <span style={{ fontSize: 24 }}>
                                            <DotLoading color="primary"/>
                                        </span>
                                    )}
                                </CheckList>
                            </div>
                        </Popup>
                    </>
                )}
                {selectedOption && selectedOption === "2" && (
                    <>
                        <span style={{paddingTop: 20, fontSize: 16}}>
                            Выберите пользователя
                        </span>
                        <div className={styles.searchBarContainer}>
                            <SearchBar
                                placeholder='Наберите имя пользователя'
                                value={searchTextUser}
                                onChange={v => {
                                    setSearchTextUser(v)
                                }}
                                onSearch={val => {
                                    dispatch(getUsersThunkCreator(val));
                                }}
                            />
                        </div>
                        <div className={styles.checkListContainer}>
                            <CheckList
                                className={styles.myCheckList}
                                defaultValue={selectedUser ? [selectedUser] : []}
                                onChange={val => {
                                    console.log(val[0]);
                                    setSelectedUser(val[0]);
                                }}
                            >
                                {!isLoading ? (
                                    filteredItemsUser.map(item => (
                                        <CheckList.Item
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </CheckList.Item>
                                    ))
                                ) : (
                                    <DotLoading
                                        color='primary'
                                        style={{paddingTop: 10}}
                                    />
                                )}
                            </CheckList>
                        </div>
                    </>
                )}
            </div>
            <div style={{display: "flex", padding: 0, justifyContent: "center"}}>
                <Button color='primary'
                        onClick={() => createRequest()}
                        style={{marginBottom: 10, width: '90%'}}
                >
                    Создать заявку
                </Button>
            </div>
            <CenterPopup
                visible={visible3}
                onMaskClick={() => {
                    setVisible3(false)
                }}
            >
                <div className={styles.myContent}>
                    <Result
                        status='success'
                        title='Заявка успешна создана'
                    />
                </div>
            </CenterPopup>
        </div>
    )
}

export default RequestFormPage;