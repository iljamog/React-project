import { render, screen } from '@testing-library/react';
import AboutAuthorPage from './about.js';

test('renders learn react link', () => {
    render(<AboutAuthorPage />);
    const linkElement = screen.getByText('About author page');
    expect(linkElement).toBeInTheDocument();
});
test('renders learn react link', () => {
    render(<AboutAuthorPage />);
    const linkElement2 = screen.getByText('My early life');
    expect(linkElement2).toBeInTheDocument();
});
test('renders learn react link', () => {
    render(<AboutAuthorPage />);
    const linkElement2 = screen.getByText('My later days');
    expect(linkElement2).toBeInTheDocument();
});
