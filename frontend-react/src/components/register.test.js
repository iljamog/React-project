import { render, screen } from '@testing-library/react';
import Register from './register.js';

test('renders learn react link', () => {
    render(<Register />);
    const linkElement = screen.getByText('Submit');
    expect(linkElement).toBeInTheDocument();
  });
test('renders learn react link', () => {
    render(<Register />);
    const linkElement2 = screen.getByText('Register');
    expect(linkElement2).toBeInTheDocument();
  });
