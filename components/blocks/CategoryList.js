import React from 'react'
import { Layout, List, Divider, Text } from '@ui-kitten/components'
import { useQuery } from '@apollo/client'
import { t } from 'react-native-tailwindcss' 

import ItemCard from '@block/ItemCard'
import Products from '@gql/Products'

const CategoryList = (props) => {
    
  const { loading, error, data } = useQuery(Products, {
    variables: {
      category: props.category,
      sort: props.sort,
      take: props.take
    }
  })

  const renderItem = ({ item, idx }) => (
    <ItemCard home={props.home} key={idx} {...item}/>
  )

  if(loading) return <Text> Loading ...</Text>
  if(error) return <Text> Error {error.message}</Text>
  if(data) return (
    <Layout style={[t.bgTransparent]} >
      <List
        horizontal={props.horizontal}
        data={data.products}
        style={[t.mX1, t.bgTransparent]}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        numColumns={props.column}
      />
    </Layout>
  )
}

export default CategoryList
