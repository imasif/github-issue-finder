import React, { Dispatch, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import AppLoading from 'expo-app-loading';

import { Formik } from 'formik';
import { formValidationSchema } from '../../helper/validation_schema';
import {Shadow} from 'react-native-shadow-2';
import { SvgComment, SvgOpenIssues, SvgRightTick } from '../../helper/svgs';
import { useAppSelector } from '../../helper/hooks';
import moment from 'moment';
import IssueWrap from '../common/issue_item_wrap';
import { useDispatch } from 'react-redux';
import { decrementClosedIssuesLastVisitedPage, decrementOpenIssuesLastVisitedPage, incrementClosedIssuesLastVisitedPage, incrementOpenIssuesLastVisitedPage, IssueInterface, setClosedIssues, setOpenIssues } from '../../store/slices';
import { getRequest } from '../../helper/requests';
import CustomModal from '../../helper/modal';
import { AnyAction } from '@reduxjs/toolkit';

const Tab = createBottomTabNavigator();

export default function ClosedIssues() {
  const closedIssues: IssueInterface = useAppSelector(state => state.closedIssues);``
  const [issueCount, setIssueCount] = React.useState<number>(closedIssues.total_count);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [currentPages, setCurrentPages] = React.useState<number>(0);
  const [errorModalVisible, setErrorModalVisible] = React.useState<boolean>(false);


  const currentPage: number = useAppSelector(state => state.closedIssuesLastVisitedPage);
  const owner: string = useAppSelector(state => state.owner);
  const reponame: string = useAppSelector(state => state.reponame);
  const dispatch: Dispatch<AnyAction> = useDispatch();

  useEffect(() => {
    setTotalPages(Math.ceil(issueCount/10));

    setCurrentPages(currentPage);
  },[]);

  const prevPage = ()=>{
    if(currentPages > 1){
      setCurrentPages(currentPages - 1);
      dispatch(decrementClosedIssuesLastVisitedPage());
      getRequest(`search/issues`,`repo:${owner}/${reponame}/node+type:issue+state:closed&page=${currentPage-1}&per_page=10`)
      .then((res)=>{
        dispatch(setClosedIssues(res.data));
        console.log(currentPage-1);
      }).catch(err=>{
        console.log('#######previous########',err);

        setErrorModalVisible(true);
        setCurrentPages(currentPages+1);
        dispatch(incrementClosedIssuesLastVisitedPage());
      });

    }
  }

  const nextPage = ()=>{
    if(currentPages < totalPages){
      setCurrentPages(currentPages+1);
      dispatch(incrementClosedIssuesLastVisitedPage());
      getRequest(`search/issues`,`repo:${owner}/${reponame}/node+type:issue+state:closed&page=${currentPage+1}&per_page=10`)
      .then((res)=>{
        dispatch(setClosedIssues(res.data));
        console.log(currentPage+1);
      }).catch(err=>{
        console.log('#######next########',err);

        setErrorModalVisible(true);
        setCurrentPages(currentPages-1);
        dispatch(decrementClosedIssuesLastVisitedPage());
      });

    }
  }

  return (
    <>
      <ScrollView style={styles.container}>

        <CustomModal visible={errorModalVisible} onclose={()=>setErrorModalVisible(false)}/>

        <IssueWrap
        closedIssues={true}
        issues={closedIssues}/>

        <View style={{flex:1, alignContent:'center', alignItems:'center', paddingVertical:30}}>
          <View style={{width:180, justifyContent: 'space-between', flex:1, flexDirection: 'row',}}>
            {currentPages > 1 ? <TouchableHighlight style={{padding:10}} onPress={()=>prevPage()} underlayColor="rgba(255,255,255,0.1)">
              <View style={{flexDirection:'row'}}>
                <Ionicons name="chevron-back-outline" style={{marginTop:2, fontSize: 20}}  color='#ffffff'/>
                <Text style={{color:'#ffffff', marginTop:2}}>Previous</Text>
              </View>
            </TouchableHighlight> :
             <View style={{flexDirection:'row', padding:10, opacity: 0.5}}>
                <Ionicons name="chevron-back-outline" style={{marginTop:2, fontSize: 20}}  color='#ffffff'/>
                <Text style={{color:'#ffffff', marginTop:2}}>Previous</Text>
              </View>}
              
            {currentPages < totalPages ? <TouchableHighlight style={{padding:10}} onPress={()=>nextPage()} underlayColor="rgba(255,255,255,0.1)">
              <View style={{flexDirection:'row'}}>
                <Text style={{color:'#ffffff', marginTop:2}}>Next</Text>
                <Ionicons name="chevron-forward-outline" style={{marginTop:2, fontSize: 20}}  color='#ffffff'/>
              </View>
            </TouchableHighlight> : 
              <View style={{flexDirection:'row', padding:10, opacity: 0.5}}>
                <Text style={{color:'#ffffff', marginTop:2}}>Next</Text>
                <Ionicons name="chevron-forward-outline" style={{marginTop:2, fontSize: 20}}  color='#ffffff'/>
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow:0,
  },
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    fontSize: 18,
    flex:1,
    // width: '80%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  listItemText: {
    marginLeft: 8,
    maxWidth: '75%'
  },
  heading: {
    fontSize: 16,
    color: '#ffffff',
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
