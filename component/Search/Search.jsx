import React, { useEffect, useState } from 'react'
import { View, ScrollView, TextInput, TouchableHighlight, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import get_all_product from '../../api/get_all_product'
import Header from '../Header/Header'
import Fuse from "fuse.js"
import numberWithCommas from '../utils/numberWithComma'
import { useNavigation } from '@react-navigation/native'

const Search = () => {
  const navigation= useNavigation()
  const [data, setData]= useState([])
  const [dataSearch, setDataSearch]= useState([])
  const [querySearch, setQuerySearch]= useState("")
  const [isFocused, setIsFocused]= useState(false)
  const handleFocus= ()=> {
    setIsFocused(true)
  }
  const handleBlur= ()=> {
    setIsFocused(false)
  }
  useEffect(()=> {
    get_all_product(setData)
  }, [])
  const options = {
    keys: [
      "product_name",
      "category_name",
      "price"
    ]
  };
  const fuse= new Fuse(data, options)
  const searchProduct= (e)=> {
    setQuerySearch(e)
    setDataSearch(fuse.search(e))
  }
  const renderProduct= (searchSuggestProduct)=> {
    return searchSuggestProduct?.map((item, key)=> <View style={{width: "50%", padding: 10}} key={key}>
      <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.navigate("DetailProduct", {productId: item.item.id, name: item.item.product_name})}>
        <View style={{width: "100%", backgroundColor: "#fff", padding: 10, borderRadius: 10}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Image style={{width: "100%", aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: item.item.image1}} />
          </View>
          <View>
            <Text numberOfLines={1} style={{overflow: "hidden", marginBottom: 8, marginTop: 8, fontSize: 14, fontWeight: "600"}}>{item.item.product_name}</Text>
            <Text numberOfLines={2} style={{overflow: "hidden", marginBottom: 8}}>Mô tả: {item.item.product_description}</Text>
          </View>
          <View>
            <Text>Giá: {numberWithCommas(parseInt(item.item.price))}đ</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>)
  }
  return (
    <ScrollView>
      <Header />
      <View style={{marginTop: 12}}>
        <View style={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center", padding: 10}}>
          <TextInput style={{width: "100%", height: 40, borderRadius: 80, borderStyle: "solid", borderWidth: 1, borderColor: isFocused ? "#2e89ff" : "#d9d9d9", padding: 10, fontSize: 17}} placeholder={"Tìm kiếm sản phẩm theo tên, mô tả, giá..."} onFocus={handleFocus} onBlur={handleBlur} value={querySearch} onChangeText={searchProduct} />
          <Icon name={"search"} size={20} style={{position: "absolute", right: 0, top: "50%", transform: [{translateX: -20}]}} />
        </View>
        {
          querySearch.length<= 0 && <Text style={{textAlign: "center", fontSize: 18, fontWeight: "600", marginTop: 12}}>
            Kết quả tìm kiếm sẽ được hiển thị dưới đây
          </Text>
        }
        {
          querySearch.length > 0 && <>
            {
              dataSearch.length> 0 && <View style={{width: "100%", display: "flex", alignItems: "center", flexDirection: "row", flexWrap: "wrap"}}>
                {renderProduct(dataSearch)}
              </View>
            }
            {
              dataSearch.length<= 0 && <Text style={{textAlign: "center", fontSize: 18, fontWeight: "600", marginTop: 12}}>
                Không tìm thấy sản phẩm nào 
            </Text>
            }
          </>
        }
      </View>
    </ScrollView>
  )
}

export default Search
