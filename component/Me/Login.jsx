import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Alert, Button, Image, Text, TextInput, View } from 'react-native'
import login from '../../api/login'
import { AppContext } from '../../App'
import { styles } from './Me'

const Login = () => {
  const {setUid, setAuth}= useContext(AppContext)
  const [data, setData]= useState()
  const navigation= useNavigation()
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [isFocused, setIsFocused]= useState(false)
  const handleFocus= ()=> {
    setIsFocused(true)
  }
  const handleBlur= ()=> {
    setIsFocused(false)
  }
  const [isFocused2, setIsFocused2]= useState(false)
  const handleFocus2= ()=> {
    setIsFocused2(true)
  }
  const handleBlur2= ()=> {
    setIsFocused2(false)
  }
  const twoOptionAlertHandler = async () => {
    const result= await login(email, password)
    setData(result)
    if(result?.login=== false) {
        Alert.alert(
            //title
            'Thông báo',
            //body
            'Đăng nhập thất bại, tài khoản hoặc mật khẩu không chính xác',
            [
              { text: 'Ok'},
            ],
          );
    }
    else if(result?.login=== true ) {
        
        Alert.alert(
          //title
          'Thông báo',
          //body
          'Bạn đã đăng nhập thành công',
          [
            { text: 'Ok', onPress: () => {
                setUid(result?.id_user?.[0]?.id_user)
                setAuth(true)
                navigation.navigate("Home")
            } },
          ],
        );
    }
    else {
        Alert.alert(
            //title
            'Thông báo',
            //body
            'Có lỗi xảy ra. Vui lòng thử lại sau',
            [
              { text: 'Ok' },
            ],
          );
    }
    //function to make two option alert
  };
  return (
    <View style={{flex: 1, display: "flex", justifyContent: 'center', alignItems: 'center'}}>
        <View style={[styles.flexC, {marginBottom: 12}]}>
            <Image style={{width: 300, height: 100}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1671249181/single/photo_2022-12-13_02-00-39_ylswk8-removebg-preview_pc6nqv.png"}} />
        </View>
        <View style={{width:" 100%", padding: 10}}>
            <View style={{marginBottom: 12, width: "100%"}}>
                <Text style={{fontSize: 16, marginBottom: 8}}>Địa chỉ email</Text>
                <TextInput blurOnSubmit={true} placeholder={"Nhập địa chỉ email của bạn"} onFocus={handleFocus} onBlur={handleBlur} value={email} onChangeText={setEmail} style={{width: "100%", height: 40, borderRadius: 10, borderColor: isFocused=== true ? "#2e89ff" : "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
            </View>
            <View style={{marginBottom: 12, width: "100%"}}>
                <Text style={{fontSize: 16, marginBottom: 8}}>Mật khẩu</Text>
                <TextInput secureTextEntry={true} placeholder={"Nhập mật khẩu"} onFocus={handleFocus2} onBlur={handleBlur2} value={password} onChangeText={setPassword} style={{width: "100%", height: 40, borderRadius: 10, borderColor: isFocused2=== true ? "#2e89ff" : "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
            </View>
        </View>
        <View style={styles.flexC}>
            <Button title={"Đăng nhập"} color={"#2e89ff"} onPress={twoOptionAlertHandler} />
        </View>
    </View>
  )
}

export default Login
