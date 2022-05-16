import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import AppLoading from 'expo-app-loading';

import { Formik } from 'formik';
import { formValidationSchema } from '../../helper/validation_schema';
import {Shadow} from 'react-native-shadow-2';
import OpenIssues from './open_issues';
import ClosedIssues from './closed_issues';

const Tab = createMaterialTopTabNavigator();

export default function Issues() {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.logoWrap}>
            <View style={styles.logo}>
              <Image source={require('../../../../assets/logo.png')}></Image>
            </View>
          </View>


          <View style={styles.issueCountWrap}>
            <View><Text style={styles.heading}>Issues </Text></View>
            <View style={styles.badge}><Text style={{color: 'rgba(230,231,233,0.5)'}}> 668 </Text></View>
          </View>

          <Tab.Navigator style={{width: '100%'}}>
            <Tab.Screen name="Open Issues" component={OpenIssues} />
            <Tab.Screen name="Closed Issues" component={ClosedIssues} />
          </Tab.Navigator>
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
  issueCountWrap: {
    flex: 1,
    marginTop: 34,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  heading: {
    fontSize: 20,
    color: '#fff',
  },
  badge: {
    fontSize: 14,
    borderRadius: 20,
    padding: 2,
    marginTop: 3,
    marginLeft:5,
    backgroundColor: 'rgba(230,231,233,0.5)',
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
