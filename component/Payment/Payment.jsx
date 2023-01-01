import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import get_payment from '../../api/get_payment'

const Payment = () => {
  const [data, setData]= useState([])
  const route= useRoute()
  const navigation= useNavigation()

  useEffect(()=> {
    get_payment(route.params?.id_payment, setData)
  }, [route.params])
  return (
    <View style={{padding: 10, borderRadius: 10, backgroundColor: "#fff"}}>
      <View style={{width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 12}}>
        <Image style={{width: 200, height: 60, marginBottom: 12}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1671249181/single/photo_2022-12-13_02-00-39_ylswk8-removebg-preview_pc6nqv.png"}} />
        <Icon name={"check"} color={"#2dc275"} size={32} />
      </View>
    </View>
  )
}

export default Payment