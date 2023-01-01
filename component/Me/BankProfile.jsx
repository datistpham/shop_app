import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import get_info_bank_user from '../../api/get_info_bank_user'
import { AppContext } from '../../App'
import ChangeBank from './ChangeBank'
import Modal from "react-native-modal";

const BankProfile = (props) => {
  const [data, setData]= useState([])
  const {uid}= useContext(AppContext)
  const [openChange, setOpenChange]= useState(false)
  useEffect(()=> {
    get_info_bank_user(uid, setData)
  }, [])
  return (
    <View style={{marginTop: 12}}>
        <Text style={{marginTop: 12, fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center"}}>
            Thông tin tài khoản ngân hàng
        </Text>
        <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff"}}>
            <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24}}>
                <View style={{width: 200}}>
                    <Text>Số tài khoản: </Text>
                </View>
                <Text style={{fontWeight: "600"}}>{data?.[0]?.account_number}</Text>
            </View>
            <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24}}>
                <View style={{width: 200}}>
                    <Text>Tên tài khoản: </Text>
                </View>
                <Text style={{fontWeight: "600"}}>{data?.[0]?.account_name}</Text>
            </View>
            <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24}}>
                <View style={{width: 200}}>
                    <Text>Ngân hàng: </Text>
                </View>
                <Text style={{fontWeight: "600"}}>{data?.[0]?.bank_name}</Text>
            </View>
            <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24}}>
                <View style={{width: 200}}>
                    <Text>Chi nhánh: </Text>
                </View>
                <Text style={{fontWeight: "600"}}>{data?.[0]?.branch}</Text>
            </View>
            <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24, justifyContent: "center", width: "100%"}}>
                <Button onPress={()=> setOpenChange(prev=> !prev)} title={"Cập nhật thông tin"} color={"#2e89ff"} />
            </View>
            <View>
                <Modal isVisible={openChange}>
                    <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: "100%", padding: 10}}>
                            <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10}}>
                                <ChangeBank setOpen={setOpenChange} account_number={data[0]?.account_number} account_name={data[0]?.account_name} bank_name={data[0]?.bank_name} branch={data[0]?.branch} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    </View>
  )
}

export default BankProfile
