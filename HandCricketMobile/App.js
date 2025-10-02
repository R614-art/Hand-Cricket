import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import HomeScreen from './components/HomeScreen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CLERK_PUBLISHABLE_KEY } from '@env';
import Page from './auth/SignIn';
import SignUpPage from './auth/Signup';
import Practice from './components/Practice/Practice';
import Multiplayer from './components/Multiplayer/Multiplayer';
import RoomOptions from './components/RoomOptions/RoomOptions';
import JoinRoom from './components/RoomOptions/JoinRoom';
import { useEffect, useState } from 'react';
import { Modal,View } from 'react-native';
import Spinner from './components/Spinner/Spinner';
const Stack = createNativeStackNavigator();

export default function App() {

  const [serverAwake,setServerAwake]=useState(false);
      useEffect(()=>{
          const ping=async ()=>{
              const check= await fetch('https://hand-cricket-xm73.onrender.com/ping');
              const text= await check.text();
              if(text==='connected')
                  setServerAwake(true);
          }
          ping();
  
      },[])

      if(!serverAwake)
        return(
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
                                  <Spinner text='Connecting to the server....'/>
                              </View>
          
                          </View>
                      </Modal>
        )
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <SignedIn>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Practice"
              component={Practice}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Multiplayer"
              component={Multiplayer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RoomOptions"
              component={RoomOptions}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="JoinRoom"
              component={JoinRoom}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </SignedIn>

        <SignedOut>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
              name="SignIn"
              component={Page}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  );
}
