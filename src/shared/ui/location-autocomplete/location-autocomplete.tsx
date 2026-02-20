import React, { useCallback, useEffect, useState } from 'react';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete, Box, CircularProgress, Typography } from '@mui/material';
import { StyledTextField } from '../styled-text-field';
import { useLazyGet2GisSuggestionsQuery } from '@shared/api';
import { SuggestionItem } from '@shared/lib';
import type { Coordinates } from '@shared/lib';
import { useDebounce } from '@shared/lib/hooks';

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: string, coordinates?: Coordinates) => void;
  onCoordinatesChange?: (coordinates: Coordinates) => void;
  error?: boolean;
  errorsMassage?: string;
  helperText: string | undefined;
  placeholder?: string;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  onCoordinatesChange,
  error,
  errorsMassage,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const [getSuggestions, { data: suggestions = [], isLoading }] =
    useLazyGet2GisSuggestionsQuery();

  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue && debouncedInputValue.length >= 3) {
      getSuggestions(debouncedInputValue);
    }
  }, [debouncedInputValue, getSuggestions]);

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, newInputValue: string) => {
      setInputValue(newInputValue);
    },
    [],
  );

  const handleChange = useCallback(
    (
      _event: React.SyntheticEvent,
      selectedValue: SuggestionItem | string | null,
    ) => {
      if (selectedValue && typeof selectedValue !== 'string') {
        const coordinates = {
          latitude: selectedValue.point.lat,
          longitude: selectedValue.point.lon,
        };

        onChange(selectedValue.address_name, coordinates);
        onCoordinatesChange?.(coordinates);
      } else if (typeof selectedValue === 'string') {
        onChange(selectedValue);
      }
    },
    [onChange, onCoordinatesChange],
  );

  return (
    <Autocomplete
      freeSolo
      value={value}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      options={suggestions}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.address_name
      }
      loading={isLoading}
      noOptionsText={
        inputValue.length < 3
          ? 'Введите минимум 3 символа'
          : 'Ничего не найдено'
      }
      renderOption={(props, option) => {
        if (typeof option === 'string') return null;

        return (
          <Box component='li' {...props} key={option.id}>
            <LocationOnIcon color='action' />
            <Box>
              <Typography variant='body2'>{option.name}</Typography>
              <Typography variant='caption' color='text.secondary'>
                {option.address_name}
              </Typography>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label={'Место проведения'}
          size={'small'}
          helperText={errorsMassage || 'Укажите место проведения.'}
          InputLabelProps={{ shrink: true }}
          error={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
