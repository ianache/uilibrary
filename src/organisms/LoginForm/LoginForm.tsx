import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Checkbox } from '../../atoms/Checkbox';
import { Icon } from '../../atoms/Icon';
import { Divider } from '../../atoms/Divider';
import { Typography } from '../../atoms/Typography';
import { FormField } from '../../molecules/FormField';
import { Notification } from '../../molecules/Notification';
import styles from './LoginForm.module.css';

export type SocialProvider = 'google' | 'github' | 'microsoft';

export interface LoginFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: { email: string; password: string; remember: boolean }) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  loading?: boolean;
  error?: string;
  socialProviders?: SocialProvider[];
  onSocialLogin?: (provider: SocialProvider) => void;
  title?: string;
  subtitle?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const providerLabels: Record<SocialProvider, string> = {
  google: 'Google',
  github: 'GitHub',
  microsoft: 'Microsoft',
};

export const LoginForm = forwardRef<HTMLFormElement, LoginFormProps>(({
  onSubmit,
  onForgotPassword,
  onRegister,
  loading = false,
  error,
  socialProviders,
  onSocialLogin,
  title = 'Iniciar sesión',
  subtitle,
  className,
  style,
  ...restProps
}, ref) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ email: email.trim(), password, remember });
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={clsx(styles.loginForm, className)}
      style={{ margin: 0, ...style }}
      noValidate
      {...restProps}
    >
      <div className={styles.header}>
        {title && (
          <Typography variant="h2" className={styles.title}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="body-sm" className={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </div>

      {error && (
        <Notification
          variant="error"
          message={error}
          className={styles.globalError}
        />
      )}

      {socialProviders && socialProviders.length > 0 && (
        <>
          <div className={styles.socialGrid}>
            {socialProviders.map((provider) => (
              <Button
                key={provider}
                type="button"
                variant="secondary"
                disabled={loading}
                onClick={() => onSocialLogin?.(provider)}
                className={styles.socialButton}
              >
                <span>{providerLabels[provider]}</span>
              </Button>
            ))}
          </div>

          <Divider label="o continúa con" labelAlign="center" />
        </>
      )}

      <div className={styles.fields}>
        <FormField label="Correo electrónico" required error={errors.email}>
          <Input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            prefix={<Icon name="mail" size="sm" />}
            autoComplete="email"
          />
        </FormField>

        <FormField label="Contraseña" required error={errors.password}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            disabled={loading}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            prefix={<Icon name="lock" size="sm" />}
            suffix={
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                disabled={loading}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size="sm" />
              </button>
            }
            autoComplete="current-password"
          />
        </FormField>
      </div>

      <div className={styles.optionsRow}>
        <Checkbox
          label="Recordarme"
          checked={remember}
          disabled={loading}
          onChange={(e) => setRemember(e.target.checked)}
        />
        {onForgotPassword && (
          <button
            type="button"
            className={styles.forgotButton}
            onClick={onForgotPassword}
            disabled={loading}
          >
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
        className={styles.submitButton}
      >
        Iniciar sesión
      </Button>

      {onRegister && (
        <div className={styles.footerText}>
          <span>¿No tienes una cuenta? </span>
          <button
            type="button"
            className={styles.registerButton}
            onClick={onRegister}
            disabled={loading}
          >
            Regístrate
          </button>
        </div>
      )}
    </form>
  );
});

LoginForm.displayName = 'LoginForm';
