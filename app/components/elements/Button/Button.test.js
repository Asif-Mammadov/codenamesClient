import React from 'react';
import { render } from '@testing-library/react';
import Button from '.';

describe('Button element', () => {
  it('should render component', () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });
});
