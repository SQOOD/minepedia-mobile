import React, { useState } from 'react'
import { Button, Card, Modal, Text } from '@ui-kitten/components'
import * as SecureStore from 'expo-secure-store'
import { t } from 'react-native-tailwindcss'
import { useNavigation } from '@react-navigation/native'

const HomeModal = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigation().navigate
  return (
    <>
    <Button onPress={()=> setVisible(!visible)}>
      aa
    </Button>
    <Modal
      visible={visible}
      backdropStyle={t.bgGray700}
    >
      <Card disabled={true}>
        <Text style={[t.textLg, t.fontBold, t.textRed800, t.textCenter, t.uppercase]}>
          Perhatian !
        </Text>
        <Text style={[t.pT5, t.textSm, t.textJustify]}>
          {'\t'}Dengan mengakses dan/atau menggunakan Minepedia, Anda mengakui bahwa telah
          membaca, memahami, dan menyetujui untuk terikat oleh <Text style={[t.textOrange700, t.fontBold]} onPress={() => navigate('TNC')}>Syarat dan Ketentuan</Text>
          . Penggunaan yang ditetapkan dalam kaitannya dengan Minepedia, termasuk namun
          tidak terbatas pada kerahasiaan, yang merupakan bagian yang tidak terpisahkan.
        </Text>
        <Text style={[t.pT3, t.pB5, t.textSm, t.textJustify]}>
          {'\t'}Kami dapat mengubah, memodifikasi, menambah dan
          menghapus <Text>Syarat dan Ketentuan</Text> sewaktu-waktu. <Text>Syarat dan Ketentuan</Text> harus dibaca secara
          berkala. Dengan terus mengakses dan/atau menggunakan Minepedia setelah perubahan 
          terhadap <Text>Syarat dan Ketentuan</Text>, Anda sepakat dan setuju terhadap perubahan.
        </Text>
        <Button onPress={() => {
            setVisible(false)
            SecureStore.setItemAsync('launched', 'true').then(SecureStore.getItemAsync('launched').then(x=>console.log(x)))
          }}>
          Setuju
        </Button>
      </Card>
    </Modal>
    </>
  )
}

export default HomeModal
