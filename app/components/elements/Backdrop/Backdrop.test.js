import Backdrop from '.';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const BackdropComponent = renderer.create(<Backdrop />).toJSON();
  expect(BackdropComponent).toMatchSnapshot();
});
