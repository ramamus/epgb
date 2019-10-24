import styled from 'styled-components';
import { Button, Col, Panel } from 'react-bootstrap';
import colors from '../../util/colors';

const greyBackgroundColor = 'rgba(227, 227, 227, 0.5)';

export const Content = styled.div`
  margin: auto 16px auto 16px;
`;
Content.displayName = 'Content';

export const MainBody = styled.div`
  margin: auto 15px auto 15px;
  background-color: white;
`;
MainBody.displayName = 'MainBody';

export const FilterColumn = styled(Col)`
  padding-top: 16px;
`;
FilterColumn.displayName = 'FilterColumn';

export const ExpandCollapsePanel = styled.div`
  float: right;
  margin-right: 5px;
`;
ExpandCollapsePanel.displayName = 'ExpandCollapsePanel';

export const PanelHeader = styled.div`
  height: 55px;
  transition: all 0.0001s ease-out;
  transition-duration: 0.4s;
  transition-timing-function: ease-in;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  // justify-content: space-evenly;
`;
export const ExpandButton = styled(Button)`
  height: 60px;
  font-size: 20px;
  border: none;
  box-shadow: none;
  padding-bottom: 65px;
  border-radius: 0;
`;

export const PageTitle = styled.h1`
  margin: 30px 0 20px 0;
`;
PageTitle.displayName = 'PageTitle';

export const HeaderHr = styled.hr`
  height: 6px;
  background-color: red;
  margin: 0px;
`;
HeaderHr.displayName = 'HeaderHr';

export const AddProjectButton = styled(Button)`
  float: right;
  margin: 20px 20px 0px 0px;
`;
AddProjectButton.displayName = 'AddProjectButton';

export const Header = styled.div`
  height: 22px;
  width: 70%;
  font-family: ${colors.font};
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding-left: 20px;
  margin-top: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
Header.displayName = 'Header';

export const HeaderColor = styled.div`
  height: 4px;
`;
HeaderColor.displayName = 'HeaderColor';

export const ExpandedPanel = styled(Panel)`
  background-color: ${greyBackgroundColor};
`;
ExpandedPanel.displayName = 'ExpandedPanel';

//Category Card

export const AttributeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: #626262;
  font-family: ${colors.font};
  font-weight: 300;
`;
AttributeWrapper.displayName = 'AttributeWrapper';

export const AttributeLabel = styled.div`
  display: flex;
  height: 20px;
  width: 210px;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
AttributeLabel.displayName = 'AttributeLabel';

export const AttributeValue = styled.div`
  display: flex;
  height: 20px;
  width: 217px;
  justify-content: flex-start;
  padding-left: 20px;
  color: #000000;
  font-family: ${colors.font};
  font-weight: 500;
`;
AttributeValue.displayName = 'AttributeValue';

export const StyledAnchorTag = styled.a`
 font-family:'${colors.fontFamily}';
 `;
StyledAnchorTag.displayName = 'StyledAnchorTag';


