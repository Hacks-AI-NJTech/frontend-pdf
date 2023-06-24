import {fetch} from './fetch'
import { check_state_url } from './urls'

type UnitConversion = {
    FileName: string;
    Status: string;
    Download: string;
  };
export const check_state = async ():Promise<UnitConversion[]> => {
    var data = await fetch(check_state_url).then( file => {
        const data : UnitConversion[] =  []; 
        for(var element in file)
        {
            data.push(
                {
                FileName:   file['FileName'],
                Status:     file['Status'],
                Download:  file['Download']
            }
            );


        };
    return data;
 });
 return data;
}