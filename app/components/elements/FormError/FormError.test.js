import React from 'react';
import { render } from '@testing-library/react';
import FormError from '.';

describe('Form Error element', () => {
  it('should render component', () => {
    const formError = render(<FormError />);
    expect(formError).toMatchSnapshot();
  });
});
