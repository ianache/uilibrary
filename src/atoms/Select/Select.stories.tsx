import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const sampleOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia', disabled: true },
  { value: 'de', label: 'Germany' },
];

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select a country...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: sampleOptions,
    placeholder: 'Choose your country',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Country of Residence',
    options: sampleOptions,
    placeholder: 'Choose your country',
    hint: 'Used to determine tax jurisdiction',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: sampleOptions,
    placeholder: 'Choose your country',
    error: 'Please select a valid country',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: sampleOptions,
    defaultValue: 'us',
    disabled: true,
  },
};
