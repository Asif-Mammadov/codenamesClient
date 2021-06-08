import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import colors from '../../../constants/colors';
import withAuth from '../../../hoc/withAuth';
import Spinner from '../../elements/Spinner';
import AccountLayout from '../../layouts/AccountLayout';

const History = ({ translate, isAuth, details, loading }) => {
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

  const [history, setHistory] = useState();

  console.log(loading);

  useEffect(() => {
    if (details) {
      setHistory([
        {
          name: translate('games'),
          win: details[0].Wins,
          loss: details[0].Loses,
          ratio: `${details[0].Wins}:${details[0].Loses}`
        },
        {
          name: translate('guesses_spymaster'),
          win: details[0].GuessedRightAsSpymaster,
          loss: details[0].GuessedWrongAsSpymaster,
          ratio: `${details[0].GuessedRightAsSpymaster}:${details[0].GuessedWrongAsSpymaster}`
        },
        {
          name: translate('guesses_operative'),
          win: details[0].GuessedRightAsOperative,
          loss: details[0].GuessedWrongAsOperative,
          ratio: `${details[0].GuessedRightAsOperative}:${details[0].GuessedWrongAsOperative}`
        }
      ]);
    }
  }, [details]);

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

const mapStateToProps = ({ auth }) => {
  const { details } = auth;
  return { details };
};

export default connect(mapStateToProps)(History);
