import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryCard from '../components/cards/SummaryCard';

describe('SummaryCard', () => {
  const experiences = [
    {
      id: '1',
      company: 'TestCorp',
      companyLogo: '',
      position: 'Developer',
      location: 'Remote',
      startDate: '2020-01-01',
      endDate: '2021-01-01',
      current: false,
      description: 'Did stuff',
      achievements: [],
    },
    {
      id: '2',
      company: 'AnotherCorp',
      companyLogo: '',
      position: 'Engineer',
      location: 'Remote',
      startDate: '2021-02-01',
      endDate: '2022-01-01',
      current: false,
      description: 'Did more stuff',
      achievements: [],
    },
  ];

  it('renders total experience and companies worked', () => {
    render(<SummaryCard experiences={experiences} />);
    expect(screen.getByText(/total experience/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // companies worked
  });

  it('renders nothing if no experiences', () => {
    const { container } = render(<SummaryCard experiences={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
}); 