import { Image, StyleSheet, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomHeader = ({ route, navigation }) => {
  const [isOnBoardingComplete, setIsOnBoardingComplete] = useState(false)
  const [avatarUri, setAvatarUri] = useState(null)
  const isFocused = useIsFocused()

  useEffect(() => {
    const loadHeaderState = async () => {
      try {
        const result = await AsyncStorage.getItem('onBoardingCompleted')
        setIsOnBoardingComplete(result === 'true')

        const userData = await AsyncStorage.getItem('userData')
        if (userData) {
          const parsedData = JSON.parse(userData)
          setAvatarUri(parsedData.image || null)
        } else {
          setAvatarUri(null)
        }
      } catch (error) {
        console.log('CustomHeader load error:', error)
      }
    }
    loadHeaderState()
  }, [isFocused])

  const avatarSource = avatarUri ? { uri: avatarUri } : require('../image/Avatar-Placeholder.jpg')

  return (
    <SafeAreaView style={styles.HeaderContainer}>
      <View style={{ width: 44 }} />

      <View style={styles.LogoView}>
        <Image
          style={styles.LogoImage}
          resizeMode='contain'
          source={require('../image/littleLemonLogo.png')}
        />
      </View>

      {/* Right side (avatar) */}
      <View style={{ width: 44, alignItems: 'flex-end' }}>
        {isOnBoardingComplete && (
          <Pressable onPress={() => navigation.navigate('Profile')} style={styles.AvatarButton}>
            <Image source={avatarSource} style={styles.AvatarImage} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  )
}

export default CustomHeader
const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  LogoView: {
    flex: 1,
    alignItems: 'center',
  },

  LogoImage: {
    width: '60%',
    height: 50,
  },

  AvatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F4CE14',
    backgroundColor: '#EDEFEE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  AvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
})
