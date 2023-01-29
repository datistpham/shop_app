import { useNavigation } from '@react-navigation/native';
import React, {useState } from 'react'
import { Button, View, Image, Text, TextInput, Alert } from 'react-native'
import signup from '../../api/signup';
// import * as Linking from 'expo-linking';
import { styles } from './Me';

const Signup = () => {
  const navigation= useNavigation()
  const [userName, setUserName]= useState("")
  const [name, setName]= useState("")
  const [phoneNumber, setPhoneNumber]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [data, setData]= useState()
  const isFocused= false
  const twoOptionAlertHandler = async () => {
    const result= await signup(email, password, userName, userName, phoneNumber)
    setData(result)
    if(result?.signup=== false) {
        Alert.alert(
            //title
            'Thông báo',
            //body
            'Đăng ký thất bại, bạn vui lòng điền đầy đủ thông tin hoặc email đã tồn tại trên hệ thống',
            [
              { text: 'Ok'},
            ],
          );
    }
    else if(result?.signup=== true ) {
        
        Alert.alert(
          //title
          'Thông báo',
          //body
          'Bạn đã đăng ký thành công',
          [
            { text: 'Ok', onPress: () => {
                navigation.navigate("Login")
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
          <Text style={{fontSize: 16, marginBottom: 8}}>Họ & Tên đệm</Text>
          <TextInput blurOnSubmit={true} placeholder={"Nhập họ tên đệm của bạn"} value={userName} onChangeText={setUserName} style={{width: "100%", height: 40, borderRadius: 10, borderColor: isFocused=== true ? "#2e89ff" : "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
        </View>
        {/*  */}
        <View style={{marginBottom: 12, width: "100%"}}>
          <Text style={{fontSize: 16, marginBottom: 8}}>Tên</Text>
          <TextInput blurOnSubmit={true} placeholder={"Nhập tên của bạn"} value={name} onChangeText={setName} style={{width: "100%", height: 40, borderRadius: 10, borderColor: isFocused=== true ? "#2e89ff" : "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
        </View>
        <View style={{marginBottom: 12, width: "100%"}}>
          <Text style={{fontSize: 16, marginBottom: 8}}>Điện thoại</Text>
          <TextInput blurOnSubmit={true} placeholder={"Nhập số điện thoại của bạn"} value={phoneNumber} onChangeText={setPhoneNumber} style={{width: "100%", height: 40, borderRadius: 10, borderColor: isFocused=== true ? "#2e89ff" : "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
        </View>
        <View style={{marginBottom: 12, width: "100%"}}>
          <Text style={{fontSize: 16, marginBottom: 8}}>Email</Text>
          <TextInput blurOnSubmit={true} placeholder={"Nhập email của bạn"} value={email} onChangeText={setEmail} style={{width: "100%", height: 40, borderRadius: 10, borderColor: isFocused=== true ? "#2e89ff" : "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
        </View>
        <View style={{marginBottom: 12, width: "100%"}}>
          <Text style={{fontSize: 16, marginBottom: 8}}>Mật khẩu</Text>
          <TextInput secureTextEntry={true} blurOnSubmit={true} placeholder={"Nhập mật khẩu của bạn"} value={password} onChangeText={setPassword} style={{width: "100%", height: 40, borderRadius: 10, borderColor: isFocused=== true ? "#2e89ff" : "#e7e7e7", borderStyle: "solid", borderWidth: 1, fontSize: 16, padding: 10, backgroundColor: "#fff"}} />
        </View>
        <View style={styles.flexC}>
          <Button title={"Đăng nhập"} color={"#2e89ff"} onPress={twoOptionAlertHandler} />
        </View>
      </View>
    </View>
  )
}

export default Signup
