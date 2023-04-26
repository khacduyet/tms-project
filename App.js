import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppContainer from './AppContainer';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { SafeAreaView, StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Colors } from './src/common/constant';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <RootSiblingParent>
      <StatusBar style="light" backgroundColor={Colors.Primary} />
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      </Provider>
    </RootSiblingParent>
  );
}



