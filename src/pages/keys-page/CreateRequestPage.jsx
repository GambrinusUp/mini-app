import styles from './keys-page.module.css';
import { ReactComponent as YourIcon } from './undraw_accept_request_re_d81h.svg'
import {Button} from "antd-mobile";
import {Link} from "react-router-dom";

function CreateRequestPage() {
    return(
        <div className={styles.mainWrapper} style={{justifyContent: "space-between"}}>
            <span style={{fontSize: 20, fontWeight: "bold", paddingTop: 20}} className={styles.header}>
                Создание заявки
            </span>
            <YourIcon className={styles.icon}/>
            <span style={{maxWidth: 240, textAlign: "center", fontSize: 14, paddingTop: 20}}
                  className={styles.description}>
                Вы можете создать заявку на бронирование ключа или передачу его другому пользователю
            </span>
            <div className={styles.createBtn}>
                <Link to="/form" style={{marginBottom: 10, width: '90%'}}>
                    <Button color='primary' block>
                        Создать заявку
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CreateRequestPage;
