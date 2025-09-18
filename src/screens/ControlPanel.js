import React from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import esp32Service from '../services/esp32Service';

export default function ControlPanel(){
  const [motorOn, setMotorOn] = React.useState(false);
  const [autoMode, setAutoMode] = React.useState(true);

  React.useEffect(()=>{
    (async ()=>{
      try{
        const status = await esp32Service.fetchStatus();
        setMotorOn(status.motorOn);
        setAutoMode(status.autoMode);
      }catch(e){console.log(e)}
    })();
  },[]);

  const toggleMotor = async ()=>{
    try{
      const newState = !motorOn;
      await esp32Service.sendCommand({cmd:'motor', value:newState});
      setMotorOn(newState);
    }catch(err){ Alert.alert('Error','Failed to send command'); }
  };

  const toggleMode = async (val)=>{
    setAutoMode(val);
    try{ await esp32Service.sendCommand({cmd:'mode', value: val? 'auto' : 'manual'}); }
    catch(e){ Alert.alert('Error','Failed to change mode'); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control Panel</Text>
      <View style={styles.row}>
        <Text>Automatic Mode</Text>
        <Switch value={autoMode} onValueChange={toggleMode} />
      </View>
      <View style={styles.row}>
        <Text>Motor / Valve</Text>
        <Button title={motorOn? 'Turn OFF':'Turn ON'} onPress={toggleMotor} />
      </View>
      <View style={{marginTop:20}}>
        <Button title="Emergency Stop" color="#cc0000" onPress={async ()=>{
          await esp32Service.sendCommand({cmd:'motor', value:false});
          setMotorOn(false);
        }} />
      </View>
    </View>
  );
}

const styles=StyleSheet.create({container:{flex:1,padding:16,backgroundColor:'#FFF'},title:{fontSize:20,fontWeight:'700',marginBottom:12},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10}});