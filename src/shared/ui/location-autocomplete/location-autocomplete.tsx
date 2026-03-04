import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

import { useLazyGet2GisSuggestionsQuery } from '@shared/api';
import { Coordinates, SuggestionItem } from '@shared/lib';
import { useDebounce } from '@shared/lib/hooks';

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: string, coordinates?: Coordinates) => void;
  error?: boolean;
  errorsMassage?: string;
  placeholder?: string;
}

export const LocationAutocomplete: FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  error,
  errorsMassage,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [getSuggestions, { data: suggestions = [], isFetching }] =
    useLazyGet2GisSuggestionsQuery();
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearch.trim().length >= 3) {
      getSuggestions(debouncedSearch);
    }
  }, [debouncedSearch, getSuggestions]);

  const handleChange = useCallback(
    (_: SyntheticEvent, selected: SuggestionItem | null) => {
      if (selected) {
        onChange(selected.address_name, {
          latitude: selected.point.lat,
          longitude: selected.point.lon,
        });
      } else {
        onChange('', { latitude: 0, longitude: 0 });
        setInputValue('');
      }
    },
    [onChange],
  );

  return (
    <Autocomplete
      forcePopupIcon={false}
      options={suggestions}
      loading={isFetching}
      filterOptions={(x) => x}
      value={
        suggestions.find((s) => s.address_name === value) ||
        (value ? ({ address_name: value } as SuggestionItem) : null)
      }
      inputValue={inputValue}
      onInputChange={(_, val) => setInputValue(val)}
      onChange={handleChange}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.address_name || ''
      }
      isOptionEqualToValue={(opt, val) => opt.address_name === val.address_name}
      blurOnSelect
      noOptionsText={
        inputValue.length < 3 ? 'Введите адрес...' : 'Ничего не найдено'
      }
      slotProps={{
        listbox: {
          sx: {
            maxHeight: '280px',
            overflowY: 'auto',
          },
        },
        popper: {
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'flip',
              enabled: false,
            },
            {
              name: 'offset',
              enabled: true,
              options: {
                offset: [0, 4],
              },
            },
          ],
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Место проведения'
          size='small'
          error={error}
          helperText={error ? errorsMassage : 'Укажите место проведения'}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isFetching ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
            inputLabel: { shrink: true },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component='li' {...props} key={option.id} sx={{ gap: 2 }}>
          <LocationOnIcon color='action' fontSize='small' />
          <Box sx={{ flexGrow: 1 }}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='body2' fontWeight={600}>
                {option.name}
              </Typography>
              {option.city && (
                <Typography
                  variant='caption'
                  color='primary.main'
                  sx={{ ml: 1 }}
                >
                  {option.city}
                </Typography>
              )}
            </Box>
            <Typography variant='caption' color='text.secondary'>
              {option.address_name}
            </Typography>
          </Box>
        </Box>
      )}
    />
  );
};
