import React, {useState} from 'react'
import { TopNavigation, TopNavigationAction, Input, Icon } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { t } from 'react-native-tailwindcss'

const Navigation = (props) => {
  const goBack = useNavigation().goBack
  const navigate = useNavigation().navigate

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );

  const Category = (props) => (
    <Icon {...props} name='menu-outline'/>
  );

  const renderNavButton = () => {
    if(props.name == 'Home') 
      return <TopNavigationAction icon={Category} onPress={()=>navigate('CategoryPage')}/>
    else 
      return <TopNavigationAction icon={BackIcon} onPress={()=>goBack()}/>
  }
  
  const renderNavInput = () => {
    const [value, setValue] = useState('')

    return (
      <Input
        style={t.w75}
        value={value}
        placeholder='Cari Barang'
        accessoryRight={(props) => {
          return (
            <TouchableWithoutFeedback>
              <Icon {...props} name={'search'} onPress={()=>navigate('SearchResults', {search: value})} />
            </TouchableWithoutFeedback>
          )
        }}
        onChangeText={x => setValue(x)}
      />
    )
  }

  return (
    <TopNavigation
      style={[t.pX5, t.shadowMd]}
      accessoryRight={renderNavInput}
      accessoryLeft={renderNavButton}
    />
  )
}

export default Navigation
