import type { NextPage } from 'next'
import Head from 'next/head'
import { ErrorViewer } from '../Components/ErrorViewer/login'
import { FileUploader } from '../Components/FileUploader/login'
import { Header } from '../Components/header'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css';
import { ItemSelect, SelectItemIE } from '../Components/ItemSelect/login'
import { useRouter } from 'next/router'
import { ChakraProvider } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./table/ChakraTable";
import { useState ,useEffect, useRef, useCallback } from 'react'
import {check_state } from './api/check_state'
import { check_state_url } from './api/urls'
import { host } from './api/consts'



const workerOptions = {
  connection: {
    host: "localhost",
    port: 8000,
  },
};


const Upload: NextPage =  () => {
  const [files, setFiles] = useState(new Array())
  let router = useRouter()

  const onNext = () =>{
    localStorage.setItem("files", JSON.stringify(files))
    if (files.length > 0){
      router.push("/files")
    }
    else{
      alert("Загрузите файлы, потом все заработает")
    }
    
  }
  type UnitConversion = {
    FileName: string;
    Status: string;
    Download: string;
  };
  
  var data: UnitConversion[] = []
  //  [
  //   {
  //     FileName: "File",
  //     Status: "Status",
  //     Download: "Download"
  //   },
  //   {
  //     FileName: "File",
  //     Status: "Status",
  //     Download: "Download"
  //   },
  //   {
  //     FileName: "File",
  //     Status: "Status",
  //     Download: "Download"
  //   },
  //   {
  //     FileName: "File",
  //     Status: "Status",
  //     Download: "Download"
  //   },
  //   {
  //     FileName: "File",
  //     Status: "Status",
  //     Download: "Download"
  //   }
  // ]; 



  
  //   try {
  //     let result:any;
  //     let result2:any;
  // //    data = await check_state();
  // var url = host + check_state_url
  //     const res =  fetch(
  //       url, { mode: 'cors' }
  //     )
  //     .then((response) =>{ 
  //       response.json();
  //       console.log(response);
  //       result2=response})
  //   .then((data) => 
  //   {
  //     result = data;
  //     console.log(result);
  //   }
  //   );
  //   var r = res;
      // .then((r) => 
      // {
      // console.log(result);
      // console.log(r);
      // }
      //);
      //data = await res; 
      //data = result;
    // } catch (error) {
    //   console.error(error);
    // }; 



    var url = host + check_state_url
    function fastApiRequest(path:string) {
      let res:any;
      fetch(`${path}`)
      .then((response) => response.json())
      .then((data) => (res = data))
      .then((r) => 
      {
        console.log(r);
        console.log(res)
      }      
      );
      
      return res;
  }
var r =  fastApiRequest(url);









  const columnHelper = createColumnHelper<UnitConversion>();
  function foo(name:string) { return <a href={ name} > {name}</a>; };
  const columns = [
    columnHelper.accessor("FileName", {
      cell: (info) => info.getValue(),
      header: "Файл"
    }),
    columnHelper.accessor("Status", {
      cell: (info) => info.getValue(),
      header: "Статус"
    }),
    columnHelper.accessor("Download", {
      cell: (info) =>  { return foo(info.getValue()) },
      header: "Скачать"
      
    })
  ];
   
       
       
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Проверка НПА</title>
        <meta name="description" content="Помощник проверки НПА" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header></Header>
        <div className={styles.upload}>
            <div className={styles.h1}>Сервис проверки ОКС</div>
            <FileUploader onResponse={(file)=>setFiles([...files, file])}></FileUploader>
            <div className={styles.btn} onClick={()=>onNext()}>Далее</div>
       
       
            <ChakraProvider>
      <DataTable columns={columns} data={data} />
    </ChakraProvider>

</div>
      </main>
    </div>
  )
}

export default Upload
