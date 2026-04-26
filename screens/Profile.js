import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

const Profile = () => {
  const nav = useNavigation()
  const [userData, setUserData] = useState(null)
  const [image, setImage] = useState(null)
  const [orderStatuses, setOrderStatuses] = useState(false)
  const [passwordChanges, setPasswordChanges] = useState(false)
  const [specialOffers, setSpecialOffers] = useState(false)
  const [newsletter, setNewsletter] = useState(false)

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri

      const updatedUser = { ...userData, image: uri }

      setImage(uri)
      await saveUserData(updatedUser)
    }
  }

  const saveUserData = async updatedUser => {
    setUserData(updatedUser)
    await AsyncStorage.setItem('userData', JSON.stringify(updatedUser))
  }

  const removePhoto = async () => {
    if (image === null) return
    const handleConfirmation = async () => {
      const updatedUser = { ...userData, image: null }
      setImage(null)
      await saveUserData(updatedUser)
    }
    Alert.alert('Confirm', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel', onPress: () => {} },
      { text: 'OK', onPress: () => handleConfirmation() },
    ])
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await AsyncStorage.getItem('userData')
        if (data) {
          const parsedData = JSON.parse(data)
          setUserData(parsedData)
          setImage(parsedData.image)
          const prefs = parsedData.preferences || {}
          setOrderStatuses(!!prefs.orderStatuses)
          setPasswordChanges(!!prefs.passwordChanges)
          setSpecialOffers(!!prefs.specialOffers)
          setNewsletter(!!prefs.newsletter)
        }
      } catch (error) {
        console.log('Error loading user data:', error)
      }
    }
    loadUserData()
  }, [])

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('onBoardingCompleted', 'false')
      await AsyncStorage.removeItem('userData')
      Alert.alert('Logged Out', 'You have been logged out successfully.')
      nav.reset({
        index: 0,
        routes: [{ name: 'OnBoarding' }],
      })
    } catch (error) {
      Alert.alert('Error', 'Failed to logout: ' + error.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>
            {userData ? `Welcome, ${userData.firstName}!` : 'Loading...'}
          </Text>
        </View>

        <ScrollView style={styles.userInfoSection} showsVerticalScrollIndicator={false}>
          <Text style={{ fontFamily: 'Karla-ExtraBold', fontSize: 20 }}>Personal Information</Text>

          <View>
            <Text style={styles.infoLabel}>Avatar</Text>
            <View style={styles.avatarSection}>
              <View style={styles.avatarContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.avatar} />
                ) : (
                  <Image
                    source={require('../image/Avatar-Placeholder.jpg')}
                    style={styles.avatar}
                  />
                )}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.AvatarbuttonView}>
                  <Pressable style={styles.AvatarButton} onPress={pickImage}>
                    <Text style={styles.AvatartbuttonText}>Change</Text>
                  </Pressable>
                </View>
                <View style={styles.AvatarbuttonView}>
                  <Pressable
                    style={[
                      styles.AvatarButton,
                      { backgroundColor: 'transparent', borderColor: '#495E57', borderWidth: 0.8 },
                    ]}
                    onPress={removePhoto}>
                    <Text style={[styles.AvatartbuttonText, { color: '#495E57' }]}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          {userData && (
            <>
              <View>
                <Text style={styles.infoLabel}>First Name</Text>
                <View style={styles.userInfoCard}>
                  <Text style={styles.infoValue}>{userData.firstName}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.infoLabel}>Last Name</Text>
                <View style={styles.userInfoCard}>
                  <Text style={styles.infoValue}>{userData.lastName}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.infoLabel}>Email Address</Text>
                <View style={styles.userInfoCard}>
                  <Text style={styles.infoValue}>{userData.email}</Text>
                </View>
              </View>
            </>
          )}

          <View style={styles.EmailNotificationsSection}>
            <Text style={{ fontFamily: 'Karla-ExtraBold', fontSize: 20 }}>Email Notifications</Text>
            {/* <View> */}
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Order statuses</Text>
              <Pressable
                style={[styles.checkbox, orderStatuses && styles.checkboxChecked]}
                onPress={async () => {
                  const updatedUser = {
                    ...userData,
                    preferences: {
                      ...(userData?.preferences || {}),
                      orderStatuses: !orderStatuses,
                    },
                  }
                  setOrderStatuses(!orderStatuses)
                  await saveUserData(updatedUser)
                }}>
                {orderStatuses && <Text style={styles.checkboxIcon}>✓</Text>}
              </Pressable>
            </View>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Password changes</Text>
              <Pressable
                style={[styles.checkbox, passwordChanges && styles.checkboxChecked]}
                onPress={async () => {
                  const updatedUser = {
                    ...userData,
                    preferences: {
                      ...(userData?.preferences || {}),
                      passwordChanges: !passwordChanges,
                    },
                  }
                  setPasswordChanges(!passwordChanges)
                  await saveUserData(updatedUser)
                }}>
                {passwordChanges && <Text style={styles.checkboxIcon}>✓</Text>}
              </Pressable>
            </View>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Special offers</Text>
              <Pressable
                style={[styles.checkbox, specialOffers && styles.checkboxChecked]}
                onPress={async () => {
                  const updatedUser = {
                    ...userData,
                    preferences: {
                      ...(userData?.preferences || {}),
                      specialOffers: !specialOffers,
                    },
                  }
                  setSpecialOffers(!specialOffers)
                  await saveUserData(updatedUser)
                }}>
                {specialOffers && <Text style={styles.checkboxIcon}>✓</Text>}
              </Pressable>
            </View>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Newsletter</Text>
              <Pressable
                style={[styles.checkbox, newsletter && styles.checkboxChecked]}
                onPress={async () => {
                  const updatedUser = {
                    ...userData,
                    preferences: {
                      ...(userData?.preferences || {}),
                      newsletter: !newsletter,
                    },
                  }
                  setNewsletter(!newsletter)
                  await saveUserData(updatedUser)
                }}>
                {newsletter && <Text style={styles.checkboxIcon}>✓</Text>}
              </Pressable>
            </View>
            {/* </View> */}
          </View>
        </ScrollView>

        <View style={styles.buttonView}>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  welcomeView: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 40,
    fontFamily: 'MarkaziText-Medium',
    textAlign: 'center',
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AvatarbuttonView: {
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  AvatarButton: {
    backgroundColor: '#495E57',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  AvatartbuttonText: {
    color: '#F5F5F5',
    fontFamily: 'Karla-Bold',
  },
  userInfoSection: {
    flex: 1,
    // justifyContent: 'center',
    rowGap: 10,
    backgroundColor: '#EBEDEC',
    marginHorizontal: 15,
    borderRadius: 16,
    borderColor: '#4E6055',
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 45,
  },
  placeholder: {
    width: 80,
    height: 80,
    borderRadius: 45,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
  },
  userInfoCard: {
    padding: 10,
    backgroundColor: '#EDEFEE',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4e60554d',
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Karla-Bold',
    color: '#495E57',
    marginVertical: 10,
  },
  infoValue: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
    color: '#333',
  },
  buttonView: {
    flex: 0.3,
    justifyContent: 'center',
    paddingTop: 10,
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    width: 'auto',
    padding: 15,
    borderRadius: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Karla-ExtraBold',
    fontSize: 20,
    textAlign: 'center',
  },

  EmailNotificationsSection: {
    rowGap: 12,
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 30,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  preferenceLabel: {
    fontFamily: 'Karla-Medium',
    fontSize: 15,
    color: '#495E57',
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#495E57',
    borderColor: '#495E57',
  },
  checkboxIcon: {
    color: '#F5F5F5',
    fontSize: 18,
    // fontFamily: 'Karla-Bold',
  },
})
