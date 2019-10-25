import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import MainChat from './components/mainChat/MainChat';
import thunk from 'redux-thunk';
import './App.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <MainChat />
      </div>
    </Provider>
  );
}

export default App;
