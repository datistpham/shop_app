import axios from "axios"
import { API_URL } from "../config"

const get_order_approved= async (id_user, setData)=> {
    const res= await axios({
        url: API_URL+ "/user/order/approved",
        method: "get",
        params: {
            id_user
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_order_approved