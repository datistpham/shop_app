import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import { add, uniqueId } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native'
import get_info_bank_user from '../../api/get_info_bank_user'
import { AppContext } from '../../App'
import { API_URL } from '../../config'
import uuid from 'react-native-uuid';
import getMomo from '../../api/get_momo'

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
  const [momo, setMomo]= useState()
  const [methodName, setMethodName]= useState()
  useEffect(()=> {
    get_info_bank_user(uid, setData)
    getMomo(uid, setMomo)
  }, [uid])
  async function payment() {
    if(chooseMethod=== 0) {
       return Alert.alert('Thông báo', "Vui lòng chọn phương thức thanh toán",[{text: "Ok"}])
    }
    if(parseInt(chooseMethod)=== 2&& (!momo?.[0]?.momo_account|| !momo?.[0]?.momo_name) ) {
        return Alert.alert('Thông báo', "Thông tin momo không hợp lệ hoặc không đầy đủ",[{text: "Ok"}])

    }
    if(parseInt(chooseMethod)=== 3 && (!data?.[0]?.account_number || !data?.[0]?.account_name ||  !data?.[0]?.bank_name ||  !data?.[0]?.branch )) {
        return Alert.alert('Thông báo', "Thông tin ngân hàng không hợp lệ hoặc không đầy đủ",[{text: "Ok"}])
    }
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
            time_created: new Date(),
            phone_number: phoneNumber,
            method_name: methodName
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
//   const [validateUser, setValidateUser]= useState(false)
//   const [validateEmail, setValidateEmail]= useState(false)
//   const [validatePhoneNumber, setValidatePhoneNumber]= useState(false)
//   const [validateAddress, setValidateAddress] =useState(false)
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhoneNumber(phoneNumber) {
    const re= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return re.test(phoneNumber)
  }
  const [chooseMethod, setChooseMethod]= useState(0)
  
  return (
    <ScrollView style={{padding: 10}}>
        {
            toggle=== false && <>
            <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", width: "100%", marginBottom: 12}}>
                <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Địa chỉ nhận hàng</Text>
                <View style={{width: "100%", marginTop: 8, marginBottom: 12}}>
                    <ComponentInputFillInfo value={userName} setValue={setUserName} placeholder={"Ví dụ: Nguyễn Văn A"} />
                </View>
                {
                    userName.length> 0 && userName.length < 6 && 
                    <View>
                        <Text style={{color: "red"}}>{"Tên người dùng phải ít nhất 6 ký tự"}</Text>
                    </View>
                }
                <View style={{width: "100%", marginTop: 8, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                    <View style={{width: "50%", marginRight: 6}}>
                        <ComponentInputFillInfo value={email} setValue={setEmail} placeholder={"contact@yourdomain.com"} />
                        {
                            validateEmail(email)=== false&& email.length > 0 && 
                                <View>
                                    <Text style={{color: "red"}}>{"Email không hợp lệ"}</Text>
                                </View>
                        }
                    </View>
                    <View style={{width: "50%", marginLeft: 6}}>
                        <ComponentInputFillInfo value={phoneNumber} setValue={setPhoneNumber} placeholder={"Ví dụ: 01234567890"} />
                        {
                            validatePhoneNumber(phoneNumber)=== false&& phoneNumber.length > 0 && 
                                <View>
                                    <Text style={{color: "red"}}>{"Số điện thoại không hợp lệ"}</Text>
                                </View>
                        }
                    </View>
                </View>
                <View style={{width: "100%", marginTop: 8, marginBottom: 12}}>
                    <ComponentInputFillInfo value={address} setValue={setAddress} placeholder={"Ví dụ: Số 247, Cầu Giấy, Q. Cầu Giấy"} />
                </View>
                {
                    address.length> 0 && address.length < 20 && 
                    <View>
                        <Text style={{color: "red"}}>{"Địa chỉ phải có ít nhất 20 ký tự"}</Text>
                    </View>
                }
                <View>
                    <ComponentInputFillInfo value={note} setValue={setNote} placeholder={"Ví dụ: Chuyển hàng ngoài giờ hành chính"} />
                </View>
            </View>
            <View style={{width: '100%', backgroundColor: "#fff", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: 'row', padding: 10}}>
                <Button title={"Giỏ hàng"} onPress={()=> navigation.navigate("Cart")} /> 
                <Button title={"Chọn phương thức thanh toán"} onPress={()=> {
                    if(userName.length <= 0 || phoneNumber.length <= 0 || email.length <= 0 || address.length <= 0 || validateEmail(email)=== false || validatePhoneNumber(phoneNumber)=== false) {
                        Alert.alert('Thông báo', "Thông tin không đẩy đủ. Vui lòng thử lại",[{text: "Ok"}])
                    }
                    else {
                        setToggle(()=> true)
                    }
                }} />
            </View>
            </>
        }
        {
            toggle=== true && <>
               <TouchableHighlight underlayColor={"unset"} style={{borderRadius: 10}} onPress={()=> {setChooseMethod(()=> 1);setMethodName("Giao hàng tận nơi")}}>
                <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderWidth: 1, borderStyle: "solid", borderColor: parseInt(chooseMethod)=== 1 ? "#2e89ff" : "#fff"}}>
                        <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Giao hàng tận nơi </Text>
                        <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>50,000đ </Text>
                    </View>
               </TouchableHighlight>
                {/*  */}
               <TouchableHighlight underlayColor={"unset"} style={{borderRadius: 10}} onPress={()=> {setChooseMethod(()=> 2); setMethodName("Thanh toán momo")}}>
                <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", marginBottom: 12, borderWidth: 1, borderStyle: "solid", borderColor: parseInt(chooseMethod)=== 2 ? "#2e89ff" : "#fff"}}>
                    <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Thanh toán bằng momo</Text>
                    <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Số tài khoản: {momo?.[0]?.momo_account || "_"}</Text>
                    <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Tên tài khoản: {momo?.[0]?.momo_name|| "_"}</Text>
                </View>
               </TouchableHighlight>
                {/*  */}
               <TouchableHighlight underlayColor={"unset"} style={{borderRadius: 10}} onPress={()=> {setChooseMethod(()=> 3); setMethodName("Thanh toán atm")}}>
                <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", borderWidth: 1, borderStyle: "solid", borderColor: parseInt(chooseMethod)=== 3 ? "#2e89ff" : "#fff"}}>
                    <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>Chuyển khoản</Text>
                    <Text style={{marginBottom: 12}}>Sử dụng thẻ ATM hoặc dịch vụ Internet Banking để tiến hành chuyển khoản cho chúng tôi</Text>
                    <View style={{padding: 10, borderRadius: 10, borderColor: '#e7e7e7', borderStyle: 'solid', borderWidth: 1}}>
                        <Text style={{marginBottom: 12}}>Cảm ơn bạn đã đặt hàng. Đây là số tài khoản của bạn</Text>
                        <Text style={{marginBottom: 12}}>Số tài khoản: <Text style={{fontWeight: "600"}}>{data?.[0]?.account_number}</Text></Text>
                        <Text style={{marginBottom: 12}}>Tên tài khoản: <Text style={{fontWeight: "600"}}>{data?.[0]?.account_name}</Text></Text>
                        <Text style={{marginBottom: 12}}>Ngân hàng: <Text style={{fontWeight: "600"}}>{data?.[0]?.bank_name}</Text></Text>
                        <Text style={{marginBottom: 12}}>Chi nhánh: <Text style={{fontWeight: "600"}}>{data?.[0]?.branch}</Text></Text>
                    </View>
                </View>
               </TouchableHighlight>
                <View style={{marginTop: 12, width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                    <Button title={"Đặt hàng"} onPress={payment} />
                </View>
                <View style={{marginTop: 12}}>
                    <Text style={{marginBottom: 12}}>Bạn muốn thay đổi thông tin ngân hàng ?</Text>
                    <Button title={"Thay đổi ngân hàng"} onPress={()=> navigation.navigate("Me", {backButton: true})} />
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