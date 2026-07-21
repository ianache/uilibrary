import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive monthly updates on new features and product releases.',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    description: 'Some items in the table are selected',
    indeterminate: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the Terms of Service',
    error: 'You must accept the terms of service to continue.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    description: 'This setting is managed by your administrator.',
    disabled: true,
    defaultChecked: true,
  },
};
