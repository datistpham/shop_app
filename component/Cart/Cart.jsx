import React, { useContext, useEffect, useState } from 'react'
import { Button, FlatList, Image, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import add_item_cart from '../../api/add_item_cart'
import get_cart_user from '../../api/get_cart_user'
import { styles } from '../DetailProduct/DetailProduct'
import numberWithCommas from '../utils/numberWithComma'
import _ from "lodash"
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppContext } from '../../App'
import { LogBox } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import Icons from 'react-native-vector-icons/MaterialIcons'
import deleteProduct from '../../api/delete_product'
import { Snackbar } from 'react-native-paper'

const Cart = () => {
  const isFocused = useIsFocused();
  const navigation= useNavigation()
  const {uid, change, setChange}= useContext(AppContext)
  const [data, setData]= useState([])
  const [change1, setChange1]= useState(false)
  const route= useRoute()
  useEffect(()=> {
    get_cart_user(uid, setData)
  }, [uid, change, route.name, isFocused, change1])
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  useEffect(()=> {
    setChange(prev=> !prev)
  }, [])
  return (
    <View style={{flex: 1, position: "relative"}}>
      <ScrollView style={{marginTop: 40}}>
        <Text style={{fontSize: 18, fontWeight: "600", marginTop: 12, marginBottom: 12, textAlign: "center"}}>
            Giỏ hàng của bạn
        </Text>
        <Text style={{fontSize: 15, textAlign: "center", marginBottom: 12}}>Có {data?.length || 0} sản phẩm trong giỏ hàng của bạn</Text>
        <ScrollView>
          <FlatList data={data} renderItem={({item, index, separators})=> <ComponentCartItem setChange1={setChange1} setData={setData} data={data} setChange={setChange} id_user={uid} key={index} {...item} separators={separators} />} />
        </ScrollView>
        {/* <View style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", marginTop: 12, padding: 10}}>
        <View style={{ padding: 10, borderRadius: 10, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <Text style={{fontSize: 17}}>Tổng tiền: </Text><Text style={{marginLeft: 12, fontWeight: "600", fontSize: 18, color: "#f00"}}>{numberWithCommas(_.sumBy(data, function(e) {return parseInt(e.price) * parseInt(e.amount)}))}đ</Text>
        </View>
        <Button onPress={()=> navigation.navigate("Checkout", {cart: data})} title="Thanh toán" color={"#f00"} />
      </View> */}
      </ScrollView>
      {
        data?.length > 0 && 
        <View style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff", marginTop: 12, padding: 10, position: "absolute", bottom: 0, left: 0}}>
          <View style={{ padding: 10, borderRadius: 10, display: "flex", alignItems: "center", flexDirection: "row"}}>
            <Text style={{fontSize: 17}}>Tổng tiền: </Text><Text style={{marginLeft: 12, fontWeight: "600", fontSize: 18, color: "#f00"}}>{numberWithCommas(_.sumBy(data, function(e) {return parseInt(e.price) * parseInt(e.amount)}))}đ</Text>
          </View>
          <Button onPress={()=> navigation.navigate("Checkout", {cart: data})} title="Thanh toán" color={"#f00"} />
        </View>
      }
    </View>
  )
}

const ComponentCartItem= (props)=> {
  const [amount, setAmount]= useState(0)
  const [visible, setVisible]= useState(false)
  const onDismissSnackBar = () => setVisible(false);
  const {setChange}= useContext(AppContext)
  const addAmount= ()=> {
    add_item_cart(props?.id_user, props?.id_product, parseInt(1))
    setAmount(prev=> parseInt(prev) + parseInt(1))
    setChange(prev=> !prev)
    props?.setChange1(prev=> !prev)
  } 
  const substractAmount= ()=> {
    if(parseInt(amount)=== 1) {

    }
    else {
      setChange(prev=> !prev)
      add_item_cart(props?.id_user, props?.id_product, -parseInt(1))
      setAmount(prev=> parseInt(prev) - parseInt(1))
      props?.setChange1(prev=> !prev)
    }
  }
  useEffect(()=> {
    setAmount(props?.amount)
  }, [props?.amount])
  const delete_product= ()=> {
    deleteProduct(props?.id_product, props?.id_user)
    props?.setData(props?.data?.filter(item=> parseInt(item?.id_product) !== parseInt(props?.id_product)))
    props?.setChange(prev=> !prev)
    setVisible(()=> true)
  }
  return (
    <View style={{width: "100%", display: 'flex', justifyContent: "space-between", flexDirection: 'row', padding: 10, borderRadius: 10, borderStyle: "solid", borderWidth: 1, borderColor: "#e7e7e7", backgroundColor: "#fff", marginBottom: 12}}>
      <View style={{display: 'flex', justifyContent: "center", flexDirection: "row"}}>
        <Image style={{width: 150, aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: props.image1}} />
        <View style={{marginLeft: 12}}>
          <Text style={{fontWeight: "600", fontSize: 18}}>
            {props?.product_name}
          </Text>
          <Text style={{marginTop: 12, marginBottom: 24}}>{numberWithCommas(parseInt(props?.price))}đ</Text>
          <View style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
            <TouchableHighlight onPress={substractAmount} underlayColor={"#2e89ff"}>
              <View style={[styles.borderItem, {width: 24, height: 24, display: "flex", justifyContent: "center", alignItems: "center"}]}>
                <Text>-</Text>
              </View>
            </TouchableHighlight>
            <View style={[styles.borderItem, {width: 24, height: 24, display: "flex", justifyContent: "center", alignItems: "center"}]}>
              <Text>{amount}</Text>
            </View>
            <TouchableHighlight onPress={addAmount} underlayColor={"#2e89ff"}>
              <View style={[styles.borderItem, {width: 24, height: 24, display: "flex", justifyContent: "center", alignItems: "center"}]}>
                <Text>+</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 12}}>
            <Text>Tổng: </Text><Text style={{fontSize: 18, fontWeight: "600", marginLeft: 12}}>{numberWithCommas(parseInt(parseInt(amount) * parseInt(props?.price)))}đ</Text>
          </View>
        </View>
      </View>
      <View>
        <Icons onPress={delete_product} name={"close"} size={18} />
      </View>
      <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Close',
            onPress: () => onDismissSnackBar,
          }}>
            Xóa sản phẩm khỏi giỏ hàng thành công
      </Snackbar>
    </View>
  )
}

export default Cart
