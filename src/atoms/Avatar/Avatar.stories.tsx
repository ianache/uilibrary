import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    src: { control: 'text' },
    initials: { control: 'text' },
    alt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const DefaultInitials: Story = {
  args: {
    initials: 'JD',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    alt: 'John Doe',
    size: 'md',
  },
};

export const ExtraSmall: Story = {
  args: {
    initials: 'XS',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    initials: 'SM',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    initials: 'MD',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    initials: 'LG',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    initials: 'XL',
    size: 'xl',
  },
};
