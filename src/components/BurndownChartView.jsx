import './BurndownChartView.css';
import React from 'react';
import PropTypes from 'prop-types';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import c3 from 'c3';
import { generateBurndownChartData } from '../util/ChartUtil';

class BurndownChartView extends React.Component {
  componentDidMount() {
    this.props.bugs.observe(() => {
      const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)) 
      const { data, axis } = generateBurndownChartData({ bugs: this.props.bugs, minDate: oneYearAgo });
      c3.generate({
        bindto: '#chart',
        data,
        axis
      });
    }, true);
  }

  render() {
    return (
      <div id="chart" className="chart"></div>
    )
  }
}

BurndownChartView.propTypes = {
  bugs: PropTypes.array.isRequired
}

export default observer(BurndownChartView);