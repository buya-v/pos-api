import { render, screen } from '@testing-library/react';
import { FiscalStatusHeader } from '../FiscalStatusHeader';
import { describe, it, expect } from 'vitest';

describe('FiscalStatusHeader', () => {
  it('renders online status correctly', () => {
    render(<FiscalStatusHeader status="connected" />);
    expect(screen.getByText(/Online & Signed/i)).toBeInTheDocument();
  });

  it('renders disconnected status correctly', () => {
    render(<FiscalStatusHeader status="disconnected" />);
    expect(screen.getByText(/Fiscal Device Disconnected/i)).toBeInTheDocument();
  });

  it('renders warning/default status correctly', () => {
    render(<FiscalStatusHeader status="warning" />);
    expect(screen.getByText(/Connecting/i)).toBeInTheDocument();
  });
});