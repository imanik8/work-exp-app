import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResumeSectionsForm from '../components/forms/ResumeSectionsForm';

const renderForm = (overrides = {}) => {
  const onChange = jest.fn();
  render(<ResumeSectionsForm education={[]} certifications={[]} projects={[]} onChange={onChange} {...overrides} />);
  return onChange;
};

test('renders all resume section editors', () => {
  renderForm();
  expect(screen.getByText('Education')).toBeInTheDocument();
  expect(screen.getByText('Certifications')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
});

test('adds an education item', async () => {
  const user = userEvent.setup();
  const onChange = renderForm();
  await user.click(screen.getByRole('button', { name: /add education/i }));
  expect(onChange).toHaveBeenCalledWith('education', [expect.objectContaining({ degree: '' })]);
});

test('adds a certification item', async () => {
  const user = userEvent.setup();
  const onChange = renderForm();
  await user.click(screen.getByRole('button', { name: /add certification/i }));
  expect(onChange).toHaveBeenCalledWith('certifications', [expect.objectContaining({ name: '' })]);
});

test('adds a project item', async () => {
  const user = userEvent.setup();
  const onChange = renderForm();
  await user.click(screen.getByRole('button', { name: /add project/i }));
  expect(onChange).toHaveBeenCalledWith('projects', [expect.objectContaining({ name: '' })]);
});
