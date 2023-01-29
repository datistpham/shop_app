import axios from "axios"
import { API_URL } from "../config"

async function getMomo(uid, setData) {
    const res= await axios({
        url: API_URL+ "/get/momo",
        method: "get",
        params: {
            id_user: uid
        }
    })
    const result= await res.data
    // document.getElementById("account-number-mm").innerHTML= result[0]?.momo_name || "_"
    // document.getElementById("account-name-mm").innerHTML = result[0]?.momo_account || "_"
   return setData(result)
    
}

export default getMomo