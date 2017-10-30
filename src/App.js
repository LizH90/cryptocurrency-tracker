import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
var NumberFormat = require('react-number-format');

class App extends Component {

  constructor(props) {
    // this.props
    super(props);
    this.state = {
      cryptos:[]
    }
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
      .then(res => {
      this.setState({cryptos: res.data});
    })
  }

  render() {
    const {cryptos} = this.state;
    return (
      <div className="App">
        {Object.keys(cryptos).map((key) => (
          <div id={"currency-container"} key={key}>
            <span className="currency">{key}</span>
            <span className="price"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} /></span>
          </div>
        ))}
      </div>
    )
  }
}

export default App;
