import React from 'react';
import ReactDOM from 'react-dom';
import Generator from './Generator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Generator />, div);
  ReactDOM.unmountComponentAtNode(div);
});
