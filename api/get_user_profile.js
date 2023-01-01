import axios from "axios"
import { API_URL } from "../config"

const get_user_profile= async(id_user, setData)=> {
    const res= await axios({
        url: API_URL+ "/",
        method: "post",
        data: {
            id_user
        }
    })
    const result= await res.data
    return setData(result[0])
}

export default get_user_profile