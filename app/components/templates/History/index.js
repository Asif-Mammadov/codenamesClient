import React from 'react';
import DataTable from 'react-data-table-component';

import colors from '../../../constants/colors';

const columns = [
  {
    id: 'name',
    name: '',
    selector: 'name',
    allowOverflow: true,
    wrap: true,
    // Vertical headers styling
    style: {
      color: colors.primary,
      fontWeight: 600
    }
  },
  {
    id: 'win',
    name: 'Win',
    selector: 'win'
  },
  {
    id: 'loss',
    name: 'Loss',
    selector: 'loss'
  },
  {
    id: 'ratio',
    name: 'Win-loss ratio',
    selector: 'ratio',
    right: true
  }
];

const history = [
  {
    name: 'Games',
    win: 10,
    loss: 5,
    ratio: '2:1'
  },
  {
    name: 'Guesses as spymaster',
    win: 5,
    loss: 8,
    ratio: '5:8'
  },
  {
    name: 'Guesses as operative',
    win: 3,
    loss: 5,
    ratio: '3:5'
  }
];

const History = () => {
  return (
    <DataTable
      columns={columns}
      data={history}
      noHeader
      // Table styling
      style={{
        boxShadow: '1px 2px 2px rgb(0 0 0 / 25%)',
        borderRadius: 8,
        height: '100%'
      }}
      customStyles={{
        headCells: {
          style: {
            color: colors.secondary,
            fontSize: 15,
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }
        }
      }}
    />
  );
};

export default History;
