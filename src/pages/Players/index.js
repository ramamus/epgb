import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import ListPagination from '../../components/ListPagination';
import PlayersHotloaders from '../../components/hotloaders/PlayersHotloaders';
import {
  filteredPlayers,
  getPills,
  playerManagerSearch,
  playerManagerSort,
  requestUpdatePlayer
} from '../../ducks/players';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { setSortTerm } from '../../ducks/sort';
import SearchInformation from '../../components/SearchInformation';
import { COLLAPSE, EXPAND } from '../../components/CollapsiblePanel';
import CollapsibleNewStoreCard from './CollapsibleNewStoreCard';
import { toArray } from '../../util/reshape';
import { removeSearchTerm, setSearchTerms } from '../../ducks/search';
import {
  PageTitle,
  HeaderHr,
  Content,
  MainBody,
  FilterColumn,
  ExpandCollapsePanel
} from './styled';

const APPLICATION = 'transition_manager';

const createPages = (projects, { pageSize }) => {
  const projectsArray = projects;
  const parsedPageSize = parseInt(pageSize, 10);
  let pages = [];
  for (let i = 0; i < projectsArray.length; i += parsedPageSize) {
    pages.push(projectsArray.slice(i, i + parsedPageSize));
  }
  return pages;
};

const PlayerList = ({
  players,
  allPlayers,
  _setSearchTerms,
  _removeSearchTerm,
  pills,
  _requestUpdatePlayer,
  _goToReports
}) => {
  const [pageSize, setPageSize] = useState('10');
  const [startPageRow, setStartPageRow] = useState(1);
  const [endPageRow, setEndPageRow] = useState(10);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState([]);
  const [openPageSizeSelector, setOpenPageSizeSelector] = useState(false);
  const [forceState, setForceState] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);
  //const projectNameSort = sort.filter(term => term.field === 'project_name')[0];
  useEffect(
    () => {
      document.title = 'EPGBA';
      if (players.length > 0) {
        let newPages = createPages(players, { pageSize: pageSize });
        setPages(newPages);
        setStartPageRow(active * parseInt(pageSize, 10) + 1);
        setEndPageRow(
          active * parseInt(pageSize, 10) + newPages[active].length
        );
      } else {
        setPages([]);
        setStartPageRow(1);
        setEndPageRow(pageSize);
      }
    },
    [players, pageSize]
  );
  const onPageSizeChanged = pageSize => {
    setPageSize(pageSize);
    setOpenPageSizeSelector(false);
  };
  const onPageNumberChanged = pageId => {
    setActive(pageId);
    setStartPageRow(pageId * parseInt(pageSize, 10) + 1);
    setEndPageRow(pageId * parseInt(pageSize, 10) + pages[pageId].length);
  };
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };
  const searchTransition = (event, term) => {
    event.preventDefault();
    if (toArray(term.trim()).length) {
      _setSearchTerms('transition_manager', {
        values: [term.trim()]
      });
    }
    setSearchTerm('');
  };
  const removeSearchTerm = id => {
    _removeSearchTerm('transition_manager', id);
  };
  const updateCheckedIn = id => {
    const player = {
      ...allPlayers[id],
      checkedIn: true
    };
    _requestUpdatePlayer(player);
  };
  return (
    <Content>
      <PlayersHotloaders />
      <Grid>
        <PageTitle className="page-title">
          Eden Prairie Girls Basketball
        </PageTitle>
        <HeaderHr />
      </Grid>
      <MainBody>
        <Grid>
          <Row>
            <FilterColumn md={3}>
              <form
                className="transition-search"
                onSubmit={event => {
                  searchTransition(event, searchTerm);
                }}
              >
                <FormGroup className="search-form">
                  <label class="searchLabel">SEARCH ALL</label>
                  <FormControl
                    className="search-textbox"
                    value={searchTerm}
                    placeholder="e.g., Name, Grade, Team"
                    type="text"
                    onChange={handleSearchChange}
                  />
                </FormGroup>
                <Button bsStyle="primary" onClick={_goToReports}>
                  <strong>REPORTS</strong>
                </Button>
              </form>
            </FilterColumn>
            <Col md={9}>
              <div>
                <ExpandCollapsePanel>
                  <Button
                    bsStyle="link"
                    onClick={() => setForceState(COLLAPSE)}
                  >
                    <strong>- All</strong>
                  </Button>
                  |
                  <Button bsStyle="link" onClick={() => setForceState(EXPAND)}>
                    {' '}
                    <strong>+ All</strong>
                  </Button>
                </ExpandCollapsePanel>
              </div>
              <SearchInformation
                show={Object.keys(playerManagerSearch).length > 0}
                results={players}
                pills={pills}
                onRemovePill={removeSearchTerm}
              />
              <Loader dependencies={['players']} players={players}>
                {() =>
                  pages.length > 0 ? (
                    pages[active].map((player, index, pages) => {
                      return (
                        <CollapsibleNewStoreCard
                          key={player.id}
                          player={player}
                          checkedIn={player.checkedIn}
                          updateCheckedIn={updateCheckedIn}
                          expandAndCollapseCallback={() =>
                            setForceState(undefined)
                          }
                          forcePanelState={forceState}
                          contextMenuDropup={
                            index === pages.length - 1 ? true : false
                          }
                        />
                      );
                    })
                  ) : (
                    <h1>No Results</h1>
                  )
                }
              </Loader>
            </Col>
            <Col mdOffset={3} md={9}>
              <ListPagination
                onPageSizeChanged={onPageSizeChanged}
                toggleOpenState={() =>
                  setOpenPageSizeSelector(!openPageSizeSelector)
                }
                setOpenStateToFalse={() => setOpenPageSizeSelector(false)}
                openPageSizeSelector={openPageSizeSelector}
                pageSize={pageSize}
                startPageRow={startPageRow}
                endPageRow={endPageRow}
                totalLength={players.length}
                onPageNumberChanged={onPageNumberChanged}
                active={active}
                totalNumberOfPages={pages.length}
              />
            </Col>
          </Row>
        </Grid>
      </MainBody>
    </Content>
  );
};

export default connect(
  state => {
    return {
      allPlayers: state.players,
      players: filteredPlayers(state),
      playerManagerSearch: playerManagerSearch(state),
      pills: getPills(state),
      sort: playerManagerSort(state)
    };
  },
  dispatch => ({
    setSort: (term, position) => {
      dispatch(setSortTerm(APPLICATION, term, position));
    },
    _setSearchTerms: (application, searchTerms) => {
      dispatch(setSearchTerms(application, searchTerms));
    },
    _removeSearchTerm: (application, id) => {
      dispatch(removeSearchTerm(application, id));
    },
    _requestUpdatePlayer: updatedPlayer => {
      dispatch(requestUpdatePlayer(updatedPlayer));
    }
    // _goToReports: () => {
    //   dispatch(push('/reports'));
    // }
  })
)(PlayerList);


// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import {toArray} from '../../util/reshape';
// import CollapsibleNewStoreCard from './CollapsibleNewStoreCard';
// import PlayersHotloaders from '../../components/hotloaders/PlayersHotloaders';

// export const Players = ({ players }) => {
//   const [forceState, setForceState] = useState(undefined);
//   return (
//     players &&
//     Object.keys(players).length !== 0 &&
//     toArray(players).map(player => {
//       return (
//         <React.Fragment>
//           <PlayersHotloaders />
//           {players && Object.keys(players).length !== 0 && (
//             <CollapsibleNewStoreCard
//               key={player.id}
//               player={player}
//               checkedIn={false}
//               updateCheckedIn={() => {}}
//               expandAndCollapseCallback={() => setForceState(undefined)}
//               forcePanelState={forceState}
//               contextMenuDropup={false}
//             />
//           )}
//         </React.Fragment>
//       );
//     })
//   );
// };

// export default connect(({ players }) => ({ players }))(Players);
