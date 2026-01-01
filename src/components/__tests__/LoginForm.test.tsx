import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { useAuthStore } from '../../store/authStore';

// Mock the store
vi.mock('../../store/authStore', async () => {
  const actual = await vi.importActual('../../store/authStore');
  return {
    ...actual,
    useAuthStore: vi.fn(),
  };
});

describe('LoginForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      failedAttempts: 0,
      resetError: vi.fn(),
    });
  });

  it('renders correctly', () => {
    render(<LoginForm />);
    expect(screen.getByText('POS-API Portal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password');
    });
  });

  it('displays error message when error exists', () => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: { code: 'ERR_TEST', message: 'Test Error' },
      failedAttempts: 1,
    });

    render(<LoginForm />);
    expect(screen.getByText('ERR_TEST')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });
});