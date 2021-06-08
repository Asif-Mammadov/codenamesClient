import React from 'react';
import { render } from '@testing-library/react';
import Drawer from '.';

describe('Drawer module', () => {
  it('should render component', () => {
    const drawer = render(<Drawer />);
    expect(drawer).toMatchSnapshot();
  });
});
