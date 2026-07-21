import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    removable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onRemove: { action: 'removed' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Default Tag',
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Tag',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Tag',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Tag',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Tag',
    variant: 'danger',
  },
};

export const Removable: Story = {
  args: {
    children: 'Removable Tag',
    removable: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Tag',
    disabled: true,
    removable: true,
  },
};
