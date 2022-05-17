import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Animated, TouchableOpacity, Platform, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import AppLoading from 'expo-app-loading';

import { Formik } from 'formik';
import { formValidationSchema } from '../../helper/validation_schema';
import {Shadow} from 'react-native-shadow-2';
import OpenIssues from './open_issues';
import ClosedIssues from './closed_issues';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, navigation }:{state:any, navigation:any}) {
  return (
    <>
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      backgroundColor: 'rgba(255,255,255,0.1)', borderColor:'#363D53', borderTopWidth:1, borderBottomWidth:1, paddingLeft:4
      }}>

    {state.routes.map((route: { key: React.Key | null | undefined; name: {} | null | undefined; }, index: any) => {
        return (
          <>
            <TouchableHighlight key={route.key}
            underlayColor="transparent"
            style={{
              opacity: state.index === index ? 1 : 0.5,
              paddingVertical: 14,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              marginLeft: 20,
            }}
            onPress={() => {
              navigation.navigate(route.name);
            }}>
              <>
            {route.name  == 'Closed' ? 
            <Image style={{marginTop:2}} source={require('../../../../assets/right_tick_mark.svg')}></Image> : 
            <Image style={{marginTop:2}} source={require('../../../../assets/open_issue.svg')}></Image>}
            <Text key={index} style={{color:'#ffffff', fontWeight:'bold', fontSize:14, marginLeft: 8}}>{route.name}</Text>
            </>
            </TouchableHighlight>
          </>
        )
    })}
    </View>
    </>
  );
}


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

          <Tab.Navigator style={styles.tabWrap}  screenOptions={{
              tabBarLabelStyle: { fontSize: 14, color: '#E6E7E9', textTransform: 'capitalize' },
              tabBarItemStyle: { width: 'auto' },
              tabBarStyle: { 
                // marginTop:(Platform.OS === 'ios') ? 0 : 0,
                // height : 40,
                backgroundColor: 'rgba(255,255,255,0.1)', borderColor:'#363D53', borderTopWidth:1, borderBottomWidth:1, paddingLeft:14 },
                tabBarIndicatorStyle: { backgroundColor: 'transparent' },
                tabBarShowIcon: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "E6E7E9",
                tabBarInactiveTintColor: "#ff0000",
                tabBarIconStyle: {
                  width: '100%',
                  height: 20,
                }
              
            }}
            tabBar={props => <MyTabBar {...props} />}
          >
            <Tab.Screen name="681 Open" component={OpenIssues}/>
            <Tab.Screen name="Closed" component={ClosedIssues} />
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
    padding:24,
  },
  issueCountWrap: {
    marginTop: 10,
    padding:24,
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
  tabWrap: {
    width: '100%',
    backgroundColor: 'transparent',
    marginTop:0,
    paddingTop:0,
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
