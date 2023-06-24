import React, { useState } from "react";
import styles from "./itemSelect.module.css"

export interface SelectItemIE{
    name:string
    value: string|number
}

interface SelectIE{
    onChange: (value:string|number) => void
    items: SelectItemIE[]
    value?:number
}

export const ItemSelect: React.FC<SelectIE> = (props) =>{
    const [selected, setSelected] = useState(props.items[0])
    const [open, setOpen] = useState(false)
    let options = new Array()
    
    props.items.map((item:SelectItemIE)=>{
        options.push(
            <div className={selected.name == item.name? styles.selected:styles.option} onClick={()=>onItemChange(item)}>{item.name.slice(60, item.name.length)}</div>
            )
    })
    const onItemChange = (item:SelectItemIE) =>{
        setSelected(item)
        props.onChange(item.value)
    }
    
    return(
        <div >
            <div className={styles.myselect}>
                <div className={styles.head} onClick={()=>setOpen(!open)}>Выберите документ <img style={{transform: open? "rotate(180deg)":""}} src="/images/arrow.svg"></img></div>
                {
                    open? <div className={styles.options}>
                        {options}
                    </div>: ""
                }
            </div>
        </div>
    )
}