import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput,FlatList,ActivityIndicator,Animated} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard';
import Constant from 'expo-constants'
import {useTheme} from '@react-navigation/native'

const MeditationScreen = ({navigation})=>{  
    const {colors} =  useTheme()
    const mycolor = colors.iconColor


}

export default MeditationScreen;