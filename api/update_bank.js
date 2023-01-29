import axios from "axios"
import { API_URL } from "../config"

async function updateBank(account_number, account_name, bank_name, branch, id_user) {
    const res= await axios({
        url: API_URL+ "/user/bank/update",
        method: "patch",
        data: {
            account_number,
            account_name,
            id_user,
            bank_name,
            branch
        }
    })
    const result= await res.data
    return result
}

export default updateBank