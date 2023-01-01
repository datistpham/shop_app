import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableHighlight, Image, ScrollView, Dimensions } from 'react-native'
import { MenuProvider,Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,renderers  } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Octicons';

import get_all_product from '../../api/get_all_product';
import get_product_by_category from '../../api/get_product_by_category';
import Header from '../Header/Header';
import numberWithCommas from '../utils/numberWithComma';
const { SlideInMenu } = renderers;

const Product = () => {
  const navigation= useNavigation()
  const [data, setData]= useState([])
  const [callAllProduct, setCallAllProduct]= useState(false)
  const [currentPage, setCurrentPage]= useState(1)
  useEffect(()=> {
    get_all_product(setData)
  }, [callAllProduct])
  const renderProduct= (listProduct)=> {
    return listProduct?.slice((parseInt(currentPage) - 1) * 4, currentPage * 4)?.map((item, key)=> <View style={{width: "50%", padding: 10}} key={key}>
      <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.navigate("DetailProduct", {productId: item.id, name: item.product_name})}>
        <View style={{width: "100%", backgroundColor: "#fff", padding: 10, borderRadius: 10}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Image style={{width: "100%", aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: item.image1}} />
          </View>
          <View>
            <Text numberOfLines={1} style={{overflow: "hidden", marginBottom: 8, marginTop: 8, fontSize: 14}}>{item.product_name}</Text>
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
    <ScrollView>
      <MenuProvider>
        <Header />
        <View style={{flex: 1}}>
          <Menu name={"category"} renderer={SlideInMenu} >
            <MenuTrigger>
              <View style={{backgroundColor: "#2e89ff", padding: 10}}>
                <View style={{display: "flex", alignItems:"center", flexDirection: "row"}}>
                  <Icon name={"menu"} size={24} color={"#fff"} />
                    <Text style={{fontSize: 19, fontWeight: "600", color: "#fff", marginLeft: 12}}>Danh mục sản phẩm</Text>
                </View>
              </View>
            </MenuTrigger>
            {/* render data */}
              <View style={{display: "flex", alignItems: "center", width: "100%", flexDirection: "row", flexWrap: "wrap", marginBottom: 8, flex: 1}}>
                {
                  data?.length <= 0 && <View style={{display: "flex", justifyContent: "center", alignItems: 'center', marginTop: 12, width: "100%", height: Dimensions.get("window").height - 180}}>
                    <Text style={{textAlign: "center", fontSize: 18, fontWeight: "600"}}>
                      Không tìm thấy sản phẩm yêu cầu
                    </Text>
                  </View>
                }
                {
                  data?.length > 0 && renderProduct(data)
                }
              </View>
            {/*  */}
            {/* pagination */}
                <Pagination page={Math.ceil(data?.length / 4)} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {/*  */}
            <MenuOptions>
              <ComponentMenuOptions category_id={-1} title={"Tất cả sản phẩm"} setData={setData} call_all_product={true} setCallAllProduct={setCallAllProduct} />
              <ComponentMenuOptions category_id={2} title={"20/11"} setData={setData} />
              <ComponentMenuOptions category_id={3} title={"Valentine"} setData={setData} />
              <ComponentMenuOptions category_id={4} title={"Hoa cưới"} setData={setData} />
              <ComponentMenuOptions category_id={1} title={"Hoa bó"} setData={setData} />
              <MenuLevel2_1 setData={setData} />
              <MenuLevel2_2 setData={setData} />
            </MenuOptions>
          </Menu>
        </View>
      </MenuProvider>
    </ScrollView>
  )
}

const ComponentMenuOptions= ({category_id, title, setData, call_all_product, setCallAllProduct})=> {

  const selectFunction= ()=> {
    if(call_all_product=== true ) {
      setCallAllProduct(prev=> !prev)
    }
    else {
      get_product_by_category(category_id, setData)
    }
  }
  return (
    <>
      <MenuOption onSelect={selectFunction}>  
        <View style={{padding: 10, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <Icon1 name={"square-fill"} size={15} />
          </View>
          <Text style={{fontSize: 17, marginLeft: 12}}>{title}</Text>
        </View>
      </MenuOption>
    </>
  )
}

const MenuLevel2_1= ({setData})=> {
  const [open, setOpen]= useState(false)
  const selectFunction= (category_id)=> {
    get_product_by_category(category_id, setData)
  }
  return (
    <>
      <TouchableHighlight underlayColor={"#2e89ff"} onPress={()=> setOpen(prev=> !prev)}>
        <View style={{padding: 10, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <Icon1 name={"square-fill"} size={15} />
          </View>
          <Text style={{fontSize: 17, marginLeft: 12}}>Các loại hoa khác</Text>
        </View>
      </TouchableHighlight> 
      {
        open=== true && <>
        <MenuOption onSelect={()=> selectFunction(5)}>  
          <View style={{padding: 10, paddingLeft: 20, display: "flex", alignItems: "center", flexDirection: "row"}}>
            <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
              <Icon1 name={"square-fill"} size={15} />
            </View>
            <Text style={{fontSize: 17, marginLeft: 12}}>Hoa lan</Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={()=> selectFunction(6)}>  
          <View style={{padding: 10, paddingLeft: 20, display: "flex", alignItems: "center", flexDirection: "row"}}>
            <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
              <Icon1 name={"square-fill"} size={15} />
            </View>
            <Text style={{fontSize: 17, marginLeft: 12}}>Hoa tuylip</Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={()=> selectFunction(7)}>  
          <View style={{padding: 10, paddingLeft: 20, display: "flex", alignItems: "center", flexDirection: "row"}}>
            <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
              <Icon1 name={"square-fill"} size={15} />
            </View>
            <Text style={{fontSize: 17, marginLeft: 12}}>Hoa hồng</Text>
          </View>
        </MenuOption>
      </>
      }
    </>
  )
}

const MenuLevel2_2= ({setData})=> {
  const [open, setOpen]= useState(false)
  const selectFunction= (category_id)=> {
    get_product_by_category(category_id, setData)
  }
  return (
    <>
      <TouchableHighlight underlayColor={"#2e89ff"} onPress={()=> setOpen(prev=> !prev)}>
        <View style={{padding: 10, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <Icon1 name={"square-fill"} size={15} />
          </View>
          <Text style={{fontSize: 17, marginLeft: 12}}>Các loại phụ kiện</Text>
        </View>
      </TouchableHighlight> 
      {
        open=== true && <>
      <MenuOption onSelect={()=> selectFunction(8)}>  
        <View style={{padding: 10, paddingLeft: 20, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <Icon1 name={"square-fill"} size={15} />
          </View>
          <Text style={{fontSize: 17, marginLeft: 12}}>Bình hoa</Text>
        </View>
      </MenuOption>
      <MenuOption onSelect={()=> selectFunction(9)}>  
        <View style={{padding: 10, paddingLeft: 20, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <Icon1 name={"square-fill"} size={15} />
          </View>
          <Text style={{fontSize: 17, marginLeft: 12}}>Giỏ hoa</Text>
        </View>
      </MenuOption>
      <MenuOption onSelect={()=> selectFunction(10)}>  
        <View style={{padding: 10, paddingLeft: 20, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <Icon1 name={"square-fill"} size={15} />
          </View>
          <Text style={{fontSize: 17, marginLeft: 12}}>Kệ hoa</Text>
        </View>
      </MenuOption>
      <MenuOption onSelect={()=> selectFunction(11)}>  
        <View style={{padding: 10, paddingLeft: 20, display: "flex", alignItems: "center", flexDirection: "row"}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <Icon1 name={"square-fill"} size={15} />
          </View>
          <Text style={{fontSize: 17, marginLeft: 12}}>Hộp hoa</Text>
        </View>
      </MenuOption>
    </>
      }
    </>
  )
}

const Pagination= ({page, currentPage, setCurrentPage})=> {
  const renderPage= ()=> {
    return Array.from(Array(parseInt(page)).keys())?.map((item, key)=> <TouchableHighlight onPress={()=> setCurrentPage(parseInt(item) + parseInt(1))} underlayColor={"unset"} key={key}>
        <View style={{padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#e7e7e7", borderStyle: "solid", display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10, backgroundColor: parseInt(currentPage) === parseInt(parseInt(item) + parseInt(1)) ? "#2e89ff" : "#fff"}}>
          <Text style={{color: parseInt(currentPage) === parseInt(parseInt(item) + parseInt(1)) ? "#fff" : "#000"}}>{parseInt(item) + 1}</Text>
      </View>
    </TouchableHighlight>)
  }
  return (
    <View style={{display: "flex", alignItems: "center", flexDirection: "row-reverse", marginTop: 12}}>
      <View style={{display: "flex", flexDirection: "row"}}>
        {
          parseInt(page) > 0 && renderPage()
        }
      </View>
    </View>
  )
}

export default Product
