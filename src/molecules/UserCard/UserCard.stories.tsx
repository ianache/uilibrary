import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from './UserCard';

const meta: Meta<typeof UserCard> = {
  title: 'Molecules/UserCard',
  component: UserCard,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
    },
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    name: 'Carlos Mendoza',
    role: 'Desarrollador Frontend',
    email: 'carlos.mendoza@example.com',
  },
};

export const WithAvatarImage: Story = {
  args: {
    name: 'Ana García',
    role: 'Diseñadora UX/UI',
    email: 'ana.garcia@example.com',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'online',
  },
};

export const WithStatus: Story = {
  args: {
    name: 'Roberto Gómez',
    role: 'Tech Lead',
    status: 'busy',
  },
};

export const Selected: Story = {
  args: {
    name: 'Laura Martínez',
    role: 'Product Owner',
    email: 'laura.martinez@example.com',
    selected: true,
    status: 'away',
  },
};

export const Small: Story = {
  args: {
    name: 'Diego Torres',
    role: 'QA Engineer',
    size: 'sm',
    status: 'online',
  },
};

export const Large: Story = {
  args: {
    name: 'Sofía López',
    role: 'Engineering Manager',
    email: 'sofia.lopez@example.com',
    size: 'lg',
    status: 'offline',
  },
};
