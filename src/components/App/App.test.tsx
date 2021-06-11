import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('<App/>', () => {
  it('should render title in header', () => {
    render(<App />);
    expect(screen.getByRole('heading').textContent).toMatchInlineSnapshot(
      `"Coding Test"`,
    );
  });
});
