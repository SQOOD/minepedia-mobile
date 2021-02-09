import React, { useState } from 'react';
import { Avatar, Layout, Tab, TabView, Text } from '@ui-kitten/components';
import { t } from 'react-native-tailwindcss'
import { Image } from 'react-native'
// import Maps from '@block/Maps'

const ProductTab = (props) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageURI = `https://minepedia.southeastasia.cloudapp.azure.com/image/${props.id}/`

  return (
    <TabView
      style={[t.pT6, t.pB3, t.minH80]}
      selectedIndex={selectedIndex}
      indicatorStyle={t.bgOrange400}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='Rincian Produk'>
        <Layout style={[t.pX5]}>
          <Text style={[t.mB2, t.textGray700, { fontSize: 17}]}>{props.description}</Text>
          { props.details && <Text style={[t.textXs, t.textOrange700, t.mT2]}>Spesifikasi Produk :</Text> }
          { props.details &&
            props.details.map((x,i)=> (
              <Layout
                key={i}
                style={[t.borderB, t.pY1, t.borderGray200, t.flex, t.flexRow, t.justifyBetween]}
              >
                <Text style={[t.textGray600, t.capitalize]}>{x.key} :</Text>
                <Text style={[t.fontBold, t.textGray600]}>{x.value}</Text>
              </Layout>
            ))
          }
        </Layout>
      </Tab>
      <Tab title='Rincian Vendor'>
        <Layout style={[t.pX5]}> 
          <Layout style={[t.flex, t.flexRow, t.justifyCenter, t.itemsCenter, t.mB4]}>
            { props.imageURL.length != 0 &&
              <Avatar size='small' source={{uri: `${imageURI}${props.imageURL}`}}  />
            }
            <Text style={[t.fontBold, t.textXl, t.textGray700]}>{props.companyType}{props.companyType.length < 3 && '.'} {props.name}</Text>
          </Layout>
          <Layout style={[t.flex, t.flexRow, t.justifyCenter, t.mB3, t.flexWrap]}>
            <Text style={[t.textGray700]}>{props.address}, {props.district}, {props.province}</Text>
          </Layout>
          <Layout style={[t.flex, t.flexRow, t.justifyBetween]}>
            <Text style={[t.textGray600, t.textXs]}>Telepon</Text>
            <Text style={[t.textGray600, t.textXs]}>Email</Text>
          </Layout>
          <Layout style={[t.flex, t.flexRow, t.justifyBetween]}>
            <Text style={[t.fontBold, t.textGray700]}>{props.phone}</Text>
            <Text style={[t.fontBold, t.textGray700]}>{props.vendor.email}</Text>
          </Layout>
          {/* <Maps {...props.geolocation} name={props.name}/> */}
        </Layout>
      </Tab>
    </TabView>
  );
};

export default ProductTab