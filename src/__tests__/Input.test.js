import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/common/Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Name" name="name" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<Input label="Email" name="email" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with an icon if provided', () => {
    const Icon = () => <svg data-testid="icon" />;
    render(<Input label="WithIcon" name="icon" value="" onChange={() => {}} icon={Icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders as disabled', () => {
    render(<Input label="Disabled" name="disabled" value="" onChange={() => {}} disabled />);
    expect(screen.getByLabelText(/disabled/i)).toBeDisabled();
  });
}); 