import axios from "axios"
import { API_URL } from "../config"

const get_detail_product= async (id_product, setData)=> {
    try {
        const res= await axios({
            url: API_URL+ "/product/detail",
            method: "get",
            params: {
                id_product
            }
        })
        const result= await res.data
        return setData(result[0])
    } catch (error) {
        return setData(error.message)
    }   
    
}

export default get_detail_product