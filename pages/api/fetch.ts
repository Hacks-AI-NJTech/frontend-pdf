import axios from 'axios'
import {host} from './consts'



export const fetch = async (url: string) => {
    return  (await axios.get(url)).data
}