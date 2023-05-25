import * as React from 'react';
import {StyleSheet,Text,View,TextInput, Pressable,Image} from "react-native";
const sChatStepContainer = `
  background-color: #fff;
  border-radius: 5px;
  border-width: 1px;
  border-color: #ddd;
  margin-right: 6px;
  margin-bottom: 10px;
  margin-left: 6px;
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
`;
export default function ChatStepContainer() {
  return ( 
    <View style={sChatStepContainer}>
    </View>
  );
}