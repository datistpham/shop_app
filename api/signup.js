import axios from "axios"
import { API_URL } from "../config"

const signup= async (email, password, full_name,  username, phone_number)=> {
    const res= await axios({
        url: API_URL+ "/signup",
        method: "post",
        data: {
            email, password, full_name,  username, phone_number
        }
    })
    const result= await res.data
    return result
}

export default signup