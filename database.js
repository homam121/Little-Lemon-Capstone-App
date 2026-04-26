import * as SQLite from 'expo-sqlite'

let db = SQLite.openDatabaseSync('little_lemon.db')

export async function createTable() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT,
      price TEXT,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `)
}

export async function saveData(menu) {
  try {
    const query = `
    INSERT OR REPLACE INTO menuitems
    (id,name,price,description,image,category) 
    VALUES (?,?,?,?,?,?)
    `

    for (const element of menu) {
      await db.runAsync(query, [
        element.id,
        element.name,
        element.price,
        element.description,
        `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${element.image}?raw=true`,
        element.category,
      ])
    }
  } catch (error) {
    console.log('saveData() Error :', error.message)
  }
}

export async function getAllData() {
  try {
    const data = await db.getAllAsync(`SELECT * FROM menuitems`)
    return data
  } catch (error) {
    console.log('getAllData() Error:', error.message)
  }
}

export async function getCategories() {
  try {
    const rawCategroies = await db.getAllAsync(`
            SELECT DISTINCT category FROM menuitems
            `)
    const categories = rawCategroies.map(item => item.category)
    //["starters", "mains", "desserts"]
    return categories
  } catch (error) {
    console.log('getCategories Error :', error.message)
  }
}

export async function getFilteredData(query, activeCategories) {
  try {
    let sql = `SELECT * FROM menuitems WHERE name LIKE ?`
    const params = [`%${query}%`]

    if (activeCategories.length > 0) {
      const placeholders = activeCategories.map(() => '?').join(',')
      sql += ` AND category IN (${placeholders})`
      params.push(...activeCategories)
    }

    const dataFromDB = await db.getAllAsync(sql, params)
    return dataFromDB //  return the data
  } catch (error) {
    console.log('getFilteredData() ERROR:', error.message)
  }
}
