import styles from './components.module.css'
import {KeyOutline} from "antd-mobile-icons";
import {Button, Modal, Toast} from "antd-mobile";
import {sleep} from "antd-mobile/es/utils/sleep";

function KeyItem() {
    return (
        <div className={styles.keyWrapper}>
            <div style={{display: "flex", alignItems: "center"}}>
                <KeyOutline style={{fontSize: 30}}/>
                <span style={{paddingLeft: 10, fontSize: 16}}>
                    Аудитория 203
                </span>
            </div>
            <Button color='primary' fill='solid' style={{marginRight: 20, borderRadius: 10,
                fontSize: 16}} size='small'
                    onClick={() =>
                        Modal.confirm({
                            content: 'Создание заявки',
                            onConfirm: async () => {
                                await sleep(3000)
                                Toast.show({
                                    icon: 'success',
                                    content: 'Заявка создана',
                                    position: 'bottom',
                                })
                            },
                            cancelText: 'Отмена',
                            confirmText: 'Создать заявку'
                        })
                    }
            >
                Создать заявку
            </Button>
        </div>
    )
}

export default KeyItem;