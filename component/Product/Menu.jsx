import React from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  
const Menu = (props) => {
    return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Help" onPress={() => alert('Link to help')} />
        </DrawerContentScrollView>
    );
}

export default Menu

