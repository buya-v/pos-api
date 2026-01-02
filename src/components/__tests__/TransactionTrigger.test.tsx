import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TransactionTrigger } from '../TransactionTrigger';
import { useAuthStore } from '../../store/authStore';
import { useTransactionStore } from '../../store/transactionStore';

// Mock stores
vi.mock('../../store/authStore');
vi.mock('../../store/transactionStore');

describe('TransactionTrigger', () => {
  const mockInitTransaction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTransactionStore as any).mockReturnValue({
      initTransaction: mockInitTransaction,
      isLoading: false,
    });
  });

  it('renders correctly', () => {
    (useAuthStore as any).mockReturnValue({ token: 'valid-token' });
    render(<TransactionTrigger />);
    expect(screen.getByText('New Transaction')).toBeInTheDocument();
  });

  it('is disabled when no token is present', () => {
    (useAuthStore as any).mockReturnValue({ token: null });
    render(<TransactionTrigger />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(mockInitTransaction).not.toHaveBeenCalled();
  });

  it('calls initTransaction when clicked and authenticated', () => {
    (useAuthStore as any).mockReturnValue({ token: 'valid-token' });
    render(<TransactionTrigger />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockInitTransaction).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    (useAuthStore as any).mockReturnValue({ token: 'valid-token' });
    (useTransactionStore as any).mockReturnValue({
      initTransaction: mockInitTransaction,
      isLoading: true,
    });
    
    render(<TransactionTrigger />);
    expect(screen.getByText('Initializing...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});