import { createAppContainer, createStackNavigator } from 'react-navigation';

import Feed from './pages/Feed';
import New from './pages/New';

const Routes = createAppContainer(
  createStackNavigator({
    Feed,
    New,
  }),
);

export default Routes;
