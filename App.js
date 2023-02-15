// components
import MyApp from './myFolder/MyApp';
import {Provider} from 'react-redux';
import store from './myFolder/Store/Store';

function App() {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}

export default App;
