import { render, screen, fireEvent } from '@testing-library/react';
import { LogSearch } from '../diagnostics/LogSearch';
import { vi } from 'vitest';

// Mock Zustand store
const mockLogs = [
  {
    correlationId: 'req-123',
    status: 500,
    title: 'Test Error',
    type: 'error',
    detail: 'detail',
    instance: 'instance',
    timestamp: 'now'
  }
];

vi.mock('../../store/fiscalStore', () => ({
  useFiscalStore: () => ({
    logs: mockLogs
  })
}));

describe('LogSearch', () => {
  it('renders input and button', () => {
    render(<LogSearch />);
    expect(screen.getByPlaceholderText(/Enter X-Correlation-ID/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Trace/i })).toBeInTheDocument();
  });

  it('allows typing in search box', async () => {
    render(<LogSearch />);
    const input = screen.getByPlaceholderText(/Enter X-Correlation-ID/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'req-123' } });
    expect(input.value).toBe('req-123');
  });

  it('shows log details when search matches', () => {
    render(<LogSearch />);
    const input = screen.getByPlaceholderText(/Enter X-Correlation-ID/i);
    const button = screen.getByRole('button', { name: /Trace/i });

    fireEvent.change(input, { target: { value: 'req-123' } });
    fireEvent.click(button);

    expect(screen.getByText(/Exception Caught/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Error/i)).toBeInTheDocument();
  });
});