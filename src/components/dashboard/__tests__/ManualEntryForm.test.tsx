import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ManualEntryForm } from '../ManualEntryForm';

// Mock the store
const mockAddTransaction = vi.fn();
vi.mock('../../store/useStore', () => ({
  useStore: () => ({
    currentMerchant: { id: 'test-merch' },
    addTransaction: mockAddTransaction,
  }),
}));

describe('ManualEntryForm', () => {
  it('renders input and button', () => {
    render(<ManualEntryForm />);
    expect(screen.getByLabelText(/Transaction Amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Fiscal Receipt/i })).toBeInTheDocument();
  });

  it('updates input value', () => {
    render(<ManualEntryForm />);
    const input = screen.getByLabelText(/Transaction Amount/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '100.50' } });
    expect(input.value).toBe('100.50');
  });
});