import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

const ChangeProfile = (props) => {
  const [username, setUsername]= useState("")
  const [email, setEmail]= useState("")
  const [phoneNumber, setPhoneNumber]= useState("")
  useEffect(()=> {
    setUsername(props?.username)
    setEmail(props?.email)
    setPhoneNumber(props?.phone_number)

  }, [props])
  return (
    <View>
        <Text style={{textAlign: "center", fontWeight: "600", fontSize: 20, marginBottom: 12}}>Cập nhật thông tin người dùng</Text>
        <View>
            <Text style={{marginBottom: 8}}>Tên người dùng</Text>
            <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={username} onChangeText={setUsername} />
            <Text style={{marginBottom: 8}}>Email</Text>
            <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={email} onChangeText={setEmail} />
            <Text style={{marginBottom: 8}}>Số điện thoại</Text>
            <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={phoneNumber} onChangeText={setPhoneNumber} />
            <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                <Button title={"Cập nhật"} color={"#2e89ff"} />
                <Text style={{margin: 12}}></Text>
                <Button onPress={()=> props?.setOpen(()=> false)} title={"Hủy"} color={"#555"} />
            </View>
        </View>
    </View>
  )
}

export default ChangeProfile
