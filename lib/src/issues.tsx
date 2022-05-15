import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import AppLoading from 'expo-app-loading';

import { Formik } from 'formik';
import { formValidationSchema } from '../validation_schema';
import {Shadow} from 'react-native-shadow-2';

export default function Issues() {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.logoWrap}>
            <View style={styles.logo}>
              <Image source={require('./../../assets/logo.png')}></Image>
            </View>
          </View>


          <View style={styles.inputWrap}>
            
          </View>
        </View>
          
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040c28'
  },
  contents: {
    marginTop: 24,
    width: '100%',
    height: 400,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  logoWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  logo: {
    width: '50%',
  },
  inputWrap: {
    flex: 1,
    marginTop: 68,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  textWrap: {
    width: '100%',
    marginTop: 36
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 12,
  },
  textInputWrap: {
    minWidth: '100%',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  input: {
    lineHeight: 20,
    minWidth: '100%',
    width: '100%',
    paddingTop: 18,
    paddingRight: 24,
    paddingBottom: 18,
    paddingLeft: 24,
    borderRadius: 12,
    color: '#fff'
  },
  buttonWrap: {
    marginTop: 47,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#9A41EA', 
    borderRadius: 8
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
    paddingHorizontal: 42,
    paddingVertical: 15,
    color: '#fff',
    fontWeight: 'bold'
  }
});
