import React from 'react';
import { connect } from 'react-redux';
import { columnDefs } from './columnDefs';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { toArray } from '../../util/reshape';
import { Row, Col, Container } from 'react-bootstrap';
import PlayersHotloaders from '../../components/hotloaders/PlayersHotloaders';
import { Content, MainBody } from './styled';
export const Reports = ({ players }) => {
  const updatePlayers = [];
  toArray(players).map(player => {
    return updatePlayers.push({
      ...player,
      checkedin: player.checkedin ? 'Yes' : 'No'
    });
  });
  return (
    <Content>
      <PlayersHotloaders />
      <MainBody>
        <Container>
          <Row>
            <Col lg={12}>
              <div
                className="ag-theme-balham"
                style={{
                  height: '800px',
                  width: '1200px'
                }}
              >
                <AgGridReact
                  columnDefs={columnDefs()}
                  rowData={updatePlayers}
                  pagination={true}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </MainBody>
    </Content>
  );
};

export default connect(({ players }) => ({ players }))(Reports);
