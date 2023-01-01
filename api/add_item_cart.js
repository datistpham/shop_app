import axios from "axios"
import { API_URL } from "../config"

const add_item_cart= async(id_user, id_product, amount)=> {
    const res= await axios({
        url: API_URL+ "/add_to_cart",
        method: "post",
        data: {
            id_user, id_product, amount
        }
    })
    const result= await res.data
    return result
}

export default add_item_cart