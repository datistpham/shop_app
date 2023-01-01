import React from 'react'
import { Text, View } from 'react-native'

const Footer = () => {
  return (
    <View style={{width: "100%", padding: 10, backgroundColor: "#5D3D2E"}}>
        <View style={{width: "100%", display: "flex"}}>
            <View>
                <Text style={{fontSize: 19, fontWeight: "600", color: "#fff", marginBottom: 12}}>Tiệm hoa Dalat Hasfarm</Text>
                <Text style={{color: "#fff", marginBottom: 6}}>Địa chỉ:  91/1 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, TPHCM</Text>
                <Text style={{color: "#fff", marginBottom: 6}}>Hotline: 0919 89 79 69</Text>
            </View>
            <View style={{marginTop: 12}}>
                <Text style={{color: "#fff", fontSize: 14, color: "#fff", textAlign: "center"}}>
                    © Copyright 2020-2022 Dalat Hasfarm.
                </Text>
            </View>
        </View>
    </View>
  )
}

export default Footer