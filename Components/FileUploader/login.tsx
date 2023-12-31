import React, { useState } from "react";
import  {  Button, message, Upload  } from "antd"
import Icon, { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { host } from "../../pages/api/consts";


interface FileUploaderIE{
    onResponse: (response:any)=>void
}
export const FileUploader:React.FC<FileUploaderIE> = (data) =>{

    const props = {
        name: 'file', 
        action: host + '/pdf',
       
      
        onChange(info:any) {
          if (info.file.status !== 'uploading') {
          }
      
          if (info.file.status === 'done') {
            data.onResponse(info.file.response)
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
      
    return (
            <Upload {...props} multiple>
              <Button icon={<UploadOutlined></UploadOutlined>}>Загрузите файлы для проверки</Button>
            </Upload>
      );
}