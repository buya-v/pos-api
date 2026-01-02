import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FiscalActionGroup } from '../FiscalActionGroup';

describe('FiscalActionGroup', () => {
  const mockSync = vi.fn();
  const mockRegister = vi.fn();
  const mockCancel = vi.fn();

  const defaultProps = {
    onSync: mockSync,
    onRegister: mockRegister,
    onCancel: mockCancel,
    isProcessing: false,
  };

  it('renders all action buttons', () => {
    render(<FiscalActionGroup {...defaultProps} />);
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Sync')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls correct handlers on click', () => {
    render(<FiscalActionGroup {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Register'));
    expect(mockRegister).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Sync'));
    expect(mockSync).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCancel).toHaveBeenCalled();
  });

  it('disables all buttons when processing', () => {
    render(<FiscalActionGroup {...defaultProps} isProcessing={true} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});