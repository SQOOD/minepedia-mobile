import React from 'react'
import { Layout, Text } from '@ui-kitten/components'
import { t } from 'react-native-tailwindcss'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Certified = (props) => {
  if (props.cert == 'SA') return <Text style={[t.textRed700,{fontSize:7}]}>TKDN Mandiri</Text>
  if (props.cert == 'SI') return <Text style={[t.textGreen700,{fontSize:7}]}>SURVEYOR INDONESIA</Text>
  if (props.cert == 'SC') return <Text style={[t.textGreen700,{fontSize:7}]} >SUCOFINDO</Text>
  else return (<Text>null</Text>)
}

const tkdnStyle = (x) => {
  if(x<= 10) return (t.bgRed800)
  if(x > 40) return (t.bgGreen700)
  if( x > 10 && x < 26 ) return ( t.bgRed600 )
  else return (t.bgYellow700)
}

const truncate = (x, length) => {
  return x.length > length ? `${x.substring(0, length)} ...` : x
}

const Content = (props) => {
  return(
    <Layout style={[t.pX3, t.mY3]}>
      <Text style={[t.fontSemibold, t.textGray500, t.textXs]}>{props.productID}</Text>
      <Text style={[t.textGray800,props.home && t.textSm, props.name.length > 20 ? t.mB2 : t.mB7]}>{truncate(props.name, 17)}</Text>
      <Layout style={[t.flex, t.flexRow, t.justifyBetween, t.itemsCenter]}>
        <Layout style={[t.w2_3]}>
          <Certified cert={props.certificate}/>
          <Text style={[t.textGray600, t.fontBold, t.textXs, props.profile.companyType.length + props.profile.name.length < 15 && t.mB4]}>
            {props.profile.companyType} {props.profile.name}
          </Text>
        </Layout>
        <Layout style={[tkdnStyle(props.tkdn), t.roundedFull, t.pX1, {paddingVertical:7}]}>
          <Text style={[t.textWhite, t.fontBold, {fontSize:9}]}>
            {('0' + props.tkdn).slice(-2)} %
          </Text>
        </Layout>
      </Layout>
    </Layout>
  )
}

const ItemCard = (props) => {

  const navigate = useNavigation().navigate
  const imageURI = `https://minepedia.southeastasia.cloudapp.azure.com/image/${props.id}/`

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={()=>navigate('Detail',{...props})}>
      <Layout style={[props.home ? t.w38 : t.w48, t.rounded, t.mX1, t.mT2, t.border, t.borderGray300]}>
        <Layout style={[t.bgGray200]}>
          <Image
            style={[props.home ? t.w38 : t.w48, props.home ? t.h38 : t.h48, props.imageURL.length == 0 && t.opacity50]}
            source={props.imageURL.length == 0 ? require('@img/noImageList.png') : {uri:`${imageURI}${props.imageURL[0]}`}}
          />
        </Layout>
        <Content {...props}/>
      </Layout>
    </TouchableOpacity>
  )
}

export default ItemCard
