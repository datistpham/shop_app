import { useNavigation, useRoute } from '@react-navigation/native'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, ScrollView, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import get_payment from '../../api/get_payment'
import numberWithCommas from '../utils/numberWithComma'

const Payment = () => {
  const [data, setData]= useState([])
  const route= useRoute()
  const navigation= useNavigation()

  useEffect(()=> {
    get_payment(route.params?.id_payment || "0bdecfea-92f2-4edc-8f1d-2eb303df562b", setData)
  }, [route.params])
  return (
    <View style={{flex: 1}}>
      <ScrollView nestedScrollEnabled={true}>
      <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff", flex: 1}}>
        <View style={{width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 12}}>
          <Image style={{width: 200, height: 60, marginBottom: 12}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1671249181/single/photo_2022-12-13_02-00-39_ylswk8-removebg-preview_pc6nqv.png"}} />
          <Icon name={"check"} color={"#2dc275"} size={32} />
          <Text style={{fontSize: 18, fontWeight: "600", marginTop: 12, textAlign: "center"}}>Cảm ơn bạn đã đặt hàng</Text>
        </View>
        <View style={{marginTop: 12, width: "100%", padding: 10}}>
          <View style={{width: "100%", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 5}}>
            <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>Thông tin mua hàng</Text>
            <Text style={{marginBottom: 8}}>{data?.user_book?.[0]?.username}</Text>
            <Text style={{marginBottom: 8}}>{data?.user_book?.[0]?.email}</Text>
            <Text style={{marginBottom: 8}}>{data?.user_book?.[0]?.phone_number}</Text>
            <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>Địa chỉ nhận hàng</Text>
            <Text style={{marginBottom: 8}}>{data?.user_book?.[0]?.address}</Text>
            <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>Phương thức thanh toán</Text>
            <Text style={{marginBottom: 8}}>{data?.user_book?.[0]?.method_name}</Text>
            <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>Phí vận chuyển</Text>
            <Text style={{marginBottom: 8}}>50,000đ</Text>
          </View>
        </View>
        {/*  */}
        <View style={{marginTop: 12, width: "100%", padding: 10}}>
          <View style={{width: "100%", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 5}}>
            <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>Thông tin đơn hàng</Text>
            <ScrollView>
            <FlatList data={data.items} renderItem={({item, index, separators})=> <View style={{width: "100%", marginBottom: 12, padding: 10, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}} key={index}>
              <View style={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "row"}}>
                <View style={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "row", position: "relative", zIndex: 99}}>
                  <Image style={{width: 60, height: 60, borderRadius: 10}} source={{uri: item.image1}} />
                  <View style={{ backgroundColor: "#000", borderRadius: 1000, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: -10, right: -10, zIndex: 99, aspectRatio: 1 / 1, width: 30}}>
                    <Text style={{color: "#fff", fontSize: 14}}>{item?.amount}</Text>
                  </View>
                </View>
                <Text style={{marginLeft: 12}}>{item.product_name}</Text>
              </View>
              <View>
                <Text>{numberWithCommas(parseInt(item?.amount) * parseInt(item?.price))}đ</Text>
              </View>
            </View>} />
            </ScrollView>
          </View>
        </View>
        {/*  */}
        <View style={{marginTop: 12, width: "100%", padding: 10}}>
          <View style={{width: "100%", borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 5}}>
            <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>Tổng tiền</Text>
            <View style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginBottom: 8}}>
              <Text>Tạm tính</Text>
              <Text>{numberWithCommas(_.sumBy(data.items, function(e) {return parseInt(e?.amount) * parseInt(e?.price)}))}đ</Text>
            </View>
            <View style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginBottom: 8}}>
              <Text>Phí vận chuyển</Text>
              <Text>50,000đ</Text>
            </View>
            <View style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginBottom: 8}}>
              <Text>Tổng cộng</Text>
              <Text>{numberWithCommas(_.sumBy(data.items, function(e) {return parseInt(e?.amount) * parseInt(e?.price)}) + parseInt(50000))}đ</Text>
            </View>
          </View>
        </View>
      </View>
      <Button onPress={()=> navigation.navigate("Home")} title={"Tiếp tục mua hàng"} />
    </ScrollView>
    </View>
  )
}

export default Payment