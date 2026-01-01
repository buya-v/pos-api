import React from 'react';
import { clsx } from 'clsx';
import { TransactionStatus } from '../../types';

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const styles = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
  };

  const labels = {
    success: 'Fiscalized',
    warning: 'Pending',
    danger: 'Failed',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
};