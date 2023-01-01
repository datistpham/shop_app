import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Swiper from 'react-native-swiper'

const Banner = () => {
  return (
    <View>
        <Swiper showsPagination={false} style={{height: 200}} autoplay={true} autoplayDirection={true} autoplayTimeout={2.5}>
            <View style={[styles.slide]}>
                <Image style={{width: "100%", height: "100%"}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1672289537/single/z3887783817868_889970837a0593eafa896ee52c1c1e23-1920x960_kbrmou.jpg"}} />
            </View> 
            <View style={[styles.slide]}>
                <Image style={{width: "100%", height: "100%"}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1672289801/single/z3883960337003_19429491c7af8375f39c1fb5eaf721d5-1920x960_w1yqzv.jpg"}} />
            </View> 
            <View style={[styles.slide]}>
                <Image style={{width: "100%", height: "100%"}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1672289802/single/da50c1c08d484b161259-1920x960_nx3klb.jpg"}} />
            </View> 
        </Swiper>
    </View>
  )
}

const styles= StyleSheet.create({
    slide: {
        width: "100%",
    }
})

export default Banner