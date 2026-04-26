import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList, Pressable, Image } from 'react-native'
import { createTable, getAllData, getCategories, getFilteredData, saveData } from '../database'
import { Icon } from 'react-native-paper'

const FoodMenu = ({ searchQueryParam }) => {
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [query, setQuery] = useState('')

  const BASE_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL)
      const json = await response.json()
      const menu = json.menu.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category,
      }))
      return menu
    } catch (error) {
      console.error('fetchData() ERROR:', error.message)
    }
  }

  useEffect(() => {
    async function effectFunc() {
      const menuItemsToBeSaved = await fetchData()
      createTable()
      saveData(menuItemsToBeSaved)
      const dbData = await getAllData()
      setData(dbData)
      const categoriesFromDB = await getCategories()
      setCategories(categoriesFromDB)
      setQuery(searchQueryParam)
    }
    effectFunc()
  }, [])

  useEffect(() => {
    setQuery(searchQueryParam)
  }, [searchQueryParam])

  useEffect(() => {
    async function filterEffect() {
      const dbData = await getFilteredData(searchQueryParam, filteredCategories)
      setData(dbData)
    }
    filterEffect()
  }, [filteredCategories, query])

  const filterCatFunc = cat => {
    filteredCategories.includes(cat)
      ? setFilteredCategories(prev => prev.filter(item => item !== cat))
      : setFilteredCategories(prev => [...prev, cat])
  }

  const categoriesRenderFunc = ({ item }) => (
    <Pressable
      style={[
        styles.categoriesTabPressable,
        { backgroundColor: filteredCategories.includes(item) ? '#495E57' : '#F4CE14' },
      ]}
      onPress={() => {
        filterCatFunc(item)
      }}>
      <Text style={[styles.categoriesTabText]}>{item}</Text>
      {filteredCategories.includes(item) && <Icon source='close' size={18} />}
    </Pressable>
  )

  const foodMenuRenderFunc = ({ item }) => (
    <View style={styles.foodItemView}>
      <View style={styles.foodItemTextSectionView}>
        <Text style={styles.foodItemHeadText}>{item.name}</Text>
        <Text style={styles.foodItemDescriptionText}>{item.description}</Text>
        <Text style={styles.foodItemPriceText}>{item.price}$</Text>
      </View>

      <View style={styles.foodItemImageSectionView}>
        <Image style={styles.foodItemImage} source={{ uri: item.image }} />
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={categoriesRenderFunc}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesListContent}
        />
      </View>

      <FlatList
        data={data}
        renderItem={foodMenuRenderFunc}
        keyExtractor={item => item.id.toString()}
        style={styles.menuList}
        contentContainerStyle={styles.menuListContent}
        ItemSeparatorComponent={() => <View style={styles.menuSeparator} />}
      />
    </View>
  )
}

export default FoodMenu

const styles = StyleSheet.create({
  categoriesTabPressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
    padding: 8,
    borderRadius: 8.68,
    margin: 8,
  },
  categoriesTabText: {
    fontFamily: 'Karla-ExtraBold',
    fontSize: 15,
  },

  foodItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 10,
    paddingVertical: 12,
    backgroundColor:'#F5F5F5'
  },
  foodItemTextSectionView: {
    flex: 1,
    paddingRight: 10,
  },
  foodItemHeadText: {
    fontSize: 16,
    fontFamily: 'Karla-ExtraBold',
    marginVertical: 8,
  },
  foodItemDescriptionText: {
    fontSize: 14,
    fontFamily: 'Karla-Regular',
  },
  foodItemPriceText: {
    marginTop: 17,
    fontSize: 16,
    fontFamily: 'Karla-Bold',
  },
  foodItemImageSectionView: {
    justifyContent: 'center',
    width: 116,
  },
  foodItemImage: {
    width: 116,
    height: 96,
    borderRadius: 16,
  },
  container: {
    flex: 1,
  },
  categoriesContainer: {
    paddingVertical: 10,
    // alignItems:'center'
  },
  categoriesListContent: {
    paddingHorizontal: 12,
  },
  menuList: {
    flex: 1,
  },
  menuListContent: {
    paddingBottom: 0,
  },
  menuSeparator: {
    borderBottomWidth: 1,
    marginVertical: 5,
    opacity: 0.1,
  },
})
