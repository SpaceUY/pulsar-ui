---
title: String Utils
description: Utility functions for string manipulation and date conversions.
---

The string utils provide helpful functions for string manipulation and date conversions commonly needed in React Native applications.

## Import

```typescript
import { convertDateToISOString } from '@space-uy/rn-spacedev-uikit';
```

## Available Functions

### convertDateToISOString

Converts a date string in "yyyy-MM-dd" format to an ISO string representation with time set to midnight.

#### Parameters

| Parameter    | Type     | Required | Description                        |
| ------------ | -------- | -------- | ---------------------------------- |
| `dateString` | `string` | ✅       | Date string in "yyyy-MM-dd" format |

#### Returns

| Type     | Description                                                     |
| -------- | --------------------------------------------------------------- |
| `string` | ISO string representation of the date with time set to midnight |

#### Basic usage

```typescript
import { convertDateToISOString } from '@space-uy/rn-spacedev-uikit';

// Convert a date string to ISO format
const dateString = '2024-01-15';
const isoString = convertDateToISOString(dateString);
console.log(isoString); // "2024-01-15T00:00:00.000Z"
```

#### Advanced examples

##### Working with form data

```typescript
import { convertDateToISOString } from '@space-uy/rn-spacedev-uikit';

const handleFormSubmit = (formData: { birthDate: string }) => {
  const user = {
    ...formData,
    birthDate: convertDateToISOString(formData.birthDate), // Convert to ISO
  };

  // Send to API
  submitUser(user);
};
```

##### Converting multiple dates

```typescript
import { convertDateToISOString } from '@space-uy/rn-spacedev-uikit';

const dates = ['2024-01-15', '2024-02-20', '2024-03-25'];
const isoDates = dates.map((date) => convertDateToISOString(date));

console.log(isoDates);
// [
//   "2024-01-15T00:00:00.000Z",
//   "2024-02-20T00:00:00.000Z",
//   "2024-03-25T00:00:00.000Z"
// ]
```

##### Integration with date pickers

```typescript
import { useState } from 'react';
import { convertDateToISOString } from '@space-uy/rn-spacedev-uikit';

function DateForm() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSubmit = () => {
    if (selectedDate) {
      const isoDate = convertDateToISOString(selectedDate);
      // Process the ISO date string
      console.log('Selected date in ISO format:', isoDate);
    }
  };

  return (
    <View>
      <CalendarPicker
        value={selectedDate}
        onDateSelect={setSelectedDate}
      />
      <Button text="Submit" onPress={handleDateSubmit} />
    </View>
  );
}
```

## Implementation notes

- The function expects dates in "yyyy-MM-dd" format (ISO 8601 date format)
- The time is always set to midnight (00:00:00) in the resulting ISO string
- The function automatically handles month conversion (subtracts 1 since JavaScript months are 0-indexed)
- The resulting ISO string includes timezone information (Z for UTC)

## Error handling

Make sure to validate the input format before using this function:

```typescript
import { convertDateToISOString } from '@space-uy/rn-spacedev-uikit';

const isValidDateFormat = (dateString: string): boolean => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(dateString);
};

const safeDateConversion = (dateString: string): string | null => {
  if (!isValidDateFormat(dateString)) {
    console.warn('Invalid date format. Expected: yyyy-MM-dd');
    return null;
  }

  return convertDateToISOString(dateString);
};
```
