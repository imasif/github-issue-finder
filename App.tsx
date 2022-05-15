import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { ImageBackground, StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppLoading from 'expo-app-loading';

import Home from './lib/src/home';
import Issues from './lib/src/issues';


export default function App() {
  return (
    <Home/>
  );
}
