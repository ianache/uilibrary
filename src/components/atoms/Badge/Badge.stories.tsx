import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'info', 'danger'],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: {
    label: 'Active',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: 'Pending',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    label: 'New',
    variant: 'info',
  },
};

export const Danger: Story = {
  args: {
    label: 'Error',
    variant: 'danger',
  },
};
