import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  argTypes: {
    headerTitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

export const Default: Story = {
  args: {
    headerTitle: 'Project Analytics Overview',
  },
};
