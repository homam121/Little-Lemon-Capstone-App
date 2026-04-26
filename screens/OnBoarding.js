import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const OnBoarding = () => {
  const nav = useNavigation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const isFirstNameValid = firstName.trim().length > 0
  const isLastNameValid = lastName.trim().length > 0
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const [touched, setTouched] = useState({
    first: false,
    last: false,
    email: false,
  })

  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid

  const handleClick = async () => {
    try {
      if (isFormValid) {
        await AsyncStorage.setItem('onBoardingCompleted', 'true')
        await AsyncStorage.setItem('userData', JSON.stringify({ firstName, lastName, email }))
        Alert.alert('Success', `Welcome aboard, ${firstName}!`)
        nav.navigate('Home')
      } else Alert.alert('Error', 'Please enter valid information.')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>Welcome To our Little Lemon Restaurant !</Text>
        </View>

        <View style={styles.fieldsSection}>
          <View style={styles.fieldCards}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.fieldLabel}>First Name</Text>
              {touched.first && !isFirstNameValid && (
                <Text style={styles.warningField}>Please fill field correctly</Text>
              )}
            </View>
            <TextInput
              placeholder='Enter your First Name'
              style={styles.fieldInput}
              value={firstName}
              onChangeText={setFirstName}
              onBlur={() => {
                setTouched({ ...touched, first: true })
              }}
            />
          </View>
          <View style={styles.fieldCards}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.fieldLabel}>Last Name</Text>
              {touched.last && !isLastNameValid && (
                <Text style={styles.warningField}>Please fill field correctly</Text>
              )}
            </View>
            <TextInput
              placeholder='Enter your Last Name'
              style={styles.fieldInput}
              value={lastName}
              onChangeText={setLastName}
              onBlur={() => {
                setTouched({ ...touched, last: true })
              }}
            />
          </View>
          <View style={styles.fieldCards}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              {touched.email && !isEmailValid && (
                <Text style={styles.warningField}>Please fill with correct email</Text>
              )}
            </View>
            <TextInput
              inputMode='email'
              placeholder='Enter your Email'
              style={styles.fieldInput}
              value={email}
              onChangeText={setEmail}
              onBlur={() => {
                setTouched({ ...touched, email: true })
              }}
            />
          </View>
        </View>

        <View style={styles.pressableView}>
          <Pressable
            style={[styles.pressable, !isFormValid && styles.disabledPressable]}
            disabled={!isFormValid}
            onPress={handleClick}>
            <Text style={styles.pressableText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  welcomeView: {
    flex: 0.2,
    justifyContent: 'center',
    paddingHorizontal:'10%'
  },
  welcomeText: {
    fontFamily:'MarkaziText-Medium',
    fontSize: 40,
    textAlign: 'center',
  },

  fieldsSection: {
    flex: 0.5,
    justifyContent: 'center',
    rowGap: 25,
    backgroundColor: '#EBEDEC',
    marginHorizontal: 15,
    borderRadius: 16,
    borderColor: '#4E6055',
    elevation: 15,

    paddingHorizontal: 20,
  },
  fieldCards: {
    padding: 5,
  },
  fieldLabel: {
    fontSize: 15,
    fontFamily:'Karla-ExtraBold'
  },
  fieldInput: {
    fontFamily:'Karla-Regular',
    backgroundColor: '#EDEFEE',
    elevation: 10,
    borderRadius: 16,
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
  warningField: {
    fontFamily:'Karla-Medium',
    textAlign: 'right',
    color: 'red',
    alignSelf: 'flex-end',
  },

  pressableView: { flex: 0.3, justifyContent: 'center' },
  pressable: {
    backgroundColor: '#F4CE14',
    width: 'auto',
    padding: 15,
    borderRadius: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pressableText: {
    fontFamily:'Karla-ExtraBold',
    fontSize: 20,
    textAlign: 'center',
  },
  disabledPressable: {
    opacity: 0.5,
  },
})
