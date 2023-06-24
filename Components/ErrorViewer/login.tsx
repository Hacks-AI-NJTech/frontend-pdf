import React, { useState } from "react";
import DocViewer, { DocViewerRenderers }  from "react-doc-viewer";
import styles from "./error.module.css"
import 'antd/dist/antd.css';


interface ErrorViewerIE{
    errText:string;
    paragraph: [number, string][];
    variants?: string[];
    num: number;
    correct:boolean;
}

export const ErrorViewer : React.FC<ErrorViewerIE> = (props) =>{
    const [open, setOpen] = useState(false)
    return(
        <div className={styles.viewer}>
            <div className={styles.card}>
                <div className={styles.leftSide}>
                    <img src={props.correct? "/images/correct.svg":"/images/err.svg"}></img>
                    <div style={{color:"rgba(0, 0, 0, 0.45)"}}>№{props.num}</div>
                    <div className={styles.Text}>
                        {props.errText}
                    </div>
                </div>
                <div  className={styles.rightSide}>
                    <div className={styles.correct}>{props.correct? "Нет замечаний":"Есть замечания"}</div>
                    <div onClick={()=>setOpen(!open)} className={styles.arrow}>
                    <span style={{color:"#1890FF"}}>Посмотреть</span>
                    <img style={{transform: open? "rotate(180deg)":""}} src="/images/arrow.svg"></img>
                    </div>
                </div>        
        </div>
        
        {   open?
            <div className={styles.fixes}>
                <div className={styles.paragraphs}>
                    <div style={{display: props.correct? "none":""}}>ПРИМЕРЫ ИЗ ДРУГИХ НПА</div>
                    {
                        props.paragraph.map(
                            (value, index)=><div className={styles.paragraph}>
                                    <div className={styles.num}><strong>№{index+1}</strong> <div className={styles.circle} style={{opacity:"0.5",background: Number(value[1])<50? "#F5222D": Number(value[1]) < 70? "#E3F32A":"#52C41A", display:props.correct? "":"none"}}></div></div>
                                    <div className={styles.paragraph}>{value[0]}</div>
                                    <div style={{display: props.correct? "":"none"}}><strong>Score:{value[1]}</strong></div>
                                </div>
                        )
                    }
                </div>
                <div style={{display: props.variants==undefined? "none":""}}>
                    {
                        props.variants?.map(
                            (value)=><div className={styles.variant}>{value}</div>
                        )
                    }
                </div>
            </div>
            :<div></div>
        }
            
        </div>
    );
}