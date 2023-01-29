import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import Modal from "react-native-modal";
import getMomo from '../../api/get_momo';
import updateMomo from '../../api/update_momo';
import { AppContext } from '../../App';

const MomoProfile = () => {
  const [openChange, setOpenChange]= useState(false)
  const [data, setData]= useState()
  const {uid }= useContext(AppContext)
  const [momoName, setMomoName]= useState("")
  const [momoAccount, setMomoAccount]= useState("")
  const [change, setChange]= useState(false)
  useEffect(()=> {
    getMomo(uid, setData)
  }, [uid, change])
  return (
    <View style={{marginTop: 12}}>
        <Text style={{marginTop: 12, fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center"}}>
            Thông tin số momo
        </Text>  
        <View style={{padding: 10}}>
            <View style={{width: '100%', backgroundColor: "#fff", borderRadius: 10, padding: 10}}>
                <Text style={{marginBottom: 8}}>Số tài khoản: <Text style={{fontWeight: "600"}}>{data?.[0]?.momo_account || "_"}</Text></Text>
                <Text style={{marginBottom: 8}}>Tên tài khoản: <Text style={{fontWeight: "600"}}>{data?.[0]?.momo_name || "_"}</Text></Text>
                
                <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24, marginTop: 12, justifyContent: "center", width: "100%"}}>
                    <Button onPress={()=> setOpenChange(prev=> !prev)} title={"Cập nhật số momo"} color={"#2e89ff"} />
                </View>
            </View>
        </View>
        <Modal isVisible={openChange}>
            <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10}}>
                    <Text style={{marginBottom: 8}}>Số tài khoản</Text>
                    <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={momoAccount} onChangeText={setMomoAccount} />
                    <Text style={{marginBottom: 8}}>Tên tài khoản</Text>
                    <TextInput style={{width: "100%", height: 40, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#000", borderStyle: "solid", padding: 10}} value={momoName} onChangeText={setMomoName} />
                    <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10}}>
                        <Button title={"Cập nhật"} color={"#2e89ff"} onPress={async ()=> {
                            await updateMomo(momoAccount, momoName, uid)
                            setChange(prev=> !prev)
                            setOpenChange(()=> false)
                        }} />
                        <Text style={{marginTop: 12}}></Text>
                        <Button onPress={()=> setOpenChange(()=> false)} title={"Hủy"} color={"#555"} />
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default MomoProfile