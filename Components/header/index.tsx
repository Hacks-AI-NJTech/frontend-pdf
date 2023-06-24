import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./header.module.css"
import 'antd/dist/antd.css';


 

export const Header:React.FC = () =>{
    let router = useRouter()
    const [open, setOpen] = useState(true)
    return(
        <div className={styles.header}>
            <div className={styles.logo} onClick={()=>router.push("/login")}>
                <img src="/images/logo.png"></img>
            </div>
            <img src="/images/logo.png" className={styles.burger} onClick={()=>setOpen(!open)}></img>
            <div className={styles.itemWrapper} style={{display: open? "":"none"}}>
                <div className={styles.item} onClick={()=>router.push("/login")}>
                    Проверить документы 
                </div>
                <div className={styles.item} onClick={()=>router.push("/guide")}>
                    Инструкция
                </div>
                <div className={styles.item} onClick={()=>router.push("/history")}>
                    История файлов
                </div>
                <div className={styles.item} onClick={()=>router.push("/about")}>
                    О нас
                </div>
                <div className={styles.item} onClick={()=>router.push("/")}>
                    Выход
                </div>
            </div>
        </div>
    );
}