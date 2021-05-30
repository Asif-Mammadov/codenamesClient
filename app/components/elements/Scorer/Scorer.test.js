import React from 'react';
import { render } from '@testing-library/react';
import Scorer from '.';

describe('Scorer element', () => {
  it('should render component', () => {
    const scorer = render(<Scorer />);
    expect(scorer).toMatchSnapshot();
  });
});
