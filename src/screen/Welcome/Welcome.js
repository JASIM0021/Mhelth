import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './style'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import NavigationString from '../../constant/NavigationString'

const Welcome = () => {
  const navigation = useNavigation();
  const onSubmitPress  = () => {
    navigation.navigate(NavigationString.Home)
  }
  return (
    <View style={styles.container}>

      <Image
 source={require('../../../assets/welcome.jpg')}
 containerStyle={styles.image}
 PlaceholderContent={<ActivityIndicator/>}
 />
<TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={()=>{
  onSubmitPress()
}}>
<Text style={styles.text}>Take The Survey</Text>
</TouchableOpacity>
    </View>
  )
}

export default Welcome

