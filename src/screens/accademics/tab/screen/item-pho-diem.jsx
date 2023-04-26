import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable,TouchableOpacity } from "react-native";

//
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ItemPhoDiem({data,title}) {

  return (
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryBar
           labels={({ datum }) => `${datum.SoLuong}`}
           data={data}
           x="TenLabel"
           y="SoLuong"
            style={{
              data: {
                fill: ({ datum }) => datum.isCheck ? "gold" : "#0000FF",
              },
            }}
           
          />
        </VictoryChart>
        <View>
          <Text style={styles.title_diem}>  {title}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
  },
  title_diem: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});


