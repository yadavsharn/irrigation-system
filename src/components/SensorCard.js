import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SensorCard({title, value}){
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{backgroundColor:'#fff', padding:12, borderRadius:10, width:'48%', marginBottom:12, elevation:2},
  title:{fontSize:14, color:'#333'},
  value:{fontSize:18, fontWeight:'700', marginTop:6}
});