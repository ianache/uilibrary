import type { Meta, StoryObj } from '@storybook/react';
import { DashboardPage } from './DashboardPage';

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-muted)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
  render: () => <DashboardPage />,
};
