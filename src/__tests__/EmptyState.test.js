import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '../components/layout/EmptyState';

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState onAddExperience={() => {}} />);
    expect(screen.getByText(/no experience added yet/i)).toBeInTheDocument();
    expect(screen.getByText(/start building your professional timeline/i)).toBeInTheDocument();
  });

  it('calls onAddExperience when button is clicked', () => {
    const onAddExperience = jest.fn();
    render(<EmptyState onAddExperience={onAddExperience} />);
    fireEvent.click(screen.getByRole('button', { name: /add your first experience/i }));
    expect(onAddExperience).toHaveBeenCalled();
  });
}); 