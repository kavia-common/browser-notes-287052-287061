import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Notes header and form controls', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByText(/Notes/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Note title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Note content/i)).toBeInTheDocument();
});
