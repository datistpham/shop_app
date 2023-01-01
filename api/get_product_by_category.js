import axios from "axios"
import { API_URL } from "../config"

const get_product_by_category= async (categoryId, setData)=> {
    const res= await axios({
        url: API_URL+ "/get_product/by/category",
        method: "get",
        params: {
            categoryId 
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_product_by_category