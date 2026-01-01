import { render, screen } from '@testing-library/react';
import { HealthBadge } from '../dashboard/HealthBadge';
import { HealthCheck } from '../../types';

describe('HealthBadge', () => {
  const mockHealth: HealthCheck = {
    service: 'API_GATEWAY',
    status: 'operational',
    latencyMs: 50,
    lastChecked: '2023-01-01T00:00:00Z',
  };

  it('renders service name correctly', () => {
    render(<HealthBadge health={mockHealth} />);
    expect(screen.getByText('API GATEWAY')).toBeInTheDocument();
  });

  it('displays healthy status correctly', () => {
    render(<HealthBadge health={mockHealth} />);
    expect(screen.getByText('Healthy')).toBeInTheDocument();
  });

  it('shows latency', () => {
    render(<HealthBadge health={mockHealth} />);
    expect(screen.getByText('50ms')).toBeInTheDocument();
  });

  it('renders different status style for down', () => {
    const downHealth = { ...mockHealth, status: 'down' as const };
    render(<HealthBadge health={downHealth} />);
    expect(screen.getByText('down')).toBeInTheDocument();
  });
});