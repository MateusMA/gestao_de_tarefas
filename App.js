; import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/contexts/store';
import Routes from './src/router';

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="#ddd" translucent={false}
      />
      <Routes />
    </Provider>
  );
}






