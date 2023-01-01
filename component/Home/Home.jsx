import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import get_hight_light_product from '../../api/get_hight_light_product'
import get_product_by_category from '../../api/get_product_by_category'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Banner from './Banner'
import HightLightProduct from './HightLightProduct'
import ListCategory from './ListCategory'

const Home = () => {
  const [dataHightLight, setDataHightLight]= useState([])
  useEffect(()=> {
    get_hight_light_product(setDataHightLight)
  }, [])
  return (
    <ScrollView>
        <Header />
        <View >
            <Banner />
            <ListCategory />
            <HightLightProduct listProduct={dataHightLight} title={"Sản phẩm nổi bật"} />
            <ComponentCatergory categoryId={6} title={"Hoa tuylip"} />
            <ComponentCatergory categoryId={1} title={"Hoa bó"} />
            <ComponentCatergory categoryId={8} title={"Bình hoa"} />
            <ComponentCatergory categoryId={11} title={"Hộp hoa"} />
        </View>
        <Footer />
    </ScrollView>
  )
}

const ComponentCatergory= ({categoryId, title})=> {
  const [data, setData]= useState([])
  useEffect(()=> {
    get_product_by_category(categoryId, setData)
  }, [])
  return (
    <HightLightProduct listProduct={data} title={title} />
  )
}

export default Home
