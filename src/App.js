import React, { Component } from 'react';
// import {Line} from 'react-chartjs-2';
import axios from 'axios';
import './App.css';
import moment from 'moment';
import Chart from './components/Chart.js'
import './components/Chart.css';
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

  // static defaultProps = {
  //   displayTitle:true,
  //   displayLegend:false,
  //   legendPosition:'bottom',
  // }

  // componentWillMount(){
  // }


  getChartData(){
    axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
      .then(res => {
        let bitcoin = res.data.Data
        let date=[]
        let value=[]
        for (let i=0; i<bitcoin.length; i++){
          date.push(moment.unix(bitcoin[i].time).format("DD-MMM"))
          value.push(bitcoin[i].open)
        }
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
        }
    ).catch(function (error) {
      console.log(error);
    })
  }

  getInfoBoxData() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
      .then(res => {
        this.setState({cryptos: res.data})
        console.log("THIS")
    }).catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount(){
    this.getInfoBoxData();
    this.getChartData();
    setInterval(() => {this.getInfoBoxData()}, 3000);
  }

  render() {
    return (
      <div className="Title">
      <h1> Bitcoin Price Tracker </h1>
      <br></br>
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id={"currency-container"} key={key}>
            <span className="currency">{key}</span>
            <span className="price"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} /></span>
          </div>
        ))}
        <div className="chart" >
        <Chart data={this.state.chartData}/>
        </div>
      </div>
      </div>
    )
  }
}

export default App;
