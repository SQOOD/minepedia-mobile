import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Layout, Text } from '@ui-kitten/components'
import { t } from 'react-native-tailwindcss' 
import { Image } from 'react-native'

import Navigation from '@block/Navigation'
import CategoryList from '@block/CategoryList'
import TKDNAdvertisement from '@block/TKDNAdvertisement'
import categories from '@const/categories'

const Home = ({route}) => {

  return (
    <>
      <Navigation {...route}/>
      <ScrollView style={[t.bgWhite]}>
        <Layout>
          {/* <HomeModal/> */}
          <Image
            style={[t.h50, t.wFull]}
            source={require('@img/banner.jpg')}
          />
          <Layout style={[t.borderB, t.borderGray400, t.mT5, t.pB1, t.mX2]}>
            <Text style={[t.fontBold, t.textGray700]}>Produk Terbaru</Text>
          </Layout>
          <Layout>
            <CategoryList sort='desc' take={5} horizontal home/>
          </Layout>
          <TKDNAdvertisement/>
          { categories.sort(() => 0.5 - Math.random()).slice(0, 3).map( (x,i) =>
            <Layout key={i}>
              <Layout style={[t.bgYellow600, t.rounded, t.mT1, t.pY1, t.pX2, t.mX2]}>
                <Text style={[t.fontBold, t.textWhite]}>{x.desc}</Text>
              </Layout>
              <Layout>
                <CategoryList sort='desc' take={5} category={x.code} horizontal home/>
              </Layout>
            </Layout>
          )
          }
          <Layout style={t.pY5} />
        </Layout>
      </ScrollView>
    </>
  )
}

export default Home
