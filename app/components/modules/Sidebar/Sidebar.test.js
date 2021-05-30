import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from '.';

describe('Sidebar module', () => {
  it('should render component', () => {
    const sidebar = render(<Sidebar />);
    expect(sidebar).toMatchSnapshot();
  });
});
