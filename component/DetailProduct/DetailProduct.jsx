import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import get_detail_product from '../../api/get_detail_product'
import get_suggest_product from '../../api/get_suggest_product'
import numberWithCommas from '../utils/numberWithComma'
import { useScrollToTop } from '@react-navigation/native';
import add_item_cart from '../../api/add_item_cart'
import { Snackbar } from 'react-native-paper';
import { AppContext } from '../../App'

const DetailProduct = () => {
  const {uid, setChange, auth}= useContext(AppContext)
  const ref = useRef(null);
  const [data, setData]= useState()
  const route= useRoute()
  const [amount, setAmount]= useState(1)
  const navigation= useNavigation()
  useScrollToTop(ref)
  useEffect(()=> {
    if(route.params?.productId) {
      get_detail_product(route.params?.productId, setData)
    }
  }, [route.params])
  const addAmount= ()=> {
    setAmount(prev=> parseInt(prev) + parseInt(1))

  } 
  const substractAmount= ()=> {
    if(parseInt(amount)=== 1) {

    }
    else {
      setAmount(prev=> parseInt(prev) - parseInt(1)) 
    }
  }
  const order= async()=> {
    if(auth=== true ) {
      await add_item_cart(uid, route.params.productId, amount)
      setChange(prev=> !prev)
      setVisible(true)
    }
    else {
      navigation.navigate("Login")
    }
  }
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={{flex: 1}}>

      <ScrollView ref={ref}>
        <View style={{marginTop: 12, padding: 10}}>
          {
            !data && <ActivityIndicator size={"large"} color={"#2e89ff"} />
          }
          {
            data && <View style={{padding: 10, backgroundColor: "#fff", borderRadius: 10}}>
              <View style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "row"}}>
                <View style={{width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <Image style={{width: "100%", aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: data?.image1}} />
                </View>
                <View style={{paddingLeft: 10, width: "50%"}}>
                  <Text numberOfLines={2} style={{fontSize: 18, fontWeight: "600", color: "#000", overflow: "hidden", marginBottom: 8}}>{data?.product_name}</Text>
                  <Text numberOfLines={2} style={{fontSize: 16, fontWeight: "600", color: "#000", overflow: "hidden", marginBottom: 8}}>Mô tả: {data?.product_name}</Text>
                  <Text numberOfLines={2} style={{fontSize: 16, fontWeight: "600", color: "#000", overflow: "hidden", marginBottom: 8}}>Giá: {numberWithCommas(parseInt(data?.price))}đ</Text>
                  <View>
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
                    <TouchableHighlight underlayColor={"unset"} onPress={order} style={{ marginTop: 4}}>
                      <View style={{height: 36, width: 140, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#2e89ff", borderRadius: 5}}>
                        <Text style={{color: "#fff"}}>Thêm vào giỏ hàng</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
              <View style={{width: "100%", marginTop: 12}}>
                <Text style={{marginBottom: 12, fontSize: 17, fontWeight: "600", textAlign: "center", marginTop: 12 }}>
                  Sản phẩm có liên quan
                </Text>
                <SuggestProduct />
              </View>
            </View>
          }
          
        </View>
      </ScrollView>
      <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Close',
            onPress: () => onDismissSnackBar,
          }}>
            Thêm vào giỏ hàng thành công
      </Snackbar>
    </View>
  )
}

export const styles= StyleSheet.create({
  borderItem: {
    borderWidth: 1, 
    borderStyle: "solid",
    borderColor: "#d9d9d9"
  }
})

export default DetailProduct

const SuggestProduct= ()=> {
  const navigation= useNavigation()
  const [data, setData]= useState([])
  useEffect(()=> {
    get_suggest_product(setData)
  }, [])
  const renderProduct= (suggestProduct)=> {
    return suggestProduct?.map((item, key)=> <View style={{width: "50%", padding: 10}} key={key}>
      <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.navigate("DetailProduct", {productId: item.id, name: item.product_name})}>
        <View style={{width: "100%", backgroundColor: "#fff", padding: 10, borderRadius: 10}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Image style={{width: "100%", aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: item.image1}} />
          </View>
          <View>
            <Text numberOfLines={1} style={{overflow: "hidden", marginBottom: 8, marginTop: 8, fontSize: 14, fontWeight: "600"}}>{item.product_name}</Text>
            <Text numberOfLines={2} style={{overflow: "hidden", marginBottom: 8}}>Mô tả: {item.product_description}</Text>
          </View>
          <View>
            <Text>Giá: {numberWithCommas(parseInt(item.price))}đ</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>)
  }
  return (
    <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap"}}>
      {renderProduct(data)}
    </View>
  )
}
