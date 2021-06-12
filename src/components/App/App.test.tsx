import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('<App/>', () => {
  it('The app should render without crush', () => {
    render(<App />);
    expect(screen.getByRole('heading').textContent).toMatchInlineSnapshot(
      `"Coding Test"`,
    );
  });
});
