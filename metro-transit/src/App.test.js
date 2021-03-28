import { render, screen } from '@testing-library/react';
import App from './App';
import {Routes} from './Components/Routes';

test('renders Real-time Departures heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Real-time Departures/i);
  expect(linkElement).toBeInTheDocument();
});

