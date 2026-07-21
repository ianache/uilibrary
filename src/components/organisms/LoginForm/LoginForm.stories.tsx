import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    isSubmitting: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    title: 'Sign In to Account',
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    title: 'Sign In to Account',
    isSubmitting: true,
  },
};
