import type { Meta, StoryObj } from '@storybook/react';
import { UsersPage } from './UsersPage';

const meta: Meta<typeof UsersPage> = {
  title: 'Pages/UsersPage',
  component: UsersPage,
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
type Story = StoryObj<typeof UsersPage>;

export const Default: Story = {
  render: () => <UsersPage />,
};
