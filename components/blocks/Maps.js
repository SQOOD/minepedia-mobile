import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Layout } from '@ui-kitten/components';
import { t } from 'react-native-tailwindcss'

const Maps = (props) => {
  return (
    <Layout style={[t.pY5]}>
      <MapView
        style={[t.h55,t.wFull]}
        initialRegion={{
          latitude: 0.7893,
          longitude: 117.9213,
          latitudeDelta: 35,
          longitudeDelta: 35,
        }}
      >
      { props.longitude && props.latitude &&
        <Marker
          coordinate={{
            longitude: props.longitude,
            latitude: props.latitude
          }}
          title={props.name}
        />
      }
      </MapView>
    </Layout>
  )
}

export default Maps
