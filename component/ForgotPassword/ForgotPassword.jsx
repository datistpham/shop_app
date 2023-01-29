import React, { useState } from 'react'
import { Button, Image, Text, TextInput, View } from 'react-native'
import get_password from '../../api/get_password'
import { styles } from '../DetailProduct/DetailProduct'

const ForgotPassword = () => {
  const [email, setEmail] =useState("")
  const [isExec, setIsExec]= useState(false)
  return (
    <View style={{flex: 1, display: "flex", justifyContent: 'center', alignItems: 'center'}}>
        <View style={[styles.flexC, {marginBottom: 12}]}>
            <Image style={{width: 300, height: 100}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1671249181/single/photo_2022-12-13_02-00-39_ylswk8-removebg-preview_pc6nqv.png"}} />
        </View>
        <View style={{width:" 100%", padding: 10}}>
            <View style={{marginBottom: 12, width: "100%"}}>
                <Text style={{fontSize: 16, marginBottom: 8}}>Nhập email đăng ký của bạn</Text>
                <TextInput blurOnSubmit={true} placeholder={"Nhập email của bạn"} value={email} onChangeText={setEmail} style={{width: "100%", height: 40, borderRadius: 10, borderColor: "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
            </View>
            <View style={styles.flexC}>
                {
                    isExec=== false && 
                    <Button title={"Lấy lại mật khẩu"} color={"#2e89ff"} onPress={()=> {
                        get_password(email)
                        setIsExec(true)
                    }} />
                }
                {
                    isExec=== true && <Text>Chúng tôi đã gửi mật khẩu về email của bạn</Text>
                }
            </View>
        </View>
    </View>
  )
}

export default ForgotPassword