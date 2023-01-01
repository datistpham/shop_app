import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import Approved from './Approved';
import Pending from './Pending';
import Icons from "react-native-vector-icons/MaterialIcons"

const Tab = createBottomTabNavigator();
const History = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarLabelPosition: "beside-icon",
    tabBarLabelStyle: {
      fontWeight: "700",
      fontSize: 15
    },tabBarIconStyle: {display: "none"}}}>
        <Tab.Screen options={({navigation, route})=> ({
            title: "Chờ xác nhận",
            headerStyle: {
            backgroundColor: "#2e89ff"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            headerLeft: ()=> (
            <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.goBack(-1)}>
                <Icons name={"keyboard-arrow-left"} size={18} color={"#fff"} />
            </TouchableHighlight>
            ),
            headerTitleAlign: "center"
        })} name={"Pending"} component={Pending} />
        <Tab.Screen options={({navigation, route})=> ({
                title: "Đã mua",
                headerStyle: {
                backgroundColor: "#2e89ff"
            },
                headerTintColor: "#fff",
                headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: ()=> (
            <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.goBack(-1)}>
                <Icons name={"keyboard-arrow-left"} size={18} color={"#fff"} />
            </TouchableHighlight>
            ),
            headerTitleAlign: "center"
        })} name={"Approved"} component={Approved} />
    </Tab.Navigator>
  )
}

export default History
