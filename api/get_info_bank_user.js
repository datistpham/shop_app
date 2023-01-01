import axios from "axios"
import { API_URL } from "../config"

const get_info_bank_user= async(id_user, setData)=> {
    const res= await axios({
        url: API_URL+ "/user/bank",
        method: "get",
        params: {
            id_user
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_info_bank_user