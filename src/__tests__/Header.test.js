import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/layout/Header';

describe('Header', () => {
  it('renders the main title', () => {
    render(<Header />);
    expect(screen.getByText(/work experience tracker/i)).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Header />);
    expect(screen.getByText(/track and showcase/i)).toBeInTheDocument();
  });

  it('renders the briefcase icon', () => {
    render(<Header />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
}); 