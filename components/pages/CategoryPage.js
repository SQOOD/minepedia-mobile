import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Layout } from '@ui-kitten/components'
import { t } from 'react-native-tailwindcss' 
// import randomColor from 'randomcolor'

import Navigation from '@block/Navigation'
import CategoryCard from '@block/CategoryCard'
import categories from '@const/categories'


const compare = ( a, b ) => {
  if ( a.code < b.code ){
    return -1;
  }
  if ( a.code > b.code ){
    return 1;
  }
  return 0;
}

const Cards = () => categories.sort(compare).map(
  x => {
    // const color = randomColor({
    //     luminosity: 'light',
    //     format: 'rgba',
    //     alpha: 0.9
    // })

    const color = 'rgba(0,0,0,0.5)'

    return (
      <CategoryCard
        key={x.code.charCodeAt(0) - 97}
        {...x}
        background={color}
      />
    )
  }
)

const CategoryPage = ({route}) => {
  
  return (
    <>
      <Navigation {...route}/>
      <ScrollView style={[t.bgWhite]}>
        <Layout style={[t.mY5]}>
          <Cards/>
        </Layout>
      </ScrollView>
    </>
  )
}

export default CategoryPage
