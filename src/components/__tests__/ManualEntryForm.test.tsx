import { render, screen, fireEvent } from '@testing-library/react';
import { ManualEntryForm } from '../ManualEntryForm';
import { describe, it, expect, vi } from 'vitest';

// Mock Zustand
vi.mock('../../store/useStore', () => ({
  useStore: () => ({
    addLog: vi.fn(),
    setGlobalError: vi.fn(),
  })
}));

describe('ManualEntryForm', () => {
  it('renders input and button', () => {
    render(<ManualEntryForm />);
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('button is disabled when input is empty', () => {
    render(<ManualEntryForm />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('enables button when amount is entered', () => {
    render(<ManualEntryForm />);
    const input = screen.getByPlaceholderText('0.00');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '10.50' } });
    expect(button).not.toBeDisabled();
  });
});