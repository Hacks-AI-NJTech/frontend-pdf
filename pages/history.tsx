import type { NextPage } from 'next'
import Head from 'next/head'
import { ErrorViewer } from '../Components/ErrorViewer/login'
import { FileUploader } from '../Components/FileUploader/login'
import { Header } from '../Components/header'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css';
import { ItemSelect, SelectItemIE } from '../Components/ItemSelect/login'
import { useState } from 'react'
import { fetch } from './api/fetch'
import { host } from './api/consts'
import { PulseLoader } from 'react-spinners'
import axios from 'axios'
import { useRouter } from 'next/router'



const History: NextPage = () => {
    let files = new Array<JSX.Element>()
    const [data, setData] = useState("")
    let router = useRouter()
    if (data == ""){
        axios.get(host+"/pdf").then(res => {
            setData(res.data)
        })
    }
    if (data != ""){
        (data as any).forEach((value:any) => {
            localStorage.setItem(value.uuid, value.file)
            files.push(
                <div className={styles.fileCard} onClick={()=>router.push("/view/" + value.uuid)}>
                    {value.file.slice(60, 88)}
                </div>
            )
        });
    }


  return (
    <div className={styles.container}>
      <Head>
        <title>Загрузите файл</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header></Header>
        <div className={styles.history}>
            {
                data==""? <PulseLoader color={"#13377D"}></PulseLoader>:files
            }
        </div>
        
      </main>
    </div>
  )
}

export default History
