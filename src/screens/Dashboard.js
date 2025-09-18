import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import SensorCard from '../components/SensorCard';
import { LineChart } from 'react-native-chart-kit';
import esp32Service from '../services/esp32Service';
import weatherService from '../services/weatherService';

export default function Dashboard(){
  const [sensors, setSensors] = React.useState({moisture:0, temp:0, waterLevel:0});
  const [history, setHistory] = React.useState({moisture:[], temp:[]});
  const [weather, setWeather] = React.useState(null);

  React.useEffect(()=>{
    let mounted = true;
    const fetchAll = async ()=>{
      try{
        const data = await esp32Service.fetchSensorData();
        if(!mounted) return;
        setSensors(prev=>({...prev, ...data.latest}));
        setHistory(prev=>({
          moisture: [...(prev.moisture||[]), data.latest.moisture].slice(-12),
          temp: [...(prev.temp||[]), data.latest.temp].slice(-12)
        }));
        const w = await weatherService.fetchWeatherForCoordinates(data.coords);
        if(w && mounted) setWeather(w);
      }catch(err){
        console.log('fetch error', err);
      }
    };
    fetchAll();
    const t = setInterval(fetchAll, 5000);
    return ()=>{ mounted=false; clearInterval(t); };
  },[]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <Text style={styles.title}>Smart Irrigation · Dashboard</Text>
      <View style={styles.row}>
        <SensorCard title="Soil Moisture" value={`${sensors.moisture}%`} />
        <SensorCard title="Water Level" value={`${sensors.waterLevel}%`} />
      </View>
      <View style={styles.row}>
        <SensorCard title="Temperature" value={`${sensors.temp}°C`} />
        <SensorCard title="Motor" value={sensors.motorOn? 'ON':'OFF'} />
      </View>
      <Text style={styles.section}>Soil Moisture Trend (last readings)</Text>
      {history.moisture.length>0 && (
        <LineChart
          data={{labels: history.moisture.map((_,i)=>''), datasets:[{data:history.moisture}]}}
          width={320}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces:0,
            color: (opacity=1)=>`rgba(0,0,0,${opacity})`
          }}
          bezier
        />
      )}
      <Text style={styles.section}>Weather</Text>
      {weather ? (
        <View><Text>{weather.summary} · {weather.temp}°C</Text></View>
      ) : <Text>Loading weather...</Text>}
      <Button title="Refresh Now" onPress={()=>{}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#F8FFF0'},
  title:{fontSize:20, fontWeight:'700', marginBottom:12},
  row:{flexDirection:'row', justifyContent:'space-between'},
  section:{marginTop:18, marginBottom:8, fontWeight:'600'}
});