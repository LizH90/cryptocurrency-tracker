import raf from './tempPolyfills'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { componentDidMount } from './App'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});



it('returns data when get request called', (done) => {
  let mock = new MockAdapter(axios);
  mock.onGet('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD').reply(200,{
    data: {
      posts: ['intro to git']
    }
  });

  let response = componentDidMount();

  expect(response.data[0]).to.be.equal(USD)


});
