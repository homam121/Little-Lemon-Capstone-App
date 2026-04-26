import { ActivityIndicator, View } from 'react-native'
import AppNavigator from './navigation/AppNavigator'
import { useFonts } from 'expo-font'
export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Karla-ExtraBold': require('./assets/fonts/Karla-ExtraBold.ttf'),
    'MarkaziText-Regular': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'MarkaziText-Medium': require('./assets/fonts/MarkaziText-Medium.ttf'),
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return <AppNavigator />
}
