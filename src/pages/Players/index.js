import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toArray } from '../../util/reshape';
import PlayersHotloaders from '../../components/hotloaders/PlayersHotloaders';
import { requestUpdatePlayer } from '../../ducks/players';
import {
  Button,
  Badge,
  Container,
  Col,
  Form,
  Row,
  InputGroup
} from 'react-bootstrap';
import styled from 'styled-components';
import colors from '../../util/colors';

export const Players = ({ players, _requestUpdatePlayer }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleSearch = e => setSelectedValue(e.target.value);
  const handleChecked = id => {
    const updatedPlayer = { ...players[id], checkedin: !players[id].checkedin };
    _requestUpdatePlayer(updatedPlayer);
  };
  const filterByAnyValue = (arrayOfObjects, searchTeam) => {
    return (
      arrayOfObjects &&
      Object.keys(arrayOfObjects).length !== 0 &&
      toArray(arrayOfObjects).filter(playerObject =>
        Object.keys(playerObject).some(
          key =>
            key !== 'id' &&
            playerObject[key]
              .toString()
              .toLowerCase()
              .includes(searchTeam.toString().toLowerCase())
        )
      )
    );
  };
  return (
    <Container
      style={{
        margin: 'auto 31px auto 31px',
        width: 'auto',
        backgroundColor: 'white'
      }}
    >
      <PlayersHotloaders />
      <hr />
      <Row>
        <Col xs={6} md={4}>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search by name, grade, team ..."
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={3} md={4}>
          <Button variant="primary">
            Attendence{' '}
            <Badge variant="light">
              {players &&
                Object.keys(players).length !== 0 &&
                toArray(players).filter(player => player.checkedin === true)
                  .length}
            </Badge>
          </Button>
        </Col>
        <Row>
          {players &&
            Object.keys(players).length !== 0 &&
            filterByAnyValue(players, selectedValue).map(
              ({ firstname, lastname, grade, team, checkedin, id }) => {
                return (
                  <Col xs={6} md={3}>
                    <InfoCard
                      className="category-details-information-card"
                      width="auto"
                      key={id}
                    >
                      <CardTitle>{stndrdth(grade)} Grade</CardTitle>
                      <Row>
                        <Col md={9}>
                          <Label>{team}</Label>
                          <InputGroup className="mb-3">
                            <InputGroup.Checkbox
                              checked={checkedin}
                              aria-label="Checkbox for following text input"
                              onChange={() => handleChecked(id)}
                            />
                            <InfoText className="name">
                              {firstname} {lastname}
                            </InfoText>
                          </InputGroup>
                        </Col>
                      </Row>
                    </InfoCard>
                  </Col>
                );
              }
            )}
        </Row>
      </Row>
    </Container>
  );
};

export default connect(
  ({ players }) => ({ players }),
  dispatch => ({
    _requestUpdatePlayer: updatedPlayer => {
      dispatch(requestUpdatePlayer(updatedPlayer));
    }
  })
)(Players);

function stndrdth(number) {
  const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
  const ordinals = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    many: 'th',
    zero: 'th',
    other: 'th'
  };
  return `${number}${ordinals[pr.select(number)]}`;
}

export const InfoCard = styled.div`
  margin: 1em auto;
  background-color: ${colors.backgroundAlt};
  padding: 20px;
`;
InfoCard.displayName = 'InfoCard';
export const CardTitle = styled.h4`
  height: 14px;
  color: #626262;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
`;
CardTitle.displayName = 'CardTitle';
export const Label = styled(CardTitle)`
  height: 15px;
  font-weight: 300;
  line-height: 15px;
`;
Label.displayName = 'Label';
export const InfoText = styled(CardTitle)`
  color: #000000;
  font-size: 18px;
  line-height: 22px;
  margin: 3px;
`;
InfoText.displayName = 'InfoText';
