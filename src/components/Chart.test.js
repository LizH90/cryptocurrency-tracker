import raf from '../tempPolyfills'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import ReactDOM from 'react-dom';

var mock1 = new MockAdapter(axios);

mock1.onGet('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG').reply(200, {
  labels: ['29-Oct', '30-Oct', '31-Oct'],
    datasets:[
      {title: 'Price in £',
        data: [
          1234,
          354,
          5734
        ],
      }
    ]
  }
);

it('returns data when get request called', () => {
  return axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
  .then(data => {
    expect(data).toBeDefined()
    expect(data.data.labels[0]).toEqual('29-Oct')
  })
});
