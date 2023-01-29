import axios from "axios"
import { API_URL } from "../config"

async function updateMomo(momo_account, momo_name, id_user) {
    const res= await axios({
        url: API_URL+ "/update/momo",
        method: "patch",
        data: {
            momo_account,
            momo_name,
            id_user,
        }
    })
    const result= await res.data
    return result
}

export default updateMomo