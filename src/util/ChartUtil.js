const generateBurndownChartData = ({ bugs, minDate }) => {
  let events = [];
  bugs.forEach(bug => {
    if (!bug.is_open && bug.cf_last_resolved) {
      events.push({
        isOpen: false,
        date: new Date(bug.cf_last_resolved)
      });
    }

    events.push({
      isOpen: true,
      date: new Date(bug.creation_time)
    });
  });

  let openCount = 0;
  events = events
    .sort((a, b) => a.date > b.date)
    .map(event => {
      if (event.isOpen) {
        return { numOpen: ++openCount, ...event };
      } 

      return { numOpen: --openCount, ...event };
    })
    .filter(event => event.date >= minDate);

  return {
    data: {
      x: 'x',
      columns: [
        ['x'].concat(events.map(event => event.date)),
        ['open'].concat(events.map(event => event.numOpen))
      ],
      names: {
        open: 'Open Bugs'
      },
      types: {
        open: 'area'
      },
      colors: {
        open: '#4eb5e6'
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    }
  }
}

export {
  generateBurndownChartData
}