import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { add, uniqueId } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Button, ScrollView, Text, TextInput, View } from 'react-native'
import get_info_bank_user from '../../api/get_info_bank_user'
import { AppContext } from '../../App'
import { API_URL } from '../../config'
import uuid from 'react-native-uuid';

const Checkout = () => {
  const route= useRoute()
  const [userName, setUserName]= useState("")
  const [address, setAddress]= useState("")
  const [phoneNumber, setPhoneNumber]= useState("")
  const [email, setEmail]= useState("")
  const [note, setNote]= useState("")
  const [toggle, setToggle]= useState(false)
  const navigation= useNavigation()
  const {uid, setChange}= useContext(AppContext)
  const [data, setData]= useState()
  const [log, setLog]= useState()
  useEffect(()=> {
    get_info_bank_user(uid, setData)
  }, [])
  async function payment() {
    let id_payment= uuid.v4()
    try {
        
        const res= await axios({
          url: API_URL+"/checkout/payment",
          method: "post",
          data: {
            username: userName,
            email: email,
            address: address,
            province: "",
            note: note,
            id_user: uid,
            id_payment: id_payment,
            time_created: new Date()
          }
        })
        const arr_promise= []
        // const promisePaymentItem= 
        route.params?.cart.map(item=> arr_promise.push(axios({
          url: API_URL+ "/payment/item/cart",
          method: "post",
          data: {
            id_product: item.id_product,
            amount: item.amount,
            id_payment: id_payment,
            id_user: uid,
          }
        })))
        await Promise.all(arr_promise)
        .then(function(values) {
          setChange(prev=> !prev)
          navigation.navigate("Payment", {id_payment: id_payment})
        })
    } catch (error) {
        setLog(error)
    }
  }
  return (
    <ScrollView style={{padding: 10}}>
        {
            toggle=== false && <>
            <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", width: "100%", marginBottom: 12}}>
                <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Địa chỉ nhận hàng</Text>
                <View style={{width: "100%", marginTop: 8, marginBottom: 12}}>
                    <ComponentInputFillInfo value={userName} setValue={setUserName} placeholder={"Ví dụ: Nguyễn Văn A"} />
                </View>
                <View style={{width: "100%", marginTop: 8, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                    <View style={{width: "50%", marginRight: 6}}>
                        <ComponentInputFillInfo value={email} setValue={setEmail} placeholder={"contact@yourdomain.com"} />
                    </View>
                    <View style={{width: "50%", marginLeft: 6}}>
                        <ComponentInputFillInfo value={phoneNumber} setValue={setPhoneNumber} placeholder={"Ví dụ: 01234567890"} />
                    </View>
                </View>
                <View style={{width: "100%", marginTop: 8, marginBottom: 12}}>
                    <ComponentInputFillInfo value={address} setValue={setAddress} placeholder={"Ví dụ: Số 247, Cầu Giấy, Q. Cầu Giấy"} />
                </View>
                <View>
                    <ComponentInputFillInfo value={note} setValue={setNote} placeholder={"Ví dụ: Chuyển hàng ngoài giờ hành chính"} />
                </View>
            </View>
            <View style={{width: '100%', backgroundColor: "#fff", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: 'row', padding: 10}}>
                <Button title={"Giỏ hàng"} onPress={()=> navigation.navigate("Cart")} /> 
                <Button title={"Chọn phương thức thanh toán"} onPress={()=> setToggle(true)} />
            </View>
            </>
        }
        {
            toggle=== true && <>
                <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff"}}>
                    <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Chuyển khoản</Text>
                    <Text style={{marginBottom: 12}}>Sử dụng thẻ ATM hoặc dịch vụ Internet Banking để tiến hành chuyển khoản cho chúng tôi</Text>
                    <View style={{padding: 10, borderRadius: 10, borderColor: '#e7e7e7', borderStyle: 'solid', borderWidth: 1}}>
                        <Text style={{marginBottom: 12}}>Cảm ơn bạn đã đặt hàng. Đây là số tài khoản của bạn</Text>
                        <Text style={{marginBottom: 12}}>Số tài khoản: <Text style={{fontWeight: "600"}}>{data?.[0]?.account_number}</Text></Text>
                        <Text style={{marginBottom: 12}}>Tên tài khoản: <Text style={{fontWeight: "600"}}>{data?.[0]?.account_name}</Text></Text>
                        <Text style={{marginBottom: 12}}>Ngân hàng: <Text style={{fontWeight: "600"}}>{data?.[0]?.bank_name}</Text></Text>
                        <Text style={{marginBottom: 12}}>Chi nhánh: <Text style={{fontWeight: "600"}}>{data?.[0]?.branch}</Text></Text>
                        <View style={{marginTop: 12, width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <Button title={"Đặt hàng"} onPress={payment} />
                        </View>
                    </View>
                    <View style={{marginTop: 12}}>
                        <Text style={{marginBottom: 12}}>Bạn muốn thay đổi thông tin ngân hàng ?</Text>
                        <Button title={"Thay đổi ngân hàng"} onPress={()=> navigation.navigate("Me")} />
                    </View>
                </View>
            </>
        }
    </ScrollView>
  )
}

const ComponentInputFillInfo= (props)=> {
    const [isFocused, setIsFocused]= useState(false)
    const handleFocus= ()=> {
        setIsFocused(true)
    }
    const handleBlur= ()=> {
        setIsFocused(false)
    }
    return (
        <View style={{width: "100%"}}>
            <TextInput placeholder={props?.placeholder} style={{borderStyle: "solid", borderWidth: 1, borderRadius: 10, padding: 10, width: "100%", height: 40, borderColor: isFocused ? "#2e89ff" : "#e7e7e7"}} onFocus={handleFocus} onBlur={handleBlur} value={props?.value} onChangeText={props?.setValue}  />
        </View>
    )
}

export default Checkout