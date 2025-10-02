import { Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import coinImg from '../../assets/coin.png'
import skinsImg from '../../assets/skins.png'
import styles from './stylesheet.js';
import { ActivityIndicator } from 'react-native';
import { HanaleiFill_400Regular } from '@expo-google-fonts/hanalei-fill';
import { useFonts } from '@expo-google-fonts/hanalei-fill';
import MainImage from '../MainImage/MainImage.js';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner.js';
import { useAuth } from '@clerk/clerk-expo';
export default function HomeScreen({navigation}){
    const {isLoaded, getToken}=useAuth();
    if(!isLoaded)
        return
    const [coins,setCoins]=useState(0);
    const [loading,setLoading]=useState(false);
    const [profile,setProfile]=useState(null)
    useEffect(() => {
    const getProfile = async () => {
        try {
            const token = await getToken();
            //console.log(token)
            const response = await fetch('https://hand-cricket-xm73.onrender.com/getprofile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProfile(data);
            if (data && data.coins !== undefined) {
                setCoins(data.coins);
            }

            setLoading(true);
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
    };
        getProfile();
    }, []);

        const [fontsLoaded] = useFonts({
            HanaleiFill_400Regular,
        });

    if (!fontsLoaded) {
        return (
            <View >
                <ActivityIndicator size="large" color="gold" />
                <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
            </View>
        );
    }
    if(!loading)
    {
        return (
            <Modal
                                   animationType='fade'
                                   visible={true}
                                   transparent={true}
                                  >
                                      <View
                                          style={{
                                              backgroundColor:'grey',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              width: '100%',
                                              height: '100%',
                                          }}
                                      >
                                          <View
                                              style={{
                                                  backgroundColor: 'lightblue',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  width: '80%',
                                                  height: 100,
                                                  borderRadius: 10
                                              }}
                                          >
                                              <Spinner text='Loading your profile....'/>
                                          </View>
                      
                                      </View>
                                  </Modal>
        )
    }

    return (
            <View style={styles.container}>
                {/*top bar*/}
                <View style={styles.topBar}>
                    <View style={styles.coins}>
                        <Image source={coinImg} style={styles.coin}/>
                        <Text style={styles.coinText}>{coins}</Text>
                        <AntDesign name="plus" size={14} color="gold" />
                    </View>
                </View>
                <View style={styles.LeftButtons}>
                    <View style={styles.buttonAligns}>
                        <View style={styles.shop}>
                            <FontAwesome5 name="trophy" size={30} color="white" />
                        </View>
                        <Text style={{fontFamily: 'HanaleiFill_400Regular',color:'black',fontSize:15}}>LeaderBoard</Text>
                    </View>
                    <View style={styles.buttonAligns}>
                        <View style={styles.shop}>
                            <AntDesign name="shop" size={30} color="white" />
                        </View>
                        <Text style={{fontFamily: 'HanaleiFill_400Regular',color:'black',fontSize:15}}>Shop</Text>
                    </View>
                    <View style={styles.buttonAligns}>
                        <View style={styles.shop}>
                            <Ionicons name="stats-chart" size={30} color="white" />
                        </View>
                    <Text style={{fontFamily: 'HanaleiFill_400Regular',color:'black',fontSize:15}}>Stats</Text>
                    </View>
                </View>
                    <View style={styles.rightButtons}>
                        <View style={styles.buttonAligns}>
                        <View style={styles.skin}><Image source={skinsImg} style={styles.skins}/></View>
                        <Text style={{fontFamily: 'HanaleiFill_400Regular',color:'black',fontSize:15}}>Skins</Text>
                    </View>
                </View>
                <View style={styles.bottomBar}>
                    <View style={styles.sideButtons}><TouchableOpacity onPress={ ()=> navigation.navigate("Practice") }><Text style={{fontFamily: 'HanaleiFill_400Regular',color:'black',fontSize:20}}>Practice</Text></TouchableOpacity></View>
                    <View style={styles.mainButton}><TouchableOpacity onPress={()=>navigation.navigate("Multiplayer",{mode:"quickplay"})}><Text style={{fontFamily: 'HanaleiFill_400Regular',color:'black',fontSize:20}}>Quick Play</Text></TouchableOpacity></View>
                    <View style={styles.sideButtons}><TouchableOpacity onPress={()=>navigation.navigate('RoomOptions')}><Text style={{fontFamily: 'HanaleiFill_400Regular',color:'black',fontSize:20}}>Room</Text></TouchableOpacity></View>
                </View>
                <MainImage />
            </View>
  );
}