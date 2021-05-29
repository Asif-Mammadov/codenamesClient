import React from 'react';
import { render } from '@testing-library/react';
import MobileMenu from '.';

describe('MobileMenu module', () => {
  it('should render component', () => {
    const mobileMenu = render(<MobileMenu />);
    expect(mobileMenu).toMatchSnapshot();
  });
});
