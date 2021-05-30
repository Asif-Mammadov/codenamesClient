import React from 'react';
import { render } from '@testing-library/react';
import Icon from '.';

describe('Icon element', () => {
  it('should render component', () => {
    const icon = render(<Icon />);
    expect(icon).toMatchSnapshot();
  });
});
