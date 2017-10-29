import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    // this.props
    super(props);

    this.state = {
      cryptos:[]
    };
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
    .then(res => {
      const cryptos = res.data;
      console.log(cryptos);
      // rerendered with updated state
      this.setState({cryptos: res.data});
    })
  }

  render() {
    return (
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id={"crypto-container"} key={key}>
            <span className="left">{key}</span>
            <span className="right">{this.state.cryptos[key].USD}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default App;
