import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './Welcome/style'
import { useNavigation } from '@react-navigation/native';
import NavigationString from '../constant/NavigationString';
import { Image } from 'react-native-elements';

const Thankyou = () => {
    const navigation = useNavigation();
    const onSubmitPress  = () => {
      navigation.navigate(NavigationString.Welcome)
    }
  return (
    <View style={styles.container}>

      <Image
 source={require('../../assets/tq.jpg')}
 containerStyle={styles.image}
 PlaceholderContent={<ActivityIndicator/>}
 />
<TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={()=>{
  onSubmitPress()
}}>
<Text style={styles.text}>Go Home</Text>
</TouchableOpacity>
    </View>
  )
}

export default Thankyou

