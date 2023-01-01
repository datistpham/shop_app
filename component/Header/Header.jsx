import React from 'react'
import { Image, View } from 'react-native'

const Header = () => {
  return (
    <View style={{backgroundColor: "#e1cfbb", padding: 5, marginTop: 45}}>
        <Image style={{width: 200, height: 60}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1671249181/single/photo_2022-12-13_02-00-39_ylswk8-removebg-preview_pc6nqv.png"}} />
    </View>
  )
}

export default Header