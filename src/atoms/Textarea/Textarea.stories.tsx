import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    rows: { control: 'number' },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    maxLength: { control: 'number' },
    showCount: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Tell us what you think...',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Write a short description about yourself...',
    hint: 'Brief summary for your public profile',
  },
};

export const WithCharacterCounter: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Leave a comment...',
    maxLength: 100,
    showCount: true,
    defaultValue: 'This is a sample comment to demonstrate character count.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Description',
    defaultValue: 'Short text',
    error: 'Description must be at least 50 characters long.',
    hint: 'This hint should be replaced by error message',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};
