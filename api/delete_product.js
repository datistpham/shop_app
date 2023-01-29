import axios from "axios"
import { API_URL } from "../config"

const deleteProduct= async (id, idUser) => {
    const res= await axios({
        url: API_URL+ "/delete_cart/item",
        method: "post",
        data: {
          id_product: id,
          id_user: idUser
        }
      
      })
    const result= await res.data
    return result
}

export default deleteProduct