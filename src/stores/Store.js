import { RouterStore } from 'mobx-react-router';
import { startOfThisYear } from '../util/DateUtil';
import { observable } from 'mobx';

const createStore = () => {
  return {
    filterOptions: {
      startDate: observable.box(startOfThisYear())
    },
    bugs: observable([]),
    filteredBugs: observable([]),
    router: new RouterStore()
  };
};

export {
  createStore
}
