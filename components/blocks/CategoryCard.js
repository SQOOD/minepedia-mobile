import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { t } from 'react-native-tailwindcss'
import { useNavigation } from '@react-navigation/native'

const CategoryCard = (props) => {

  const navigate = useNavigation().navigate
  const imageURI = `https://minepedia.southeastasia.cloudapp.azure.com/image/categories/`

  return (
    <TouchableOpacity 
      onPress={() => navigate('Categories', {...props})}
      style={[t.mB5, t.mX5, t.overflowHidden, t.rounded,]}
      activeOpacity={0.5}
    >
      <ImageBackground
        style={[t.h22,t.wFull]}
        source={{uri:`${imageURI}${props.file}`}}
      >
        <Layout style={[
          t.shadow, t.flex, t.flexCol, t.justifyCenter, t.itemsStart, t.h22, t.pX4,
          {backgroundColor:props.background}
        ]}>
          { props.code ?
            <>
              <Text style={[t.text3xl, t.textWhite, t.fontBold]}>{props.code}</Text>
              <Text style={[t.textWhite]}>{props.desc}</Text>
            </>
            :
            <Text style={[t.textXl, t.textWhite]}>{props.desc}</Text>
          }
        </Layout>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default CategoryCard
