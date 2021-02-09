import React, { useEffect, useState } from 'react'
import { Layout, List, Divider, Text, TopNavigationAction, Icon } from '@ui-kitten/components'
import { t } from 'react-native-tailwindcss'
import { useQuery } from '@apollo/client'
import { ImageBackground } from 'react-native'
import {Picker} from '@react-native-picker/picker'

import Navigation from '@block/Navigation'
import ItemCard from '@block/ItemCard'
import Products from '@gql/Products'


const SearchResults = ({route, navigation}) => {
  const [selected, setSelected] = useState('desc')

  const x = route.params
  const { loading, refetch, error, data } = useQuery(Products, {
    variables:
    {
      sort: selected,
      search: x.search.toUpperCase()  
    }
  })

  useEffect(() => {
    refetch()
  }, [selected])

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
  
  const renderNavButton = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={()=>navigation.goBack()}
    />
  )

  const renderItem = ({ item, idx }) => (
    <ItemCard key={idx} {...item}/>
  )

  const CategoryTitle = () => {
    const imageURI = `https://minepedia.southeastasia.cloudapp.azure.com/image/categories/`

    return (
      <ImageBackground
        style={[t.h22, t.wFull]}
        source={{uri:`${imageURI}`}}
      >
        <Layout style={[
          t.shadow, t.flex, t.flexRow, t.justifyBetween, t.itemsCenter, t.h22, t.pX4,
          {backgroundColor:'rgba(0,0,0,0.5)'}
        ]}>
          <Text style={[t.textXl, t.textWhite]}>{x.search}</Text>
          <Layout style={[t.rounded]}>
            <Picker
              selectedValue={selected}
              style={[t.w48, t.h10]}
              onValueChange={x =>
                setSelected(x)
              }>
              <Picker.Item label="Harga Terendah" value="asc" />
              <Picker.Item label="Harga Tertinggi" value="desc" />
            </Picker>
          </Layout>
        </Layout>
      </ImageBackground>
    )
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error! {error.message}</Text>

  return (
    <>
      <Navigation {...route} icon={renderNavButton}/>
      <CategoryTitle/>
      <List
        data={data.products}
        style={t.mX1}
        contentContainerStyle={t.pB10}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        numColumns={2}
      />
    </>
  )
}

export default SearchResults
