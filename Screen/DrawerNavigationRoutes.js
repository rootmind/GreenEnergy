/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import External Screens
import HomeScreen from './drawerScreens/HomeScreen';
import SettingsScreen from './drawerScreens/SettingsScreen';
import Utilization from './drawerScreens/Utilization';
import GradeUtilization from './drawerScreens/GradeUtilization';
import Profile from './drawerScreens/Profile';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home Screen',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1DA1F2',
      },
      headerTintColor: 'white',
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Setting Screen',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1DA1F2',
      },
      headerTintColor: 'white',
    }),
  },
});

const ThirdActivity_StackNavigator = createStackNavigator({
  First: {
    screen: Utilization,
    navigationOptions: ({ navigation }) => ({
      title: 'Utilization',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1DA1F2',
      },
      headerTintColor: 'white',
    }),
  },
});

const FourthActivity_StackNavigator = createStackNavigator({
  First: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1DA1F2',
      },
      headerTintColor: 'white',
    }),
  },
});

const FifthActivity_StackNavigator = createStackNavigator({
  First: {
    screen: GradeUtilization,
    navigationOptions: ({ navigation }) => ({
      title: 'GradeUtilization',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#1DA1F2',
      },
      headerTintColor: 'white',
    }),
  },
});



const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    HomeScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home Screen',
      },
    },
   
    Utilization: {
      screen: ThirdActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Utilization',
      },
    },

    GradeUtilization: {
      screen: FifthActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'GradeUtilization',
      },
    },

    Profile: {
      screen: FourthActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Profile',
      },
    },
    // Dashboard: {
    //   screen: DashboardStackNavigator
    // }
    // SettingsScreen: {
    //   screen: SecondActivity_StackNavigator,
    //   navigationOptions: {
    //     drawerLabel: 'Setting Screen',
    //   },
    // },


  },
  {
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

// const DashboardTabNavigator = createBottomTabNavigator(
//   {
//    HomeScreen,
//    Utilization
//   },
//   {
//     navigationOptions: ({ navigation }) => {
//       const { routeName } = navigation.state.routes[navigation.state.index];
//       return {
//         header: null,
//         headerTitle: routeName
//       };
//     }
//   }
// );

// const DashboardStackNavigator = createStackNavigator(
//   {
//     DashboardTabNavigator: DashboardTabNavigator
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         headerLeft: (
//           <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
//         )
//       };
//     }
//   }
// );

export default DrawerNavigatorRoutes;