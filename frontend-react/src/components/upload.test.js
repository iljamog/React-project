import { render, screen } from '@testing-library/react';
import Upload from './upload.js';

test('renders learn react link', () => {
    render(<Upload />);
    const linkElement = screen.getByText('Album name');
    expect(linkElement).toBeInTheDocument();
});
test('renders learn react link', () => {
    render(<Upload />);
    const linkElement2 = screen.getByText('Upload');
    expect(linkElement2).toBeInTheDocument();
});
test('renders learn react link', () => {
  render(<Upload />);
  const linkElement3 = screen.getByText('Choose file(s) for upload');
  expect(linkElement3).toBeInTheDocument();
});
