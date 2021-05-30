import React from 'react';
import { render } from '@testing-library/react';
import FormGroup from '.';

describe('Form Group element', () => {
  it('should render component', () => {
    const formGroup = render(<FormGroup />);
    expect(formGroup).toMatchSnapshot();
  });
});
