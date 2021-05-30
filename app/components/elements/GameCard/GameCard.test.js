import React from 'react';
import { render } from '@testing-library/react';
import GameCard from '.';

describe('Game Card element', () => {
  it('should render component', () => {
    const gameCard = render(<GameCard />);
    expect(gameCard).toMatchSnapshot();
  });
});
