import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import './App.css';
import moment from 'moment';
var NumberFormat = require('react-number-format');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: ['https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD',
      'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG',
      'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=60&aggregate=3&e=CCCAGG'],
      cryptos:[],
      chartData: {},
      chart2Data: {}
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend:false,
    legendPosition:'bottom',
  }

  getChartData(url){
    axios.get(url)
      .then(res => {
        let bitcoin = res.data.Data
        let date=[]
        let value=[]
        for (let i=0; i<bitcoin.length; i++){
          date.push(moment.unix(bitcoin[i].time).format("DD-MMM"))
          value.push(bitcoin[i].open)
        }
          this.setState({
            chartData: {
              labels: date,
              datasets:[
                { label: 'Price in $',
                  data: value,
                  backgroundColor:['#657b9e']
                }
              ]
            }
          });
        }
    ).catch(function (error) {
      console.log(error);
    })
  }
  getChart2Data(url){
    axios.get(url)
      .then(res => {
        let bitcoin = res.data.Data
        let date=[]
        let value=[]
        for (let i=0; i<bitcoin.length; i++){
          date.push(moment.unix(bitcoin[i].time).format("DD-MMM"))
          value.push(bitcoin[i].open)
        }
          this.setState({
            chart2Data: {
              labels: date,
              datasets:[
                { label: 'Price in $',
                  data: value,
                  backgroundColor:['#657b9e']
                }
              ]
            }
          });
        }
    ).catch(function (error) {
      console.log(error);
    })
  }

  getInfoBoxData(url) {
    axios.get(url)
      .then(res => {
        console.log("api call")
        this.setState({cryptos: res.data})
    }).catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount(){
    this.getInfoBoxData(this.state.urls[0]);
    setInterval(() => {this.getInfoBoxData(this.state.urls[0])}, 10000);
    this.getChartData(this.state.urls[1]);
    this.getChart2Data(this.state.urls[2]);
  }

  render() {
    return (
      <div className="Title">
      <h1> CryptoCurrency Price Tracker</h1>
      <br></br>
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id="currency-container" key={key}>
            <span className="currency">{key}</span>
            <span className="price"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} /></span>
          </div>
        ))}
        <div className="chart" id="chart" >
        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Bitcoin to USD',
              fontSize: 20,
              fontColor:'#000'
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
        <Line
          data={this.state.chart2Data}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Ethereum to USD',
              fontSize: 20,
              fontColor:'#000'
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
      </div>
    )
  }
}

export default App;
