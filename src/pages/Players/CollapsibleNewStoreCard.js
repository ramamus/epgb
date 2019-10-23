import React from 'react';
import CollapsiblePanel from '../../components/CollapsiblePanel';
import { Row, Col } from 'react-bootstrap';
import { AttributeLabel, AttributeValue, AttributeWrapper } from './styled';
import colors from '../../util/colors';

const Attribute = ({ className, label, value }) => {
  return (
    <AttributeWrapper className={className}>
      <AttributeLabel>{label}</AttributeLabel>
      <AttributeValue>{value}</AttributeValue>
    </AttributeWrapper>
  );
};

const NewStoreCard = ({ player }) => {
  const { id, firstname, lastname, grade, team } = player;
  return (
    <Row className="new-store-card">
      <Row>
        <Col xs={6}>
          <Attribute className={'project-id'} label={'ID'} value={id} />
          <Attribute
            className={'set-date'}
            label={'First Name'}
            value="ANU"
          />
          <Attribute
            className={'pyramid-id'}
            label={'Last Name'}
            value={lastname}
          />
        </Col>
        <Col md={6}>
          <Attribute
            className={'new-store-investment-year'}
            label={'Grade'}
            value={grade}
          />
          <Attribute
            className={'new-store-investment-month'}
            label={'Team'}
            value={team}
          />
        </Col>
      </Row>
    </Row>
  );
};

const CollapsibleNewStoreCard = ({
  player,
  goToProjectPage,
  expandAndCollapseCallback,
  forcePanelState,
  checkedIn,
  updateCheckedIn
}) => {
  const { id, firstName } = player;

  return (
    <CollapsiblePanel
      key={id}
      id={id}
      title={firstName}
      checkedIn={checkedIn}
      handleCheckIn={key => updateCheckedIn(key)}
      panelColor={colors.panelColor}
      onTitleClick={() => goToProjectPage(id)}
      additionalProps={player}
      forcePanelState={forcePanelState}
      expandAndCollapseCallback={expandAndCollapseCallback}
      contextMenuClassName="new-store-card-context-menu"
      showContextMenu={false}
    >
      <NewStoreCard key={id} player={player} />
    </CollapsiblePanel>
  );
};

export default CollapsibleNewStoreCard;
