import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    striped: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 45,
  },
};

export const WithLabelAndValue: Story = {
  args: {
    value: 75,
    label: 'Cargando datos...',
    showValue: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <ProgressBar value={40} variant="default" label="Default" showValue />
      <ProgressBar value={60} variant="primary" label="Primary" showValue />
      <ProgressBar value={80} variant="success" label="Success" showValue />
      <ProgressBar value={50} variant="warning" label="Warning" showValue />
      <ProgressBar value={90} variant="danger" label="Danger" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <ProgressBar value={60} size="sm" label="Small (4px)" />
      <ProgressBar value={60} size="md" label="Medium (8px)" />
      <ProgressBar value={60} size="lg" label="Large (12px)" />
    </div>
  ),
};

export const StripedAndAnimated: Story = {
  args: {
    value: 65,
    variant: 'primary',
    striped: true,
    animated: true,
    label: 'Procesando archivo...',
    showValue: true,
  },
};
