import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    error: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    title: 'Iniciar sesión',
    subtitle: 'Bienvenido de nuevo. Ingrese sus credenciales para continuar.',
    onSubmit: (data) => console.log('Submit login:', data),
    onForgotPassword: () => alert('Recuperación de contraseña solicitada'),
    onRegister: () => alert('Ir a formulario de registro'),
  },
};

export const WithSocialProviders: Story = {
  args: {
    title: 'Iniciar sesión',
    subtitle: 'Accede a tu cuenta de usuario o con tus redes sociales.',
    socialProviders: ['google', 'github', 'microsoft'],
    onSocialLogin: (provider) => alert(`Iniciar sesión con ${provider}`),
    onSubmit: (data) => console.log('Submit login:', data),
    onForgotPassword: () => alert('Recuperación de contraseña solicitada'),
    onRegister: () => alert('Ir a formulario de registro'),
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Iniciando sesión...',
    loading: true,
    onSubmit: (data) => console.log('Submit login:', data),
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Iniciar sesión',
    error: 'Credenciales inválidas. Por favor verifique su correo y contraseña.',
    onSubmit: (data) => console.log('Submit login:', data),
  },
};
