import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import updateBank from '../../api/update_bank'
import { AppContext } from '../../App'

const ChangeBank = (props) => {
  const [accountNumber, setAccountNumber]= useState("")
  const [accountName, setAccountName]= useState("")
  const [bankName, setBankName]= useState("")
  const [branch, setBranch]= useState("")
  const {uid, setChange }= useContext(AppContext)
  useEffect(()=> {
    setAccountNumber(props?.account_number)
    setAccountName(props?.account_name)
    setBankName(props?.bank_name)
    setBranch(props?.branch)
  }, [props])
  return (
    <View>
        <Text style={{textAlign: "center", fontWeight: "600", fontSize: 20, marginBottom: 12}}>Cập nhật thông tin người dùng</Text>
        <View>
            <Text style={{marginBottom: 8}}>Số tài khoản</Text>
            <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={accountNumber} onChangeText={setAccountNumber} />
            <Text style={{marginBottom: 8}}>Tên tài khoản</Text>
            <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={accountName} onChangeText={setAccountName} />
            <Text style={{marginBottom: 8}}>Ngân hàng</Text>
            <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={bankName} onChangeText={setBankName} />
            <Text style={{marginBottom: 8}}>Chi nhánh</Text>
            <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={branch} onChangeText={setBranch} />
            <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                <Button title={"Cập nhật"} color={"#2e89ff"} onPress={async ()=> {
                  await updateBank(accountName, accountNumber, bankName, branch, uid)
                  setChange(prev=> !prev)
                  props?.setOpen(()=> false)
                }} />
                <Text style={{margin: 12}}></Text>
                <Button onPress={()=> props?.setOpen(()=> false)} title={"Hủy"} color={"#555"} />
            </View>
        </View>
    </View>
  )
}

export default ChangeBank
