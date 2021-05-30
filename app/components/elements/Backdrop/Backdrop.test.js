import React from 'react';
import { render } from '@testing-library/react';
import Backdrop from '.';

describe('Backdrop element', () => {
  it('should render component', () => {
    const backdrop = render(<Backdrop />);
    expect(backdrop).toMatchSnapshot();
  });
});
