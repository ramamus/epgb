import React, { useState } from 'react';
import { connect } from 'react-redux';
import {toArray} from '../../util/reshape';
import CollapsibleNewStoreCard from './CollapsibleNewStoreCard';
import PlayersHotloaders from '../../components/hotloaders/PlayersHotloaders';

export const Players = ({ players }) => {
  const [forceState, setForceState] = useState(undefined);
  return (
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players).map(player => {
      return (
        <React.Fragment>
          <PlayersHotloaders />
          {players && Object.keys(players).length !== 0 && (
            <CollapsibleNewStoreCard
              key={player.id}
              player={player}
              checkedIn={false}
              updateCheckedIn={() => {}}
              expandAndCollapseCallback={() => setForceState(undefined)}
              forcePanelState={forceState}
              contextMenuDropup={false}
            />
          )}
        </React.Fragment>
      );
    })
  );
};

export default connect(({ players }) => ({ players }))(Players);
