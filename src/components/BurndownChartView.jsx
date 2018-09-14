import './BurndownChartView.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import c3 from 'c3';
import { generateBurndownChartData } from '../util/ChartUtil';

class BurndownChartView extends React.Component {
  componentDidMount() {
    this.props.bugs.observe(() => {
      const { bugs, filterOptions } = this.props;
      const { data, axis } = generateBurndownChartData({ 
        bugs, 
        minDate: filterOptions.startDate.get()
      });
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
  bugs: PropTypes.array.isRequired,
  filterOptions: PropTypes.object.isRequired
}

export default observer(BurndownChartView);