import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Categories from '@page/Categories'
import Home from '@page/Home'
import Detail from '@page/Detail'
import TNC from '@page/TNC'
import CategoryPage from '@page/CategoryPage';
import SearchResults from '@page/SearchResults';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator initialRouteName='Home' headerMode='none'>
      <Stack.Screen name='Categories' component={Categories}/>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='Detail' component={Detail}/>
      <Stack.Screen name='TNC' component={TNC}/>
      <Stack.Screen name='CategoryPage' component={CategoryPage}/>
      <Stack.Screen name='SearchResults' component={SearchResults}/>
    </Stack.Navigator>
  )
}

export default Route