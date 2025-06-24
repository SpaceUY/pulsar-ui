---
title: Calendar Picker
description: Date range picker component with calendar interface
---

## Description

The `CalendarPicker` component provides an elegant date range selection interface with a bottom sheet calendar. It supports single date selection, date ranges, and includes features like month navigation, date validation, and customizable styling.

## Import

```typescript
import { CalendarPicker } from '@space-uy/rn-spacedev-uikit';
```

## Basic usage

```tsx
const [dateRange, setDateRange] = useState<{
  fromDate?: string;
  toDate?: string;
}>({});

<CalendarPicker
  label="Select dates"
  value={dateRange}
  onChange={setDateRange}
  placeholder="Choose date range"
/>;
```

## Properties

| Property      | Type                                     | Required | Default value          | Description                             |
| ------------- | ---------------------------------------- | -------- | ---------------------- | --------------------------------------- |
| `value`       | `{ fromDate?: string; toDate?: string }` | ❌       | `{}`                   | Current selected date range             |
| `onChange`    | `(dateRange: DateRange) => void`         | ✅       | -                      | Callback when date range changes        |
| `label`       | `string`                                 | ❌       | -                      | Label text displayed above the picker   |
| `placeholder` | `string`                                 | ❌       | `'Seleccionar fechas'` | Placeholder text when no dates selected |
| `disabled`    | `boolean`                                | ❌       | `false`                | Whether the picker is disabled          |
| `error`       | `boolean`                                | ❌       | `false`                | Whether the picker is in error state    |
| `hint`        | `string`                                 | ❌       | -                      | Hint text displayed below the picker    |
| `style`       | `StyleProp<ViewStyle>`                   | ❌       | -                      | Custom styles for the container         |

## DateRange Type

The date range object structure:

| Property   | Type     | Description              |
| ---------- | -------- | ------------------------ |
| `fromDate` | `string` | Start date in ISO format |
| `toDate`   | `string` | End date in ISO format   |

## Basic examples

### Single date selection

```tsx
const [selectedDate, setSelectedDate] = useState<{
  fromDate?: string;
  toDate?: string;
}>({});

<CalendarPicker
  label="Event date"
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select event date"
/>;
```

### Date range selection

```tsx
const [dateRange, setDateRange] = useState<{
  fromDate?: string;
  toDate?: string;
}>({});

<CalendarPicker
  label="Travel dates"
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select check-in and check-out dates"
  hint="Choose your stay duration"
/>;
```

### With validation

```tsx
const [bookingDates, setBookingDates] = useState<{
  fromDate?: string;
  toDate?: string;
}>({});
const [hasError, setHasError] = useState(false);

const handleDateChange = (dateRange: {
  fromDate?: string;
  toDate?: string;
}) => {
  setBookingDates(dateRange);

  // Validate minimum stay
  if (dateRange.fromDate && dateRange.toDate) {
    const from = new Date(dateRange.fromDate);
    const to = new Date(dateRange.toDate);
    const daysDiff = Math.ceil(
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
    );
    setHasError(daysDiff < 2);
  } else {
    setHasError(false);
  }
};

<CalendarPicker
  label="Booking dates"
  value={bookingDates}
  onChange={handleDateChange}
  placeholder="Select your stay dates"
  error={hasError}
  hint={
    hasError
      ? 'Minimum stay is 2 nights'
      : 'Select check-in and check-out dates'
  }
/>;
```

## Advanced examples

### Vacation booking system

```tsx
const [vacationDates, setVacationDates] = useState<{
  fromDate?: string;
  toDate?: string;
}>({});
const [isValidating, setIsValidating] = useState(false);

const handleDateSelection = async (dateRange: {
  fromDate?: string;
  toDate?: string;
}) => {
  setVacationDates(dateRange);

  if (dateRange.fromDate && dateRange.toDate) {
    setIsValidating(true);
    try {
      await validateAvailability(dateRange);
      // Handle success
    } catch (error) {
      // Handle unavailable dates
    } finally {
      setIsValidating(false);
    }
  }
};

<Card style={{ padding: 16 }}>
  <Text variant="h4" style={{ marginBottom: 16 }}>
    Plan Your Vacation
  </Text>

  <CalendarPicker
    label="Travel dates"
    value={vacationDates}
    onChange={handleDateSelection}
    placeholder="When would you like to travel?"
    disabled={isValidating}
    hint={
      isValidating ? 'Checking availability...' : 'Select your preferred dates'
    }
  />

  {vacationDates.fromDate && vacationDates.toDate && (
    <View
      style={{
        marginTop: 16,
        padding: 12,
        backgroundColor: colors.altBackground,
        borderRadius: 8,
      }}
    >
      <Text variant="pm">Selected dates:</Text>
      <Text variant="h5">
        {format(new Date(vacationDates.fromDate), 'MMM dd')} -{' '}
        {format(new Date(vacationDates.toDate), 'MMM dd, yyyy')}
      </Text>
      <Text variant="ps" style={{ opacity: 0.7 }}>
        {getDaysDifference(vacationDates.fromDate, vacationDates.toDate)} nights
      </Text>
    </View>
  )}
</Card>;
```

### Event scheduling

```tsx
const [eventDates, setEventDates] = useState<{
  fromDate?: string;
  toDate?: string;
}>({});
const [eventType, setEventType] = useState<'single' | 'multi'>('single');

const handleEventTypeChange = (type: 'single' | 'multi') => {
  setEventType(type);
  if (type === 'single' && eventDates.toDate) {
    setEventDates({ fromDate: eventDates.fromDate });
  }
};

<View style={{ gap: 16 }}>
  <Text variant="h4">Schedule Event</Text>

  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Chip
      text="Single Day"
      onPress={() => handleEventTypeChange('single')}
      style={{
        backgroundColor:
          eventType === 'single' ? colors.primary : colors.altBackground,
      }}
    />
    <Chip
      text="Multi Day"
      onPress={() => handleEventTypeChange('multi')}
      style={{
        backgroundColor:
          eventType === 'multi' ? colors.primary : colors.altBackground,
      }}
    />
  </View>

  <CalendarPicker
    label={eventType === 'single' ? 'Event date' : 'Event duration'}
    value={eventDates}
    onChange={setEventDates}
    placeholder={
      eventType === 'single'
        ? 'Select event date'
        : 'Select start and end dates'
    }
    hint={
      eventType === 'single'
        ? 'Choose the day for your event'
        : 'Select the duration of your event'
    }
  />
</View>;
```

### Comparison with preset ranges

```tsx
const [reportDates, setReportDates] = useState<{
  fromDate?: string;
  toDate?: string;
}>({});

const presetRanges = [
  {
    label: 'Last 7 days',
    range: {
      fromDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      toDate: format(new Date(), 'yyyy-MM-dd'),
    },
  },
  {
    label: 'Last 30 days',
    range: {
      fromDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
      toDate: format(new Date(), 'yyyy-MM-dd'),
    },
  },
  {
    label: 'This month',
    range: {
      fromDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
      toDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
    },
  },
];

<View style={{ gap: 16 }}>
  <Text variant="h4">Generate Report</Text>

  <CalendarPicker
    label="Report period"
    value={reportDates}
    onChange={setReportDates}
    placeholder="Select date range for report"
    hint="Choose the period for your analytics report"
  />

  <View style={{ gap: 8 }}>
    <Text variant="h5">Quick select:</Text>
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      {presetRanges.map((preset) => (
        <Chip
          key={preset.label}
          text={preset.label}
          onPress={() => setReportDates(preset.range)}
          size="small"
        />
      ))}
    </View>
  </View>

  {reportDates.fromDate && reportDates.toDate && (
    <Button
      text="Generate Report"
      onPress={() => generateReport(reportDates)}
      style={{ marginTop: 8 }}
    />
  )}
</View>;
```

### Form integration

```tsx
const [formData, setFormData] = useState({
  projectName: '',
  dates: { fromDate: undefined, toDate: undefined },
  description: '',
});

const [errors, setErrors] = useState<Record<string, boolean>>({});

const validateForm = () => {
  const newErrors: Record<string, boolean> = {};

  if (!formData.projectName.trim()) newErrors.projectName = true;
  if (!formData.dates.fromDate || !formData.dates.toDate)
    newErrors.dates = true;
  if (!formData.description.trim()) newErrors.description = true;

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

<Card style={{ padding: 16 }}>
  <Text variant="h4" style={{ marginBottom: 16 }}>
    Create Project
  </Text>

  <View style={{ gap: 16 }}>
    <Input
      label="Project Name"
      value={formData.projectName}
      onChangeText={(projectName) =>
        setFormData((prev) => ({ ...prev, projectName }))
      }
      error={errors.projectName}
      hint={errors.projectName ? 'Project name is required' : undefined}
      placeholder="Enter project name"
    />

    <CalendarPicker
      label="Project Timeline"
      value={formData.dates}
      onChange={(dates) => setFormData((prev) => ({ ...prev, dates }))}
      error={errors.dates}
      hint={
        errors.dates
          ? 'Please select project start and end dates'
          : 'Choose project duration'
      }
      placeholder="Select project timeline"
    />

    <TextArea
      label="Description"
      value={formData.description}
      onChangeText={(description) =>
        setFormData((prev) => ({ ...prev, description }))
      }
      error={errors.description}
      hint={errors.description ? 'Description is required' : undefined}
      placeholder="Describe your project"
      numberOfLines={3}
    />

    <Button
      text="Create Project"
      onPress={() => {
        if (validateForm()) {
          handleCreateProject(formData);
        }
      }}
    />
  </View>
</Card>;
```

## Implementation notes

- **Date format**: Uses ISO string format for date values
- **Bottom sheet**: Calendar opens in a bottom sheet overlay
- **Range selection**: Supports both single date and date range selection
- **Visual feedback**: Shows selected dates with highlighting and range indicators
- **Navigation**: Includes month navigation with custom header
- **Validation**: Built-in date validation and custom error states
- **Accessibility**: Proper labeling and keyboard navigation support

## Accessibility

- Supports screen readers with proper labeling
- Keyboard navigation for calendar interaction
- Clear visual indicators for selected dates
- High contrast colors for better visibility
- Proper focus management in bottom sheet

## Performance considerations

- Efficient date calculations using date-fns library
- Optimized re-renders with proper memoization
- Lazy loading of calendar components
- Smooth animations with React Native Reanimated
- Memory efficient date range calculations
