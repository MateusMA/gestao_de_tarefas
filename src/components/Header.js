import React from 'react';
import { StyleSheet, View } from 'react-native';
import Menu from './Menu';
import Logo from './Logo';

export default function Header() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo />
            <Menu />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#eee',
    },
    header: {
      flex: 2,
      marginBottom: 8,
      backgroundColor: '#000'
    },
  });