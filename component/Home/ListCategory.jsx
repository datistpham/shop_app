import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'

const ListCategory = () => {
  return (
    <View>
        <Swiper showsPagination={false} style={{height: 300}} autoplay={true} autoplayDirection={true} autoplayTimeout={2.5}>
            <View style={[styles.slide]}>
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291596/single/03251_rvofik.jpg"} title={"Hoa bó"} />
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291592/single/z3882183934658_d1dc2b7cf698932aa68ef28e509ede98_agzuff.jpg"} title={"Thông tươi noel"} />
            </View> 
            <View style={[styles.slide]}>
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291595/single/03242_huqdlz.jpg"} title={"Bình hoa"} />
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291591/single/4127a_hpncrl.jpg"} title={"Giỏ hoa"} />
            </View> 
            <View style={[styles.slide]}>
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291591/single/486_dqowzj.jpg"} title={"Hoa cưới"} />
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291592/single/DSCF1057_aaywid.jpg"} title={"Kệ hoa"} />
            </View> 
            <View style={[styles.slide]}>
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291593/single/502_lkysoo.jpg"} title={"Lan hồ điệp"} />
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291593/single/DSCF1226_yanxjf.jpg"} title={"Hoa tuylip"} />
            </View> 
            <View style={[styles.slide]}>
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291593/single/03288_nqykya.jpg"} title={"Hộp hoa"} />
                <ComponentCategory image={"https://res.cloudinary.com/cockbook/image/upload/v1672291596/single/03251_rvofik.jpg"} title={"Hoa bó"} />
            </View> 
        </Swiper>
    </View>
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

export default ListCategory

const ComponentCategory= ({image, title, link})=> {
    return (
        <View style={[styles.c_category, {width: "50%", display: "flex", justifyContent: "center", alignItems: "center"}]}>
            <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 12}}>
                <Image style={{width: "100%", aspectRatio: 1 / 1, borderRadius: 10}} source={{uri: image}} />
            </View>
            <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 16}}>{title}</Text>
            </View>
        </View>
    )
}