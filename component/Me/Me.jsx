import { useNavigation } from '@react-navigation/native'
import React, { useState, useContext } from 'react'
import { Image, StyleSheet, View, Text, Button, ScrollView } from 'react-native'
import Profile from './Profile'
import { AppContext } from '../../App'

const Me = () => { 
  const navigation= useNavigation()
  const {auth}= useContext(AppContext)

  return (
    
    <View style={{flex: 1}}>
        {
            auth=== false && <View style={[styles.container, {marginTop: 40}]}>
                <View style={[styles.flexC, {marginBottom: 12}]}>
                    <Image style={{width: 300, height: 100}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1671249181/single/photo_2022-12-13_02-00-39_ylswk8-removebg-preview_pc6nqv.png"}} />
                </View>
                <View>
                    <View style={styles.flexC}>
                        <Button onPress={()=> navigation.navigate("Login")} title={"Đăng nhập để tiếp tục"} color={"#2e89ff"} />
                    </View>
                    <Text style={{margin: 18, textAlign: 'center', fontWeight: "600", fontSize: 15}}>Hoặc</Text>
                    <View style={styles.flexC}>
                        <Button onPress={()=> navigation.navigate("Signup")} title={"Đăng ký"} color={"#841584"} />
                    </View>
                </View>
            </View>
        }
        {
            auth=== true && <Profile />
        }
    </View>
  )
}

export const styles= StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center', 
        alignItems: 'center'
    },
    flexC: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})


export default Me
