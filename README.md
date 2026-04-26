# Little Lemon Capstone 🍋

A React Native capstone project for the Little Lemon restaurant app. Built with Expo, it features user onboarding, interactive menu with search and category filtering, SQLite data persistence, and a customizable profile with avatar management and email preferences. Demonstrates modern mobile development practices.

## Features

- **User Onboarding**: Collect and validate user information (first name, last name, email).
- **Menu Browsing**: Display restaurant menu with search functionality and category filters (e.g., starters, mains, desserts).
- **Data Persistence**: Local SQLite database for menu items; AsyncStorage for user data and preferences.
- **Profile Management**: View and edit user profile, upload/change avatar, toggle email notifications.
- **Navigation**: Smooth stack navigation with custom headers.
- **Responsive UI**: Built with React Native Paper and custom fonts for a polished look.

## Tech Stack

- **React Native**: 0.83.4
- **Expo**: 55.0.15
- **React**: 19.2.0
- **Navigation**: @react-navigation/native (7.2.2), @react-navigation/native-stack (7.14.11)
- **Database**: expo-sqlite (55.0.15)
- **Storage**: @react-native-async-storage/async-storage (2.2.0)
- **UI Components**: react-native-paper (5.15.1)
- **Image Handling**: expo-image-picker (55.0.19)
- **Fonts**: expo-font (55.0.6)
- **Other**: react-native-safe-area-context, react-native-screens, react-native-gesture-handler, react-native-reanimated

## Prerequisites

Before running the app, ensure you have the following installed:

- **Node.js**: Version 18 or higher (download from [nodejs.org](https://nodejs.org/))
- **Expo CLI**: Install globally via npm:
  ```
  npm install -g @expo/cli
  ```
- **Git**: For cloning the repository (optional, if not using GitHub Desktop)

## Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/homam121/Little-Lemon-Capstone-App.git
   cd Little-Lemon-Capstone-App
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Install Expo Go app** on your mobile device (iOS/Android) for testing, or use an emulator/simulator.

## Running the App

1. **Start the Expo development server**:
   ```
   npx expo start
   ```

2. **Run on a device/emulator**:
   - Scan the QR code with the Expo Go app (for physical devices).
   - Press `a` for Android emulator, `i` for iOS simulator (if set up).
   - Alternatively, use `npx expo run:android` or `npx expo run:ios` for native builds.

3. **Build for production** (optional):
   ```
   npx expo build:android  # or :ios
   ```

## Project Structure

```
Little-Lemon-Capstone-App/
├── assets/
│   └── fonts/          # Custom fonts
├── components/         # Reusable components (CustomHeader, FoodMenu)
├── navigation/         # Navigation setup (AppNavigator, MainNavigator)
├── screens/            # App screens (OnBoarding, HomePage, Profile)
├── App.js              # Main app component
├── database.js         # SQLite database functions
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## API Usage

The app fetches menu data from a public GitHub API:
- URL: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json`
- Data is stored locally in SQLite for offline access.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is for educational purposes as part of a capstone assignment. No specific license is applied.

## Screenshots

*(Add screenshots here if available)*

For more details, check the [Expo documentation](https://docs.expo.dev/) or the [React Native docs](https://reactnative.dev/docs/getting-started).</content>
<parameter name="filePath">c:\Users\homam\Desktop\Capstone React App\Little Lemon Capstone\README.md