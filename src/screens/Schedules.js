import React from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import storage from '../utils/storage';

export default function Schedules(){
  const [schedules, setSchedules] = React.useState([]);

  React.useEffect(()=>{ (async ()=>{
    const s = await storage.get('schedules') || [];
    setSchedules(s);
  })(); },[]);

  const addDummySchedule = async ()=>{
    const newSch = {id: Date.now().toString(), time:'06:00', duration:15};
    const next = [...schedules, newSch];
    setSchedules(next);
    await storage.set('schedules', next);
    Alert.alert('Added','Dummy schedule added. Replace with UI for create/edit.');
  };

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontSize:18,fontWeight:'700'}}>Irrigation Schedules</Text>
      <FlatList data={schedules} keyExtractor={i=>i.id} renderItem={({item})=>
        <View style={{padding:12, borderBottomWidth:1}}><Text>{item.time} · {item.duration} min</Text></View>} />
      <Button title="Add Example Schedule" onPress={addDummySchedule} />
    </View>
  );
}