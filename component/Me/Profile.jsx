import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Button, Text, TouchableHighlight, View } from 'react-native'
import get_user_profile from '../../api/get_user_profile'
import Modal from "react-native-modal";
import ChangeProfile from './ChangeProfile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../App';
import BankProfile from './BankProfile';

const Profile = () => {
  const navigation= useNavigation()
  const [data, setData]= useState()
  const [openChange, setOpenChange]= useState(false)
  const {uid, setAuth}= useContext(AppContext)
  useEffect(()=> {
    get_user_profile(uid, setData)
  }, [])
  return (
    <View style={{marginTop: 40, padding: 10}}>
        {
            !data && <ActivityIndicator size={"large"} color={"#2e89ff"} />
        }
        {
            data && <View>
            <Text style={{marginTop: 12, fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center"}}>
                Thông tin của bạn
            </Text>
            <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff"}}>
                <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24}}>
                    <View style={{width: 200}}>
                        <Text>Họ và tên: </Text>
                    </View>
                    <Text style={{fontWeight: "600"}}>{data.full_name} {data.username}</Text>
                </View>
                <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24}}>
                    <View style={{width: 200}}>
                        <Text>Email: </Text>
                    </View>
                    <Text style={{fontWeight: "600"}}>{data.email}</Text>
                </View>
                <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24}}>
                    <View style={{width: 200}}>
                        <Text>Số điện thoại: </Text>
                    </View>
                    <Text style={{fontWeight: "600"}}>{data.phone_number}</Text>
                </View>
                <View style={{display: "flex", alignItems: 'center', flexDirection: "row", marginBottom: 24, justifyContent: "center", width: "100%"}}>
                    <Button onPress={()=> setOpenChange(prev=> !prev)} title={"Cập nhật thông tin"} color={"#2e89ff"} />
                </View>
                <View>
                    <Modal isVisible={openChange}>
                        <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <View style={{width: "100%", padding: 10}}>
                                <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10}}>
                                    <ChangeProfile setOpen={setOpenChange} username={data.username} email={data.email} phone_number={data.phone_number} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            
            <BankProfile />

            <TouchableHighlight underlayColor={"unset"} style={{borderRadius: 10}} onPress={()=> navigation.navigate("History", {id_user: uid})}>
                <View style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%", padding: 10, borderRadius: 10, backgroundColor: "#fff", marginTop: 12}}>
                    <Text>Đơn mua</Text>
                    <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                        <Text style={{marginRight: 8}}>Lịch sử mua hàng</Text>
                        <Icon name={"keyboard-arrow-right"} size={16} />
                    </View>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"#2e89ff"} style={{borderRadius: 10, marginBottom: 12, marginTop: 12}} onPress={()=> navigation.navigate("History", {id_user: uid})}>
                <View style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%", padding: 10, borderRadius: 10, backgroundColor: "#fff"}}>
                    <Text></Text>
                    <TouchableHighlight onPress={()=> setAuth(false)} underlayColor={"unset"}>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <Text style={{marginRight: 8}}>Đăng xuất</Text>
                            <Icon name={"logout"} size={16} />
                        </View>
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        </View>
        }
    </View>
  )
}

export default Profile
