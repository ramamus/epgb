import React from 'react';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

const FontAwesomeWrapper = styled(FontAwesome)`
  name: ${({ iconName }) => iconName};
  color: ${({ color }) => color};
  font-size: ${({ iconSize }) => iconSize};
  padding: 1em 0 0 0.5em;
`;
FontAwesomeWrapper.displayName = 'FontAwesomeWrapper';

class VerticalToggle extends React.Component {
  state = {
    show: false
  };

  openMenu = e => {
    e.preventDefault();
    this.setState({ target: e.target, show: !this.state.show });
    this.props.onClick(e);
  };
  render() {
    const { iconName, iconSize, color, text, textSize, style } = this.props;
    return (
      <div>
        <a href="" onClick={this.openMenu}>
          {text && <span style={{ fontSize: textSize, color }}>{text}</span>}
          <FontAwesomeWrapper
            name={iconName}
            color={color}
            fontSize={iconSize}
            style={style}
          >
            {this.props.children}
          </FontAwesomeWrapper>
        </a>
      </div>
    );
  }
}

export default VerticalToggle;
