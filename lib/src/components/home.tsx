import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenedIssues, setClosedIssues, resetState } from '../store/slices';

import { Formik } from 'formik';
import { formValidationSchema } from '../helper/validation_schema';
import {Shadow} from 'react-native-shadow-2';
import { getRequest } from '../helper/requests';
import CustomModal from '../helper/modal';
import { useAppSelector } from '../helper/hooks';

interface formdata {
  owner: string;
  reponame: string;
}


export default function Home() {
  const [inputborderColor, setInputBorderColors] = React.useState<Array<string>>(["transparent", "transparent"]);
  const [inputShadowColor, setInputShadowColors] = React.useState<Array<string>>(["transparent", "transparent"]);

  const [errorModalVisible, setErrorModalVisible] = React.useState<boolean>(false);

  const [inputValues, setInputValue] = React.useState<formdata>({
    owner: "",
    reponame: ""
  });

  const [validation, setValidation] = React.useState<formdata>({
    owner: "",
    reponame: ""
  });

  const openedIssues = useAppSelector(state => state.openedIssues);
  const closedIssues = useAppSelector(state => state.closedIssues);

  const dispatch = useDispatch();

  const formSubmit = (values:formdata) => {
    getRequest(`search/issues`,`repo:${values.owner}/${values.reponame}/node+type:issue+state:closed`).then(res=>{
      dispatch(setClosedIssues(res.data));
      console.log(res.data['total_count']);
    }).catch(err=> {
      console.log('##############',err);
      setErrorModalVisible(true);
    });
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
            source={require('../../../assets/gradient_bg.png')}
            style={{
              width: '100%',
              height: 654,
              position: 'absolute',
              top: 0,
              left: 0
            }}
            imageStyle={{
              resizeMode: 'cover' // works only here!
            }}
        >
        </ImageBackground>
        <View style={styles.contents}>
          <View style={styles.logoWrap}>
            <View style={styles.logo}>
              <Image source={require('../../../assets/logo.png')}></Image>
            </View>
          </View>


          <View style={styles.inputWrap}>
            <CustomModal visible={errorModalVisible} onclose={()=>setErrorModalVisible(false)}/>
            <Text style={{color:'#FFF'}}>{closedIssues.total_count}</Text>

            <Formik
              validationSchema={formValidationSchema}
              initialValues={{ owner: '', reponame: '' }}
              onSubmit={values => formSubmit(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
              <>
              <View style={styles.textWrap}>
                <Text style={styles.inputLabel}>Owner <Text style={{color: '#ff0000'}}>*</Text></Text>

                <Shadow
                  distance={5}
                  startColor={errors.reponame ? "#400A39" : inputShadowColor[0]}
                  containerViewStyle={{marginVertical: 0}}
                  radius={12}>
                  <View style={[styles.textInputWrap, {borderColor: errors.owner ? "#ff0000" : inputborderColor[0], borderWidth: 1}]}>
                    <TextInput
                        style={[styles.input, {minWidth: errors.owner ? '100%' : '95%', maxWidth: errors.owner ? '100%' : '95%'}]}
                        placeholderTextColor="#7C7F8F"
                        placeholder="Owner name"
                        onFocus={() => {setInputBorderColors(["#3267F0", "transparent"]); setInputShadowColors(["#171F5F", "transparent"]);}}
                        underlineColorAndroid="transparent"
                        onChangeText={handleChange('owner')}
                        onBlur={handleBlur('owner')}
                        value={values.owner}
                      />
                      {!errors.owner && values.owner.length > 0 && <Ionicons style={{position:'absolute', right:5, top: 15, fontWeight:'bold'}} name="md-checkmark" size={24} color="#0ED9A8" />}
                  </View>
                  </Shadow>
                    {errors.owner &&
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
                        <Text></Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                          <View>
                            <Image source={require('../../../assets/error_top.png')} style={{ width: 10, height: 9, opacity:0.28 }} />
                          </View>
                          <View style={{backgroundColor: 'rgba(255,0,0, 0.28)', padding: 3, borderRadius: 4, borderColor:'rgba(255,0,0, 0.28)', borderWidth:1}}>
                            <Text style={{ fontSize: 12, color: 'red', textAlign: 'right' }}>{errors.owner}</Text>
                          </View>
                        </View>
                      </View>
                    }
              </View>

              <View style={[styles.textWrap, {marginTop: errors.owner ? 0 : 36}]}>
                <Text style={styles.inputLabel}>Repository <Text style={{color: '#ff0000'}}>*</Text></Text>
                <Shadow
                  distance={5}
                  startColor={errors.reponame ? "#400A39" : inputShadowColor[1]}
                  containerViewStyle={{marginVertical: 0}}
                  radius={12}>

                    <View style={[styles.textInputWrap, {borderColor: errors.reponame ? "#ff0000" : inputborderColor[1],borderWidth: 1}]}>
                      <TextInput
                        style={[styles.input, {minWidth: errors.reponame ? '100%' : '95%', maxWidth: errors.reponame ? '100%' : '95%'}]}
                        placeholderTextColor="#7C7F8F"
                        placeholder="Repository name"
                        onFocus={() => {setInputBorderColors(["transparent", "#3267F0"]), setInputShadowColors(["transparent", "#171F5F"])}}
                        underlineColorAndroid="transparent"
                        onChangeText={handleChange('reponame')}
                        onBlur={handleBlur('reponame')}
                        value={values.reponame}
                      />
                      {!errors.reponame && values.reponame.length > 0 && <Ionicons style={{position:'absolute', right:5, top: 15, fontWeight:'bold'}} name="md-checkmark" size={24} color="#0ED9A8" />}
                    </View>
                  </Shadow>
                
                  
                  {errors.reponame &&
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
                        <Text></Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                          <View>
                            <Image source={require('../../../assets/error_top.png')} style={{ width: 10, height: 9, opacity:0.28 }} />
                          </View>
                          <View style={{backgroundColor: 'rgba(255,0,0, 0.28)', padding: 3, borderRadius: 4, borderColor:'rgba(255,0,0, 0.28)', borderWidth:1}}>
                            <Text style={{ fontSize: 12, color: 'red', textAlign: 'right' }}>{errors.reponame}</Text>
                          </View>
                        </View>
                      </View>
                    }
              </View>

              <View style={[styles.buttonWrap, {marginTop: errors.reponame ? 15 : 47}]}>
                <TouchableHighlight
                  onPress={()=>handleSubmit()}
                  underlayColor="#652EA6"
                  style={styles.button}>
                  <Text
                    style={styles.buttonText}>
                    Show issues
                  </Text>
                </TouchableHighlight>
              </View>
              </>)}
            </Formik>
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
