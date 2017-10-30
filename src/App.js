import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

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
            <span className="price">{this.state.cryptos[key].USD}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default App;
