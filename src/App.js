import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import './App.css';
// import Chart from './components/Chart.js'
var NumberFormat = require('react-number-format');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cryptos:[],
      chartData: {
        labels: []
      }
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
      .then(res => {
        var bitcoin = res.data.Data
        let date=[]
        let value=[]
        for (let i=0; i<bitcoin.length; i++){
          date.push(bitcoin[i].time)
          value.push(bitcoin[i].open)
        }
        console.log(date)
        console.log(value)
          this.setState({
            chartData: {
              labels: date,
              datasets:[
                { data: value
                }
              ]
            }
          });
          console.log(this.state)
        }
    ).catch(function (error) {
      console.log(error);
    })
    console.log(this.state)
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
      .then(res => {
      this.setState({cryptos: res.data});
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id={"currency-container"} key={key}>
            <span className="currency">{key}</span>
            <span className="price"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} /></span>
          </div>
        ))}
        <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Bitcoin to USD',
              fontSize: 20
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition,
              labels:{
                fontColor:'#000'
              }
            }
          }}
        />
        </div>


      </div>
    )
  }
}

export default App;
