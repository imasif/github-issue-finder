import React, { Dispatch, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SvgComment, SvgOpenIssues, SvgOpenIssues2 } from '../../helper/svgs';
import { useAppSelector } from '../../helper/hooks';
import moment from 'moment';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import IssueWrap from '../common/issue_item_wrap';
import { useDispatch } from 'react-redux';
import { getRequest } from '../../helper/requests';
import { decrementOpenIssuesLastVisitedPage, incrementOpenIssuesLastVisitedPage, IssueInterface, setOpenIssues } from '../../store/slices';
import CustomModal from '../../helper/modal';
import { AnyAction } from '@reduxjs/toolkit';

const Tab = createBottomTabNavigator();

export default function OpenIssues() {
  const openIssues:IssueInterface = useAppSelector(state => state.openIssues);
  const [issueCount, setIssueCount] = React.useState<number>(openIssues.total_count);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [currentPages, setCurrentPages] = React.useState<number>(0);
  const [errorModalVisible, setErrorModalVisible] = React.useState<boolean>(false);


  const currentPage:number = useAppSelector(state => state.openIssuesLastVisitedPage);
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
      dispatch(decrementOpenIssuesLastVisitedPage());
      getRequest(`search/issues`,`repo:${owner}/${reponame}/node+type:issue+state:open&page=${currentPage-1}&per_page=10`)
      .then((res)=>{
        dispatch(setOpenIssues(res.data));
        console.log(currentPage-1);
      }).catch(err=>{
        console.log('#######previous########',err);

        setErrorModalVisible(true);
        setCurrentPages(currentPages+1);
        dispatch(incrementOpenIssuesLastVisitedPage());
      });

    }
  }

  const nextPage = ()=>{
    if(currentPages < totalPages){
      setCurrentPages(currentPages+1);
      dispatch(incrementOpenIssuesLastVisitedPage());
      getRequest(`search/issues`,`repo:${owner}/${reponame}/node+type:issue+state:open&page=${currentPage+1}&per_page=10`)
      .then((res)=>{
        dispatch(setOpenIssues(res.data));
        console.log(currentPage+1);
      }).catch(err=>{
        console.log('#######next########',err);

        setErrorModalVisible(true);
        setCurrentPages(currentPages-1);
        dispatch(decrementOpenIssuesLastVisitedPage());
      });

    }
  }

  return (
    <>
      <ScrollView style={styles.container}>

        <CustomModal visible={errorModalVisible} onclose={()=>setErrorModalVisible(false)}/>

        <IssueWrap issues={openIssues}/>

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

});
