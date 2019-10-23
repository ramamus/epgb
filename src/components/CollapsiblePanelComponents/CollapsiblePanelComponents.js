import React from 'react';
import { Button, Panel } from 'react-bootstrap';
import './CollapsiblePanelComponents.css';

export const PanelHeader = ({ background, children }) => (
  <div style={{ background: background }} className="panel-header">
    {children}
  </div>
);

export const ExpandButton = ({ color, background, children, onClick }) => (
  <Button
    style={{ color: color, background: background }}
    className="expand-button collapsible-button"
    onClick={onClick}
  >
    {children}
  </Button>
);

export const Header = ({ color, onClick, children }) => (
  <div style={{ color: color }} className="header-link" onClick={onClick}>
    {children}
  </div>
);

export const HeaderColor = ({ isExpanded, panelColor }) =>
  !isExpanded && (
    <div style={{ backgroundColor: panelColor }} className="header-color" />
  );

export const ExpandedPanel = ({ expanded, children }) => (
  <Panel id="collapsible-panel" className="expanded-panel" expanded={expanded}>
    {children}
  </Panel>
);
