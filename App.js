// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './component/Home/Home';
import DetailProduct from './component/DetailProduct/DetailProduct';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from "react-native-vector-icons/MaterialIcons"
import Product from './component/Product/Product';
import Search from './component/Search/Search';
import Me from './component/Me/Me';
import Login from './component/Me/Login';
import Signup from './component/Me/Signup';
import { createContext, useContext, useEffect, useState } from 'react';
import Cart from './component/Cart/Cart';
import get_cart_user from './api/get_cart_user';
import _ from 'lodash';
import History from './component/History/History';
import Checkout from './component/Checkout/Checkout';
import Payment from './component/Payment/Payment';
import { LogBox } from 'react-native';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppContext= createContext()
export default function App() {
  useEffect(()=> {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  const [uid, setUid]= useState("")
  const [auth, setAuth]= useState(false)
  const [listCart, setListCart]= useState([])
  const [change, setChange]= useState(false)
  useEffect(()=> {
    if(uid.length > 0 ) {
      get_cart_user(uid, setListCart)
    }
  }, [uid,change])
  return (
    <AppContext.Provider value={{setUid, setAuth, uid, auth, listCart, setListCart, setChange}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TabApp" screenOptions={{animation: "slide_from_right"}}>
            <Stack.Screen name={"Checkout"} options={({navigation})=> ({
                title: "Thanh toán",
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
              })} component={Checkout} />
            {
              auth=== false && <>
                <Stack.Screen name={"Login"} options={({navigation, route})=> ({
                  title: "Đăng nhập",
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
                })} component={Login} />
                <Stack.Screen name={"Signup"} options={({navigation, route})=> ({
                  title: "Đăng ký",
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
                })} component={Signup} />
              </>
            }
            {
              auth=== true && <>
                <Stack.Screen name={"Login"} options={({navigation, route})=> ({
                  title: "Đăng nhập",
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
                })} component={Home} />
                <Stack.Screen name={"Signup"} options={({navigation, route})=> ({
                  title: "Đăng ký",
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
                })} component={Home} />
              </>
            }
            <Stack.Screen options={{headerShown: false}} name={"TabApp"} component={TabApp} />
            <Stack.Screen options={{headerTitle: "Quên mật khẩu", headerTitleAlign: "center", headerTintColor: "#fff", headerStyle: {backgroundColor: "#2e89ff"}}} name={"ForgotPassword"} component={ForgotPassword} />
            <Stack.Screen options={{headerShown: false}} name={"History"} component={History} />
            <Stack.Screen options={({navigation, route})=> ({
              title: route.params.name,
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
            })} name={"DetailProduct"} component={DetailProduct} />
            
            <Stack.Screen options={({navigation, route})=> ({
              title: "Thanh toán thành công",
              headerStyle: {
                backgroundColor: "#2e89ff"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerBackVisible: false,
              headerTitleAlign: "center"
            })} name={"Payment"} component={Payment} />
          </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TabApp= ()=> {
  const {auth, listCart}= useContext(AppContext)
  const renderAmountOrder= ()=> {
    if(listCart?.length >= 0 ) {
      return _.sumBy(listCart, function(e) {return parseInt(e.amount)}) || 0
    }
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if(route.name=== "Home") {
            if(focused=== true) {
              return <Icons name={"home"} size={24} color={"#2e89ff"} />
            }
            else {
              return <Icons name={"home"} size={24} color={"#000"} />
            }
          }
          else if(route.name=== "Product") {
            if(focused=== true) {
              return <Icons name={"shopping-bag"} size={24} color={"#2e89ff"} />
            }
            else {
              return <Icons name={"shopping-bag"} size={24} color={"#000"} />
            }
          }
          else if(route.name=== "Search") {
            if(focused=== true) {
              return <Icons name={"search"} size={24} color={"#2e89ff"} />
            }
            else {
              return <Icons name={"search"} size={24} color={"#000"} />
            }
          }
          else if(route.name=== "Me") {
            if(focused=== true) {
              return <Icons name={"person"} size={24} color={"#2e89ff"} />
            }
            else {
              return <Icons name={"person"} size={24} color={"#000"} />
            }
          }
          else if(route.name=== "Cart" && auth=== true) {
            if(focused=== true) {
              return <Icons name={"shopping-cart"} size={24} color={"#2e89ff"} />
            }
            else {
              return <Icons name={"shopping-cart"} size={24} color={"#000"} />
            }
          }
          
        },
        tabBarActiveTintColor: '#2e89ff',
        tabBarInactiveTintColor: '#000',
      })}
    >
    <Tab.Screen name={"Home"} options={{headerShown: false}} component={Home} />
    <Tab.Screen name={"Product"} options={{headerShown: false}} component={Product} />
    <Tab.Screen name={"Search"} options={{headerShown: false}} component={Search} />
    {
      auth=== true && <Tab.Screen name={"Cart"} options={{headerShown: false, tabBarBadge: renderAmountOrder(), tabBarBadgeStyle: {backgroundColor: "#2e89ff"}}} component={Cart} />
    }
    <Tab.Screen name={"Me"} options={{headerShown: false}} component={Me} />
  </Tab.Navigator>
  )
}
