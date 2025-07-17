import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceCard from '../components/cards/ExperienceCard';

describe('ExperienceCard', () => {
  const experience = {
    id: '1',
    company: 'TestCorp',
    companyLogo: '',
    position: 'Developer',
    location: 'Remote',
    startDate: '2020-01-01',
    endDate: '2021-01-01',
    current: false,
    description: 'Did stuff',
    achievements: ['Achievement 1', 'Achievement 2'],
  };

  it('renders company and position', () => {
    render(<ExperienceCard experience={experience} onRemove={() => {}} index={0} />);
    expect(screen.getByText('TestCorp')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('renders achievements', () => {
    render(<ExperienceCard experience={experience} onRemove={() => {}} index={0} />);
    expect(screen.getByText('Achievement 1')).toBeInTheDocument();
    expect(screen.getByText('Achievement 2')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<ExperienceCard experience={experience} onRemove={onRemove} index={0} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onRemove).toHaveBeenCalledWith('1');
  });
}); 