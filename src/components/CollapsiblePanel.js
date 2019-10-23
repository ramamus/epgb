import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Panel, Col, Row, Collapse, Checkbox } from 'react-bootstrap';
import {
  PanelHeader,
  ExpandButton,
  Header,
  HeaderColor,
  ExpandedPanel
} from './CollapsiblePanelComponents/CollapsiblePanelComponents';
import styled from 'styled-components';

const greyBackgroundColor = 'rgba(227, 227, 227, 0.5)';

export const COLLAPSE = 'COLLAPSE';
export const EXPAND = 'EXPAND';

const StyledCheckbox = styled(Checkbox)`
  -webkit-transform: scale(1.65);
  margin: 3px 0px 0px 17px;
`;

class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.forcePanelState === EXPAND) {
      return {
        isExpanded: true
      };
    } else if (props.forcePanelState === COLLAPSE) {
      return { isExpanded: false };
    } else return state;
  }

  toggleClick = expandAndCollapseCallback => {
    expandAndCollapseCallback();
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const {
      panelColor,
      title,
      onEditClick,
      onTitleClick,
      expandAndCollapseCallback,
      additionalProps,
      mergeCategoryProps = {},
      showContextMenu = true,
      checkedIn,
      handleCheckIn,
      id
    } = this.props;
    const {
      mergeCategoryState,
      handleMergeCategories,
      mergeCategorySelectionDisabled,
      selectedCategoriesForMerge,
      resetSelection
    } = mergeCategoryProps;

    const renderPanelColor = this.state.isExpanded
      ? panelColor
      : greyBackgroundColor;

    const renderTitleColor = this.state.isExpanded ? '#FFFFFF' : '#424242';

    let disabled = true;
    let checked =
      selectedCategoriesForMerge &&
      selectedCategoriesForMerge.includes(additionalProps);
    if (mergeCategorySelectionDisabled) {
      disabled =
        selectedCategoriesForMerge &&
        selectedCategoriesForMerge.includes(additionalProps);
    } else if (resetSelection) {
      checked = false;
    }

    return (
      <Row style={{ margin: '0px' }}>
        <Col
          sm={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '450px'
          }}
          className="collapsible-card"
        >
          <PanelHeader background={renderPanelColor}>
            <Collapse in={mergeCategoryState}>
              <Col
                style={{
                  padding: '0px ',
                  width: '50px'
                }}
              >
                <div
                  style={{
                    height: '59px',
                    backgroundColor: 'rgba(74,74,74,0.5)',
                    transition: 'all 0.0001s ease-in'
                  }}
                >
                  <StyledCheckbox
                    disabled={!disabled}
                    checked={checked}
                    onClick={() => {
                      handleMergeCategories(
                        additionalProps,
                        this.myCheckbox.checked
                      );
                    }}
                    inputRef={ref => (this.myCheckbox = ref)}
                    inline
                    className="merge-category-checkbox"
                  />
                </div>
              </Col>
            </Collapse>
            <ExpandButton
              color={renderTitleColor}
              background={greyBackgroundColor}
              onClick={() => {
                this.toggleClick(expandAndCollapseCallback);
              }}
            >
              <FontAwesome
                name={this.state.isExpanded ? 'minus' : 'plus'}
                style={{
                  fontSize: '15px',
                  color: renderTitleColor
                }}
              />
            </ExpandButton>
            <Header onClick={onTitleClick} className="header-link" color="red">
              {title}
            </Header>

            <div
              style={{ display: 'flex', position: 'absolute', right: '25px' }}
            >
              {onEditClick && (
                <FontAwesome
                  className="edit-category"
                  onClick={() => onEditClick(additionalProps, true)}
                  name="edit"
                  style={{
                    paddingTop: '21px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: renderTitleColor
                  }}
                />
              )}
              <div
                className="collapsible-card-menu"
                style={{
                  paddingTop: '10px'
                }}
              >
                {!showContextMenu && (
                  <div
                    style={{
                      height: '59px',
                      backgroundColor: 'rgba(74,74,74,0.5)',
                      transition: 'all 0.0001s ease-in',
                      margin: '-9px'
                    }}
                  >
                    <StyledCheckbox
                      disabled={!disabled}
                      checked={checkedIn}
                      onClick={() => handleCheckIn(id)}
                      inputRef={ref => (this.myCheckbox = ref)}
                      inline
                      className="merge-category-checkbox"
                    />
                  </div>
                )}
              </div>
            </div>
          </PanelHeader>
          <div>
            <HeaderColor
              isExpanded={this.state.isExpanded}
              panelColor={panelColor}
            />
            <ExpandedPanel expanded={this.state.isExpanded}>
              <Panel.Collapse>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1
                  }}
                >
                  <Panel.Body>{this.props.children}</Panel.Body>
                </div>
              </Panel.Collapse>
            </ExpandedPanel>
          </div>
        </Col>
      </Row>
    );
  }
}
export default CollapsiblePanel;
