import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SvgComment, SvgOpenIssues, SvgOpenIssues2 } from '../../helper/svgs';
import moment from 'moment';
import { IssueInterface, ItemInterface } from '../../store/slices';

export default function IssueWrap({issues, closedIssues}: {issues: IssueInterface, closedIssues?:boolean}) {
    const { items } = issues;
    const [pressedIndex, setPressedIndex] = React.useState<null|number>(null);
    return(
      <>
      {items.map((item:ItemInterface, index:number) => {
        return (
            <TouchableHighlight key={'open_touch_'+index} style={styles.listItem} onPressIn={()=>{setPressedIndex(index)}}
            onPressOut={()=>{setPressedIndex(index)}} underlayColor="rgba(255,255,255,0.1)">
              <>
              {closedIssues ? <Ionicons name='checkmark-circle-outline' style={{marginTop:2, fontSize: 20}}  color='#9A41EA'/> : <SvgOpenIssues2 style={{marginTop: 2, }}/>}
              <View style={styles.listItemText}>
                <Text style={[styles.heading, {color: pressedIndex == index ? '#3267F0': '#ffffff'}]}>{item.number+' '+item.title.trim()}</Text>
                <Text style={styles.subheading}>{moment(item.created_at).fromNow()}</Text>
              </View>
              <View style={styles.commentWrap}>
                {item.comments > 0 && 
                <>
                  <SvgComment style={{marginTop: 2}}/>
                  <Text style={{color:'#E6E7E9', opacity: 0.5, marginLeft:6}}>{item.comments}</Text>
                </>}
              </View>
              </>
            </TouchableHighlight>
        )
      })}
      </>
    )
  }


const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 20,
        paddingHorizontal: 24,
        fontSize: 18,
        flex: 1,
        // width: '80%',
        flexDirection: 'row',
        borderBottomColor: 'rgba(255,255,255,0.2)',
        borderBottomWidth: 1
        // justifyContent: 'space-between',
    },
    listItemText: {
        marginLeft: 8,
        maxWidth: '75%'
    },
    heading: {
        fontSize: 16,
        position: 'relative',
    },
    subheading: {
        color: '#E6E7E9',
        fontSize: 14,
        opacity: 0.5
    },
    commentWrap: {
        flexDirection: 'row',
        marginLeft: 22,
        position: 'absolute',
        right: 20,
        top: 25
    },
});