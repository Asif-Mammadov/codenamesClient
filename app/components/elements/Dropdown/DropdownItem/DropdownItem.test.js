import React from 'react';
import { render } from '@testing-library/react';
import DropdownItem from '.';

describe('Dropdown Item element', () => {
  it('should render component', () => {
    const dropdownItem = render(<DropdownItem />);
    expect(dropdownItem).toMatchSnapshot();
  });
});
