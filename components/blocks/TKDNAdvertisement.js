import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import { useQuery } from '@apollo/client'
import { t } from 'react-native-tailwindcss' 
import currency from 'currency.js'
import { useNavigation } from '@react-navigation/native'

import Products from '@gql/Products'
import { ImageBackground, TouchableOpacity } from 'react-native'

const TKDNAdvertisement = () => {
  const navigate = useNavigation().navigate

  const rp = value => currency(value, { symbol: "Rp ", separator: ".", precision: 0 });
  
  const { data } = useQuery(Products, {
    variables: {
      sort: 'asc',
      take: 4
    }
  })
  
  const x = data && data.products[data.products.length * Math.random() | 0]
  const imageURI = data && `https://minepedia.southeastasia.cloudapp.azure.com/image/${x.id}/`

  const truncate = (x, length) => {
    return x.length > length ? `${x.substring(0, length)} ...` : x
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={()=>navigate('Detail',{...x})}>
      <ImageBackground 
        style={[t.h20, t.rounded,t.m5, t.shadowMd, t.overflowHidden]}
        source={data && x.imageURL.length > 0 ? {uri:`${imageURI}${x.imageURL}`} : require('@img/icon.png')}
      >
        { data &&
          <Layout
            style={[t.wFull, t.hFull, t.flex, t.flexRow, t.justifyBetween, t.itemsCenter, t.pX7,{backgroundColor:'rgba(0,0,0,0.5)'}]}
          >
            <Text style={[t.textWhite, t.text4xl]}>{x.tkdn} %</Text>
            <Layout style={[t.bgTransparent, t.w150, t.flex, t.flexCol, t.flexWrap, t.justifyEnd, t.itemsEnd]}>
              <Text style={[t.textWhite, t.textXl, t.fontBold]}>{truncate(x.name, 16)}</Text>
              <Text style={[t.textWhite]}>{x.price > 0 && rp(x.price).format()}</Text>
            </Layout>
          </Layout>
        }
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default TKDNAdvertisement
