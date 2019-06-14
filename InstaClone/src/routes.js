import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import Logo from './assets/logo.png';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Feed,
      New,
    },
    {
      defaultNavigationOptions: {
        headerTitle: <Image
          style={{ marginLeft: 120 }}
          source={Logo}
        />,
        headerBackTitle: null,
        headerTintColor: '#000',
      },
      mode: 'modal',
    },
  ),
);

export default Routes;
