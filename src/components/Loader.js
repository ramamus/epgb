import React from 'react';
import styled from 'styled-components';

import { FadingCircle } from 'better-react-spinkit';

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
`;

/**
 * Renders a spinner until all specified props are present, then renders children
 * using render props pattern
 *
 * @example wait for categories and transitions to load before rendering child table:
 *          <Loader dependencies=['categories', 'transitions']
 *                  categories={this.props.categories}
 *                  transitions={this.props.transitions} >
 *               ({categories, transitions}) => (
 *                  <Table categories={categories} transition={transitions} />
 *               ))
 *          </Loader>
 *
 * @param dependencies {string[]} - list of props to wait for
 *
 * @returns {function}  - returns either a spinner or the child content
 *
 */
class Loader extends React.Component {
  validProp = prop => {
    switch (typeof prop) {
      case 'string':
        return prop !== undefined && prop !== null;
      case 'number':
        return prop !== undefined && prop !== null;
      default:
        return prop && Object.keys(prop).length;
    }
  };
  render() {
    const { dependencies, children, ...rest } = this.props;
    for (let i = 0; i < dependencies.length; i++) {
      const dependency = dependencies[i];
      if (!this.props.hasOwnProperty(dependency)) {
        console.warn(
          'You used a Loader but did not pass all dependencies. This Loader will display a spinner for all eternity. Probably you did not intend this. Make sure that for each prop in your dependencies array you also pass the prop itself into the Loader.'
        );
      }
      if (!this.validProp(this.props[dependency])) {
        return (
          <SpinWrapper>
            <FadingCircle />
          </SpinWrapper>
        );
      }
    }
    return this.props.children(rest);
  }
}

export default Loader;
