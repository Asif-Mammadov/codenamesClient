import React from 'react';
import { render } from '@testing-library/react';
import Toggler from '.';

describe('Toggler element', () => {
  it('should render component', () => {
    const toggler = render(<Toggler />);
    expect(toggler).toMatchSnapshot();
  });
});
