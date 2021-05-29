import React from 'react';
import { render } from '@testing-library/react';
import TopScorer from '.';

describe('Top Scorer element', () => {
  it('should render component', () => {
    const topScorer = render(<TopScorer />);
    expect(topScorer).toMatchSnapshot();
  });
});
