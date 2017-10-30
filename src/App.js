import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Chart from './components/Chart.js'
var NumberFormat = require('react-number-format');

class App extends Component {

  constructor(props) {
    // this.props
    super(props);
    this.state = {
      cryptos:[],
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    //Axios call here
    this.setState({
      chartData:{
        labels: ['BTC', 'ETH', 'Something'],
        datasets:[
          {label: 'Price in £',
            data: [
              1234,
              2436,
              5734
            ],
            backgroundColor:['darkblue']
          }
        ]
      }
    })
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
        <Chart chartData={this.state.chartData}/>
      </div>
    )
  }
}

export default App;
