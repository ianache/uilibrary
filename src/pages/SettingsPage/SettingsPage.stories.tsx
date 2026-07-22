import type { Meta, StoryObj } from '@storybook/react';
import { SettingsPage } from './SettingsPage';

const meta: Meta<typeof SettingsPage> = {
  title: 'Pages/SettingsPage',
  component: SettingsPage,
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
type Story = StoryObj<typeof SettingsPage>;

export const Default: Story = {
  render: () => <SettingsPage />,
};
