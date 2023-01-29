import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import Swiper from 'react-native-swiper'

const HightLightProduct = ({listProduct, title}) => {
  const renderList= (list)=> {
    return list?.map((item, key)=> <View style={styles.slide} key={key}>
        <ComponentProduct link={item.id} image={item.image1} title={item.product_name} />
    </View>)
  }
  return (
    <View style={{}}>
        <View>
            <Text style={{marginBottom: 12, fontSize: 18, fontWeight: "600", textAlign: "center"}}>{title}</Text>
            {
                listProduct?.length > 0 && <Swiper showsPagination={false} style={{height: 300}} autoplay={true} autoplayDirection={true} autoplayTimeout={2.5}>
                {renderList(listProduct)}
            </Swiper>
            }
        </View>
    </View>
  )
}

export default HightLightProduct

const ComponentProduct= ({image, title, link})=> {
    const navigation= useNavigation()
    return (
        <TouchableHighlight  style={[styles.c_category, {width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}]} underlayColor={"unset"} onPress={()=> navigation.navigate("DetailProduct", {productId: link})}>
            <View style={[styles.c_category, {width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}]}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 12}}>
                    <Image style={{width: "100%", aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: image}} />
                </View>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 16}}>{title}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles= StyleSheet.create({
    slide: {
        width: "100%",
        display: "flex", justifyContent: "center",  
        alignItems: "center", flexDirection: "row",
    },
    c_category: {
        padding: 10
    }
})