import styled from 'styled-components';
import { Button, Col, Glyphicon, Grid, Panel, Tabs } from 'react-bootstrap';
import overrideColors from '../util/colors';

const colors = {  ...overrideColors };

/* Top Level */
/* Global styling for the app container */
export const App = styled.div`
  font-family: inherit;
`;
App.displayName = 'App';

/* Page content below the header */
export const Content = styled.div`
  min-height: 95vh;
  overflow: hidden;
  background-color: ${colors.background};
`;
Content.displayName = 'Content';

/* In-Page */
/* Containers */
/* Sections (top level content) */
export const Section = styled.div`
  padding-top: 30px;
  display: flex;
  background: ${colors.background};
  @media (max-width: 768px) {
    display: block;
  }
`;
Section.displayName = 'Section';

export const TableSection = styled(Section)`
  overflow-x: auto;
`;
TableSection.displayName = 'TableSection';

/* A generic container div */
export const Container = styled.div`
  background-color: ${colors.background};
`;
Container.displayName = 'Conatainer';

/* A Bootstrap Grid with no padding */
export const GridContainer = styled(Grid)`
  padding: 0;
  margin: 0;
  width: 100%;
`;

/* A half-width flex container div */
export const HalfWidthFlexContainer = styled.div`
  display: flex;
  width: 50%;
`;
HalfWidthFlexContainer.displayName = 'HalfWidthFlexContainer';

/* A generic panel that expands to the full width of its parent */
export const FullWidthPanel = styled(Panel)`
  flex: 1;
  padding: 0 35px;
  background-color: ${colors.background};
  @media (max-width: 480px) {
    padding: 0;
  }
`;
FullWidthPanel.displayName = 'FullWidthPanel';

/* A generic card with an alternative background color */

export const Card = styled.div`
  width: 95%;
  margin: 1em 2.5%;
  padding: 1em;
  background-color: ${colors.backgroundAlt};
  border: 1px solid ${colors.genericBorder};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  @media (min-width: 480px) {
    width: calc(100% - 70px);
    margin: 1em 35px;
  }
`;
/* An invisible panel (no border or border-radius) that expands to the full width of its parent */
export const InvisibleFullWidthPanel = styled(FullWidthPanel)`
  border: 0;
  /* margin: 1em; */
  box-shadow: none;
  border-radius: none;
`;
InvisibleFullWidthPanel.displayName = 'InvisibleFullWidthPanel';

export const InvisibleFullWidthFlexContainer = styled.div`
  display: flex;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

InvisibleFullWidthFlexContainer.displayName = 'InvisibleFullWidthFlexContainer';

/* Rows */
/* A row of content (no padding) */
export const Row = styled.div`
  display: flex;
  width: 100%;
  /* background-color: ${colors.background}; */
`;
Row.displayName = 'Row';

/* A row of content with sensible padding */
export const PaddedRow = styled(Row)`
  padding: 2em 1em 1em 1em;
`;
PaddedRow.displayName = 'PaddedRow';

/* A row of content where child elements are evenly spaced */
export const SpacedRow = styled.div`
  justify-content: space-between;
`;
SpacedRow.displayName = 'SpacedRow';

/* A flexwrap row that flips to a column on smaller screens */
export const ResponsiveRow = styled(Row)`
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
ResponsiveRow.displayName = 'ResponsiveRow';

/* FORMS */
export const FieldsWrapper = styled(Col)`
  background-color: ${colors.gentleAccent};
  border-radius: 4px;
  margin-left: 15px;
`;
FieldsWrapper.displayName = 'FieldsWrapper';

export const ButtonsContainer = styled.div`
  margin-left: 1em;
  margin-top: 1em;
  @media (min-width: 480px) {
    margin-left: 0;
    width: 100%;
    text-align: right;
  }
`;
ButtonsContainer.displayName = 'ButtonsContainer';

export const LeftButton = styled(Button)`
  width: calc(100% - 30px);
  margin: 1em auto 0 auto;
  @media (min-width: 798px) {
    width: initial;
    margin: 0 0 0 1em;
  }
`;
export const RightButton = styled(LeftButton)`
  @media (min-width: 798px) {
    margin: 0 0 0 1.75em;
  }
`;

export const ErrorMessage = styled.div`
  margin-left: 18px;
  font-weight: 300;
  font-size: 16px;
  font-style: italic;
  color: ${colors.error};
`;
ErrorMessage.displayName = 'ErrorMessage';

/* TABLES */

export const FilterIcon = styled(Glyphicon)`
  float: right;
  color: ${({ direction }) => (!!direction ? 'inherit' : colors.contrast)};
`;
FilterIcon.displayName = 'FilterIcon';

export const StyledTabs = styled(Tabs)`
  .nav-tabs > li > a {
    transition: all 0.0001s ease-out;
    transition-duration: 0.2s;
    border-left-color: #e3e3e3;
    padding: 10px;
    font-size: 12px;
    background-color: #f7f7f7;
    color: black;
    height: 40px;
    width: 160px;
    border-bottom-color: black;
    border-radius: 0;
    text-align: center;
  }
  .nav-tabs {
    padding-left: 20px;
  }
  .nav-tabs > li.active > a {
    transition: all 0.0001s ease-out;
    transition-duration: 0.2s;
    border-left-color: black;
    border-right-color: black;
    border-top-width: 5px;
    border-top-color: ${({ color }) => color};
    padding: 10px 40px 10px 40px;
    font-size: 12px;
    font-weight: 500
    // background-color: #e6e6e6;
    background-color:#ffffff;
    color: black;
    height: 40px;
    width: 170px;
    border-bottom-color: #e6e6e6;
    border-radius: 0;
  }
`;
StyledTabs.displayName = 'StyledTabs';

// export const TableWrapper = styled.div`
//   box-sizing: border-box;
//   background: ${colors.backgroundAlt};
//   border: ${({ editing, deleting }) =>
//     editing || deleting ? '3px solid #F5A623' : 'none'};
//   height: 627px;
//   width: 100%;
//   .selected-row {
//     color: #fff;
//   }
// `;
// TableWrapper.displayName = 'TableWrapper';

// export const PaginationCounter = styled.h4`
//   height: 15px;
//   color: #000000;
//   font-family: "HelveticaNeue";
//   font-size: 14px;
//   font-style: italic;
//   font-weight: 300;
//   line-height: 15px;
//   padding-right: 10px;
// `;
// PaginationCounter.displayName = 'PaginationCounter';

// export const PaginationWrapper = styled.div`
//   margin: 0;
//   float: right;
//   display: flex;
//   align-items: 'center';
// `;
// PaginationWrapper.displayName = 'PaginationWrapper';
