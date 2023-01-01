import axios from "axios"
import { API_URL } from "../config"

const get_cart_user= async (id_user, setData)=> {
    const res= await axios({
        url: API_URL+ "/get_cart",
        method: "post",
        data: {
            id_user
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_cart_user