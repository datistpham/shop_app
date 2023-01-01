import React, { useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, View, Text, Image } from 'react-native'
// import { AppContext } from '../../App'
import numberWithCommas from '../utils/numberWithComma';
import get_order_approved from '../../api/get_order_approved';
import { ActivityIndicator } from 'react-native-paper';
const Approved = () => {
  const uid= "8cd31eff-9098-42bc-99df-d11d8ff4e779"
  // const {uid}= useContext(AppContext)
  const [data, setData]= useState([])
  useEffect(()=> {
      get_order_approved(uid, setData)
  }, [])
  return (
    <View style={{flex: 1, padding: 10}}>
      {
        data.length <= 0 && <ActivityIndicator size={"large"} color={"#2e89ff"} />
      }
      {
        data.length > 0 && 
        <FlatList data={data} keyExtractor={(item, index) => String(index)} renderItem={({item, index, separators})=> <ComponentItem keyExtractor={(item, index) => String(index)} {...item} />} />
      }
    </View>
  )
}

const ComponentItem= (props)=> {
  return (
    <View>
      <View style={{width: "100%", padding: 10, borderRadius: 10, backgroundColor: "#fff", marginBottom: 12}}>
        <Text style={{marginBottom: 8}}>Họ tên người nhận <Text style={{fontSize: 18, fontWeight: "600"}}>{props?.username}</Text></Text>
        <Text style={{marginBottom: 8}}>Địa chỉ nhận hàng <Text style={{fontSize: 18, fontWeight: "600"}}>{props?.address}</Text></Text>
        <Text style={{marginBottom: 8}}>Email: <Text style={{fontSize: 18, fontWeight: "600"}}>{props?.email}</Text></Text>
        <Text style={{marginBottom: 8}}>Số điện thoại <Text style={{fontSize: 18, fontWeight: "600"}}>{props?.phone_number}</Text></Text>
        <Text style={{marginBottom: 8}}>Sản phẩm đã đặt</Text>
        <View style={{display: "flex", flexDirection: "row"}}>
          <Image style={{width: 130, aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: props?.image1}} />
          <View style={{marginLeft: 12}}>
            <Text style={{fontWeight: "600", marginBottom: 12}}>{props?.product_name}</Text>
            <Text style={{marginBottom: 8}}>Giá: <Text style={{fontSize: 18, fontWeight: "600"}}>{numberWithCommas(parseInt(props?.price))}đ</Text></Text>
            <Text style={{marginBottom: 8}}>Số lượng: <Text style={{fontSize: 18, fontWeight: "600"}}>{props?.amount}</Text></Text>
            <Text style={{marginBottom: 8}}>Thành tiền <Text style={{fontSize: 18, fontWeight: "600"}}>{numberWithCommas(parseInt(props?.amount) * parseInt(props?.price))}đ</Text></Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Approved
