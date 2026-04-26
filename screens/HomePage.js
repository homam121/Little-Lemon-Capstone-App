import { Image, StyleSheet, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import FoodMenu from '../components/FoodMenu.js'
import { useState } from 'react'

const HomePage = () => {
    
    const [searchQuery, setSearchQuery] = useState('')

  return (
    <View style={styles.ScreenContainer}>

      <View style={styles.HeroSectionView}>
        <View style={styles.HeroSectionHeaderTextView}>
            <Text style={styles.HeroSectionHeaderText}>Little Lemon</Text>
            <Text style={{color:'white',textAlign:'right',verticalAlign:'top',marginTop:-30,fontFamily:'MarkaziText-Regular',fontSize:40,lineHeight:35}}>chicago</Text>
        </View>
        <View style={styles.HeroSectionTwoChildsView}>
            <View style={styles.TwoChildsDescriptionView}>
                <Text style={styles.TwoChildsDescriptionText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
            </View>
            <View style={styles.TwoChildsImageView}>
                <Image style={styles.TwoChildsImage} source={require('../image/restaurantfood.png')} />
            </View>
        </View>
        <View style={styles.HeroSectionSearchBarView}>
            <Searchbar value={searchQuery} onChangeText={setSearchQuery} inputStyle={styles.HeroSectionSearchBarInnerText} style={styles.HeroSectionSearchBar}/>
        </View>
      </View>

      <View style={{flex:1}}>
      <FoodMenu searchQueryParam={searchQuery}/>
      </View>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
    ScreenContainer:{
        flex :1
    },
    HeroSectionView:{
        backgroundColor:'#495E57',
        height:'50%'
    },
    HeroSectionHeaderTextView:{
        marginLeft:15,
        marginTop:10,
        width:280
    },
    HeroSectionHeaderText:{
        fontSize:64,
        fontFamily:'MarkaziText-Medium',
        color:'#F4CE14',
    },
    HeroSectionTwoChildsView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:20,
        paddingHorizontal:20
    },
    TwoChildsDescriptionView:{
        width:200,
        justifyContent:'center'
    },
    TwoChildsDescriptionText:{
        fontSize:18,
        fontFamily:'Karla-Medium',
        color:'white'
    },
    TwoChildsImageView:{
        
    },
    TwoChildsImage:{
        width:150,
        height:150,
        borderRadius:16
    },
    HeroSectionSearchBarView:{paddingVertical:30,paddingHorizontal:40},
    HeroSectionSearchBar:{
        backgroundColor: '#D9D9D9',
    },
    HeroSectionSearchBarInnerText:{
        fontFamily:'MarkaziText-Regular',
        fontSize:22,
        verticalAlign:'middle'
        
    },
})
