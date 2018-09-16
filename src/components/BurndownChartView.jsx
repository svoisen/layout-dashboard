import './BurndownChartView.css';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import c3 from 'c3';
import { generateBurndownChartData } from '../util/ChartUtil';
import { autorun } from 'mobx';

class BurndownChartView extends React.Component {
  componentDidMount() {
    this.autorunDisposer = autorun(() => {
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

  componentWillUnmount() {
    if (this.autorunDisposer) {
      this.autorunDisposer();
    }
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