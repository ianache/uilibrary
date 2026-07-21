import React, { useState } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  buttonLabel?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search components...',
  onSearch,
  buttonLabel = 'Search',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        fullWidth
      />
      <Button type="submit" label={buttonLabel} variant="primary" />
    </form>
  );
};
