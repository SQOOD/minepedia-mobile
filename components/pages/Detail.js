import React, {useRef, useState, useCallback} from 'react'
import { Layout, Text, TopNavigationAction, Icon, List } from '@ui-kitten/components'
import { Image, Dimensions } from 'react-native'
import { t } from 'react-native-tailwindcss'
import currency from 'currency.js'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Navigation from '@block/Navigation'
import { ScrollView } from 'react-native-gesture-handler'
import ProductTab from '@block/ProductTab'

const Detail = ({route, navigation}) => {
  const x = route.params
  const imageURI = `https://minepedia.southeastasia.cloudapp.azure.com/image/${x.id}/`
  const sliderWidth = Dimensions.get('window').width

  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
  
  const renderNavButton = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={()=>navigation.goBack()}
    />
  )

  const Certified = (props) => {
    if (props.cert == 'SA') return (
      <Layout style={[t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
        <Image
          style={[t.w5,t.h5]}
          source={require('@img/certificate/sa-logo.png')}
        />
        <Text style={[t.textRed700,{fontSize:7}]}>
          TKDN Mandiri
        </Text>
      </Layout>
    )
    if (props.cert == 'SI') return (
      <Layout style={[t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
        <Image
          style={[t.w8,t.h5]}
          source={require('@img/certificate/si-logo.png')}
        />
        <Text style={[t.textGreen700,{fontSize:7}]}>
          SURVEYOR INDONESIA
        </Text>
      </Layout>
    )
    if (props.cert == 'SC') return (
      <Layout style={[t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
        <Image
          style={[t.w10,t.h5]}
          source={require('@img/certificate/sc-logo.png')}
        />
        <Text style={[t.textGreen700,{fontSize:7}]}>
          SUCOFINDO
        </Text>
      </Layout>
    )
    else return (<Text></Text>)
  }

  const MinPurchase = (props) => {
    if(props.minPurchase > 0) return (
      <Layout style={[t.bgTransparent, t.flex, t.flexRow]}>
        <Text style={[t.textGray600]}>
          Pembelian Minimum:
        </Text>
        <Text style={[t.mX1, t.fontBold, t.textGray700]}>
          {x.minPurchase}
        </Text>
        <Text style={[t.textGray600]}>
          {x.unit}
        </Text>
      </Layout>
    )
    else return (
      <Text style={[t.bgTransparent, t.fontBold, t.textGreen700]}>
        Tidak ada Pembelian Minimum
      </Text>
    )
  }

  const tkdnStyle = () => {
    if(x.tkdn <= 30) return (t.textRed700)
    if(x.tkdn > 70) return (t.textGreen700)
    else return (t.textYellow700)
  }

  const ProductDetail = () => {
    return (
      <>
        <Layout style={[t.pX5, t.pY2]}>
          <Layout style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter]}>
            <Text style={[t.text2xl, t.mB2, t.fontBold, t.textGray700, t.w70]}>
              {x.name}
            </Text>
            <Certified cert={x.certificate}/>
          </Layout>
          <Layout style={[t.flex, t.flexRow, t.justifyBetween]}>
            <Text style={[t.textGray600, t.fontBold]}>{x.productID}</Text>
            <Text style={[t.textGray700, t.textSm]}>TKDN: <Text style={[tkdnStyle(), t.fontBold]}>{x.tkdn} %</Text></Text>
          </Layout>
        </Layout>
        <Layout style={[t.borderY, t.bgGray200, t.pX5, t.borderGray400, t.pY2, t.flex, t.flexRow, t.justifyBetween, t.itemsCenter]}>
          <MinPurchase minPurchase={x.minPurchase}/>
          {x.customizable && 
            <Layout style={[t.bgTransparent, t.flex, t.flexCol, t.itemsCenter]}>
              <Icon fill='#38b2ac' style={[t.w5, t.h5]} name='settings-2'/>
              <Text style={[t.textTeal700,{fontSize:8}]}>Kostumisasi tersedia.</Text>
            </Layout>
          }
        </Layout>
      </>
    )
  }

  const rp = value => currency(value, { symbol: "Rp ", separator: ".", precision: 0 });

  const PriceHeader = ({children, style}) => (
    <Layout style={[style, t.flex, t.p4, t.justifyCenter, t.itemsCenter, t.bgOrange500]}>
      {children}
    </Layout>
  )

  const PriceRange = (props) => (
    <Layout style={[t.flex, t.flexRow, t.itemsCenter, t.borderB, t.borderGray200]}>
      <PriceHeader style={t.flexRow}>
        <Layout style={[t.flexCol, t.bgTransparent, t.alignCenter, t.justifyCenter]}>
          <Text style={[t.capitalize, t.textLg, t.fontBold, t.textWhite]}>
            harga
          </Text>
          <Text style={[{ fontSize:9 }, t.selfEnd, t.textWhite]}>( per {x.unit} )</Text> 
        </Layout>
      </PriceHeader>
      <Text style={[t.fontBold, t.textLg, t.mL2, t.textGray600]}>{rp(props.price).format()}</Text>
    </Layout>
  )

  const _renderItem = useCallback(({item, index}) => {
    return (
      <Layout key={index}>
        <Image
          style={[t.h70, t.wFull]}
          source={{
            uri: `${imageURI}${item}`
          }} 
        />
      </Layout>
    );
  },[])

  return (
    <ScrollView style={t.bgWhite}>
      <Navigation {...route} icon={renderNavButton}/>
      { x.imageURL.length == 0 ?
        <Layout
          style={[t.wFull, t.borderB, t.borderGray400, t.h70, t.bgGray300, t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}
        >
          <Image style={[t.h20, t.w20]} source={require('@img/minepedialogo.png')}  />
          <Text style={[t.textGray700, t.mT2]}>Gambar Tidak Tersedia.</Text>
        </Layout>
        :
        <>
          <Carousel
            layout='default'
            ref={ref}
            data={x.imageURL}
            renderItem={_renderItem}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth}
            onSnapToItem={index => setActiveIndex(index)}
          />
          <Pagination
            dotsLength={x.imageURL.length}
            activeDotIndex={activeIndex}
            containerStyle={[t._mT12]}
            dotStyle={[t.h2, t.w2, t.roundedFull, t.bgGray200]}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </>
      }
      <ProductDetail/>
      <PriceRange {...x}/>
      <ProductTab {...x.profile} description={x.description} {...x.details}/>
    </ScrollView>
  )
}

export default Detail
