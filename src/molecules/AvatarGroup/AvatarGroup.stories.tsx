import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';

const mockUsers = [
  { id: '1', name: 'Ana García', avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: '2', name: 'Carlos Mendoza', avatarSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: '3', name: 'Laura Martínez' },
  { id: '4', name: 'Roberto Gómez', avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: '5', name: 'Sofía López' },
  { id: '6', name: 'Diego Torres' },
  { id: '7', name: 'Elena Rodríguez' },
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    max: { control: 'number' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  args: {
    users: mockUsers,
    max: 4,
    size: 'sm',
  },
};

export const SmallSize: Story = {
  args: {
    users: mockUsers,
    max: 3,
    size: 'xs',
  },
};

export const MediumSize: Story = {
  args: {
    users: mockUsers,
    max: 5,
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    users: mockUsers,
    max: 4,
    size: 'lg',
  },
};

export const AllVisible: Story = {
  args: {
    users: mockUsers.slice(0, 3),
    max: 5,
    size: 'md',
  },
};

export const Interactive: Story = {
  args: {
    users: mockUsers,
    max: 4,
    size: 'md',
    onClick: () => alert('AvatarGroup clicked'),
  },
};
