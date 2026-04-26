import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomHeader from '../components/CustomHeader'
import HomePage from '../screens/HomePage'
import OnBoarding from '../screens/OnBoarding'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Profile from '../screens/Profile'

const Stack = createNativeStackNavigator()

export default function MainNavigator() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null)

  const onBoardCompletionCheck = async () => {
    try {
      const temp = await AsyncStorage.getItem('onBoardingCompleted')
      return temp === 'true'
    } catch (error) {
      console.log('MainNavigator load error:', error)
      return false
    }
  }

  useEffect(() => {
    async function boardingCheck() {
      const result = await onBoardCompletionCheck()
      setIsOnboardingCompleted(result)
    }
    boardingCheck()
  }, [])

  if (isOnboardingCompleted === null) {
    return null
  }

  return (
    <Stack.Navigator
      initialRouteName={isOnboardingCompleted ? 'Home' : 'OnBoarding'}
      screenOptions={({ route, navigation }) => ({
        header: () => <CustomHeader route={route} navigation={navigation} />,
        contentStyle: { backgroundColor: '#F5F5F5' },
      })}>
      <Stack.Screen name='OnBoarding' component={OnBoarding} />
      <Stack.Screen name='Home' component={HomePage} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}
