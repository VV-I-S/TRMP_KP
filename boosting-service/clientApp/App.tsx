import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// const routConfig = {
//   Login:{
//     screen: Login
//   }
// }

function HomeScreen({navigation}: {navigation: any}) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            onPress={() => navigation.navigate('Notifications')}
            title="Go to notifications"
        />
      </View>
  );
}

function NotificationsScreen({navigation}: {navigation: any}) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register}  options={{
              drawerItemStyle: { height: 0 }
          }}/>
        </Drawer.Navigator>
      </NavigationContainer>
  );
}