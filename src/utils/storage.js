import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  async set(key, value){ await AsyncStorage.setItem(key, JSON.stringify(value)); },
  async get(key){ const v = await AsyncStorage.getItem(key); return v? JSON.parse(v) : null; },
  async remove(key){ await AsyncStorage.removeItem(key); }
}
export default storage;