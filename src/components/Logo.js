import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


export default function ImageInDrawer(){
    return (
      <View>
        <Image style={styles.logo} source={require('../assets/logo.jpg')}/>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 54,
        position: 'absolute',
        marginTop: 1,
        zIndex: 1,
        alignSelf: 'flex-end'
      },
   });