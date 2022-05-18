import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Animated, TouchableOpacity, Platform, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OpenIssues from './open_issues';
import ClosedIssues from './closed_issues';
import {SvgRightTick, SvgOpenIssues} from '../../helper/svgs';
import { useAppSelector } from '../../helper/hooks';

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({ state, navigation }:{state:any, navigation:any}) {

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
          <TouchableHighlight key={'touch'+index}
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
          <SvgRightTick style={{marginTop: 2}} key={'reactSVG'+index}/>
            : 
          <SvgOpenIssues style={{marginTop: 2}} key={'reactSVG'+index}/>}
          <Text key={index} style={{color:'#ffffff', fontWeight:'bold', fontSize:14, marginLeft: 8}}>{route.name}</Text>
          </>
          </TouchableHighlight>
        )
    })}
    </View>
    </>
  );
}


export default function Issues() {

  const openIssues = useAppSelector(state => state.openIssues);

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
            <View style={styles.badge}><Text style={{color: 'rgba(230,231,233,0.5)'}}> {openIssues.total_count} </Text></View>
          </View>
        </View>
          

        <Tab.Navigator style={styles.tabWrap}  screenOptions={{
              tabBarLabelStyle: { fontSize: 14, color: '#E6E7E9', textTransform: 'capitalize' },
              tabBarItemStyle: { width: 'auto' },
              tabBarIndicatorStyle: { backgroundColor: 'transparent' },
              tabBarShowIcon: true,
              tabBarShowLabel: false,
              tabBarActiveTintColor: "E6E7E9",
              tabBarInactiveTintColor: "#ff0000",
              tabBarIconStyle: {
                width: '100%',
                height: 20,
              },
              
              
            }}

            sceneContainerStyle={{backgroundColor: 'transparent'}}
            
            tabBar={props => <CustomTabBar {...props} />}
          >
            <Tab.Screen name={openIssues.total_count+" Open"} component={OpenIssues}/>
            <Tab.Screen name="Closed" component={ClosedIssues} />
          </Tab.Navigator>
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
    height: 200,
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
  }
});
