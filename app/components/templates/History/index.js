import React from 'react';
import DataTable from 'react-data-table-component';
import colors from '../../../constants/colors';
import withAuth from '../../../hoc/withAuth';
import AccountLayout from '../../layouts/AccountLayout';

const History = ({ translate, isAuth }) => {
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
      name: translate('win'),
      selector: 'win'
    },
    {
      id: 'loss',
      name: translate('loss'),
      selector: 'loss'
    },
    {
      id: 'ratio',
      name: translate('win_loss'),
      selector: 'ratio',
      right: true
    }
  ];

  const history = [
    {
      name: translate('games'),
      win: 10,
      loss: 5,
      ratio: '2:1'
    },
    {
      name: translate('guesses_spymaster'),
      win: 5,
      loss: 8,
      ratio: '5:8'
    },
    {
      name: translate('guesses_operative'),
      win: 3,
      loss: 5,
      ratio: '3:5'
    }
  ];

  return (
    <AccountLayout translate={translate}>
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
    </AccountLayout>
  );
};

export default withAuth(History);
