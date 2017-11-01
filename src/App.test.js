import raf from './tempPolyfills'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

var mock = new MockAdapter(axios);

mock.onGet('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD').reply(200, {
  cryptos: [
    { BTC:{
      USD: '16142.04'
    }}
  ]
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('returns data when get request called', () => {
  return axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
  .then(data => {
    expect(data).toBeDefined()
    expect(data.data.cryptos[0].BTC).toEqual({ USD: '16142.04'})
  })
});
