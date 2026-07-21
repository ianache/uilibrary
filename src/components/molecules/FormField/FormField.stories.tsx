import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    helperText: 'We will never share your email.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@example.com',
    errorMessage: 'Please enter a valid email address.',
  },
};
