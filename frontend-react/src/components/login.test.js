import { render, screen } from '@testing-library/react';
import Login from './login.js';

test('renders learn react link', () => {
    render(<Login />);
    const linkElement = screen.getByText('Submit');
    expect(linkElement).toBeInTheDocument();
  });
test('renders learn react link', () => {
    render(<Login />);
    const linkElement2 = screen.getByText('Login');
    expect(linkElement2).toBeInTheDocument();
  });
