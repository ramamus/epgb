import React from 'react';
import ReactDOM from 'react-dom';

class VerticalMenu extends React.Component {
  state = {
    value: ''
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;
    return (
      <ul className="dropdown-menu" style={{ backgroundColor: '#F3F3F3' }}>
        {React.Children.toArray(children).filter(
          child => !value.trim() || child.props.children.indexOf(value) !== -1
        )}
      </ul>
    );
  }
}

export default VerticalMenu;
