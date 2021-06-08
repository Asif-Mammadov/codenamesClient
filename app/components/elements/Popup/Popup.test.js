import React from 'react';
import { render } from '@testing-library/react';
import Popup from '.';

describe('Popup element', () => {
  it('should render component', () => {
    const popup = render(<Popup />);
    expect(popup).toMatchSnapshot();
  });
});
