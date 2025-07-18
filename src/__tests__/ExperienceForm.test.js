import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceForm from '../components/forms/ExperienceForm';

describe('ExperienceForm', () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();

  it('renders all main input fields', () => {
    render(<ExperienceForm onSubmit={onSubmit} onCancel={onCancel} showCancel={true} />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job description/i)).toBeInTheDocument();
  });

  it('calls onSubmit when Add Experience is clicked with required fields', () => {
    render(<ExperienceForm onSubmit={onSubmit} onCancel={onCancel} showCancel={true} />);
    fireEvent.change(screen.getByLabelText(/company name/i), { target: { value: 'TestCorp' } });
    fireEvent.change(screen.getByLabelText(/position/i), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2020-01-01' } });
    fireEvent.click(screen.getByText(/add experience/i));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onCancel when Cancel is clicked', () => {
    render(<ExperienceForm onSubmit={onSubmit} onCancel={onCancel} showCancel={true} />);
    fireEvent.click(screen.getByText(/cancel/i));
    expect(onCancel).toHaveBeenCalled();
  });
}); 