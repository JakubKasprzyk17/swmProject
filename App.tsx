import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '_navigations';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
