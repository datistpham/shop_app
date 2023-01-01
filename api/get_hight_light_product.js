import axios from "axios"
import { API_URL } from "../config"

const get_hight_light_product= async (setData)=> {
    try {
        const res= await axios({
            url: API_URL+ "/get_hight_light_product",
            method: "get"
        })
        const result= await res.data
        return setData(result)
        
    } catch (error) {   
        return setData(error)
    }
}

export default get_hight_light_product