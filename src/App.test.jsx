import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hierarchical Table heading', () => {
  render(<App />);
  const heading = screen.getByText(/Hierarchical Table/i);
  expect(heading).toBeInTheDocument();
});
