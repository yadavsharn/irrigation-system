import axios from 'axios';

const ESP32_BASE_URL = 'http://192.168.1.55';

async function fetchSensorData(){
  try{
    const resp = await axios.get(`${ESP32_BASE_URL}/api/sensors`);
    return resp.data;
  }catch(e){
    return {
      latest: {moisture: Math.round(Math.random()*50 + 30), temp: Math.round(Math.random()*8 + 22), waterLevel: Math.round(Math.random()*70 + 20), motorOn:false},
      coords: {lat:26.5, lon:80.9}
    };
  }
}

async function fetchStatus(){
  try{ const resp = await axios.get(`${ESP32_BASE_URL}/api/status`); return resp.data; }catch(e){ return {motorOn:false, autoMode:true}; }
}

async function sendCommand(command){
  try{
    await axios.post(`${ESP32_BASE_URL}/api/command`, command, {timeout:3000});
    return {ok:true};
  }catch(e){ console.warn('sendCommand failed', e.message); throw e; }
}

export default { fetchSensorData, sendCommand, fetchStatus };