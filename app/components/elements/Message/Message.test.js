import React from 'react';
import { render } from '@testing-library/react';
import Message from '.';

describe('Message element', () => {
  it('should render component', () => {
    const message = render(<Message />);
    expect(message).toMatchSnapshot();
  });
});
