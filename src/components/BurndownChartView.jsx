import './BurndownChartView.css';
import React from 'react';
import { observer } from 'mobx-react';
import c3 from 'c3';

const BurndownChartView = observer(class BurndownChartView extends React.Component {
  componentDidMount() {
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 340, 200, 500, 250, 350]
        ]
      },
      axis: {
          x: {
              type: 'timeseries',
              tick: {
                  format: '%Y-%m-%d'
              }
          }
      }
    });
  }

  render() {
    return (
      <div id="chart" className="chart"></div>
    )
  }
});

export default BurndownChartView;