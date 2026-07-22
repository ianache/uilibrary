import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from './LoginPage';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  render: () => <LoginPage />,
};
