import React, {Component} from 'react';
import './Chart.css';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';


class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend:true,
    legendPosition:'bottom'
  }

  render(){
    return (
      <div className="chart">
      this has been added by Becca
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
    )
  }
}

export default Chart;
