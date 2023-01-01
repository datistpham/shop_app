import axios from "axios"
import { API_URL } from "../config"

const get_payment= async (id_payment, setData)=> {
    const res= await axios({
        url: API_URL+ "/get_payment",
        method: "get",
        params: {
            id_payment
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_payment