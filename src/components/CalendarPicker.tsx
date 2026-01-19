import { useMemo, useRef, useState, useCallback } from 'react';
import { add, format, isBefore, addMonths, subMonths } from 'date-fns';
import {
  useWindowDimensions,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  I18nManager,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import type { DateData, MarkedDates } from 'react-native-calendars/src/types';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import InputContainer from './InputContainer';
import BottomSheet, { type BottomSheetProps } from './BottomSheet';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import IconButton from './IconButton';

import useTheme from '../hooks/useTheme';

import { convertDateToISOString } from '../utils/stringUtils';
import { convertHexToRgba } from '../utils/uiUtils';

type DateRange = { fromDate?: string; toDate?: string };

type Props = {
  style?: StyleProp<ViewStyle>;
  value?: DateRange;
  onChange: (dateRange: DateRange) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  title?: string;
};

// Helper function to safely parse ISO date string to Date object
const parseISODateString = (isoString: string): Date | null => {
  try {
    const datePart = isoString.split('T')[0];
    if (!datePart) return null;

    const dateArray = datePart.split('-').map(Number);
    if (dateArray.length !== 3) return null;

    const [year, month, day] = dateArray;
    if (!year || !month || !day) return null;

    return new Date(year, month - 1, day);
  } catch {
    return null;
  }
};

const CalendarPicker = ({
  style,
  value,
  onChange,
  placeholder = 'Seleccionar fechas',
  label,
  disabled = false,
  error,
  hint,
}: Props) => {
  const [fromDate, setFromDate] = useState<string | undefined>(
    value?.fromDate ? format(new Date(value.fromDate), 'yyyy-MM-dd') : undefined
  );
  const [toDate, setToDate] = useState<string | undefined>(
    value?.toDate ? format(new Date(value.toDate), 'yyyy-MM-dd') : undefined
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const rotation = useSharedValue(0);
  const { width } = useWindowDimensions();
  const { theme, colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheetProps>(null);

  const getMiddleDays = (
    startDate: string | undefined,
    endDate: string | undefined
  ) => {
    if (!startDate || !endDate) return {};
    const markedDates: MarkedDates = {};
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    let currentDate = add(sDate, { days: 1 });
    while (isBefore(currentDate, eDate)) {
      markedDates[format(add(currentDate, { days: 1 }), 'yyyy-MM-dd')] = {
        color: convertHexToRgba(colors.border, 0.5),
        textColor: colors.foreground,
      };
      currentDate = add(currentDate, { days: 1 });
    }
    return markedDates;
  };

  const handlePress = useCallback(() => {
    if (disabled) return;
    setFromDate(
      value?.fromDate
        ? format(new Date(value.fromDate), 'yyyy-MM-dd')
        : undefined
    );
    setToDate(
      value?.toDate ? format(new Date(value.toDate), 'yyyy-MM-dd') : undefined
    );
    setIsOpen(true);
    rotation.value = withTiming(1, { duration: 200 });
    bottomSheetRef.current?.show();
  }, [disabled, rotation, value?.fromDate, value?.toDate]);

  const handleClose = useCallback(() => {
    rotation.value = withTiming(0, { duration: 200 });
    setIsOpen(false);
    setFromDate(
      value?.fromDate
        ? format(new Date(value.fromDate), 'yyyy-MM-dd')
        : undefined
    );
    setToDate(
      value?.toDate ? format(new Date(value.toDate), 'yyyy-MM-dd') : undefined
    );
    bottomSheetRef.current?.hide();
  }, [rotation, value?.fromDate, value?.toDate]);

  const handleDatePress = (selectedDate: DateData) => {
    if (!fromDate || (!!fromDate && !!toDate)) {
      setFromDate(selectedDate.dateString);
      !!toDate && setToDate(undefined);
    } else {
      if (isBefore(new Date(selectedDate.dateString), new Date(fromDate))) {
        setToDate(fromDate);
        setFromDate(selectedDate.dateString);
      } else {
        setToDate(selectedDate.dateString);
      }
    }
  };

  const handleConfirm = () => {
    onChange({
      fromDate: fromDate ? convertDateToISOString(fromDate) : undefined,
      toDate: toDate ? convertDateToISOString(toDate) : undefined,
    });
    handleClose();
  };

  const handleClear = () => {
    setFromDate(undefined);
    setToDate(undefined);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleMonthChange = (month: DateData) => {
    setCurrentMonth(new Date(month.dateString));
  };

  const formatMonthYear = (date: Date) => {
    return format(date, 'MMMM yyyy');
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  const getInputTextColor = useCallback(() => {
    if (disabled) return convertHexToRgba(colors.foreground, 0.5);
    return colors.foreground;
  }, [colors.foreground, disabled]);

  const getDisplayValue = () => {
    if (!value?.fromDate && !value?.toDate) return null;

    if (value?.fromDate && !value?.toDate) {
      const date = parseISODateString(value.fromDate);
      return date ? format(date, 'dd/MM/yyyy') : null;
    }

    if (value?.fromDate && value?.toDate) {
      const _fromDate = parseISODateString(value.fromDate);
      const _toDate = parseISODateString(value.toDate);

      if (!_fromDate || !_toDate) return null;

      return `${format(_fromDate, 'dd/MM/yyyy')} - ${format(_toDate, 'dd/MM/yyyy')}`;
    }

    return null;
  };

  const displayValue = getDisplayValue();
  const isButtonDisabled = useMemo(() => {
    if (!fromDate || !toDate) return true;

    const normalizedFromDate = fromDate
      ? convertDateToISOString(fromDate)
      : undefined;
    const normalizedToDate = toDate
      ? convertDateToISOString(toDate)
      : undefined;

    return (
      normalizedFromDate === value?.fromDate &&
      normalizedToDate === value?.toDate
    );
  }, [fromDate, toDate, value?.fromDate, value?.toDate]);

  const isSingleDateSelection = fromDate && toDate && fromDate === toDate;

  const getMarkedDates = () => {
    if (isSingleDateSelection) {
      return {
        [fromDate!]: {
          startingDay: true,
          endingDay: true,
          color: colors.primary,
          textColor: colors.background,
          customContainerStyle: { borderRadius: theme.roundness },
        },
      };
    } else {
      return {
        [fromDate ?? '']: {
          startingDay: true,
          color: colors.primary,
          textColor: colors.background,
          customContainerStyle: { borderRadius: theme.roundness },
        },
        [toDate ?? '']: {
          endingDay: true,
          color: colors.primary,
          textColor: colors.background,
          customContainerStyle: { borderRadius: theme.roundness },
        },
        ...getMiddleDays(fromDate, toDate),
      };
    }
  };

  return (
    <>
      <View style={style}>
        <InputContainer
          onPress={handlePress}
          disabled={disabled}
          focused={isOpen}
          error={error}
          hint={hint}
          label={label}
        >
          <Icon
            style={styles.icon}
            name="Calendar"
            size={18}
            color={convertHexToRgba(colors.foreground, 0.5)}
          />
          <Text
            variant="pm"
            style={[
              styles.selectText,
              {
                color: displayValue
                  ? getInputTextColor()
                  : convertHexToRgba(colors.foreground, 0.5),
                fontFamily: theme.fonts.regular,
              },
            ]}
            numberOfLines={1}
          >
            {displayValue ?? placeholder}
          </Text>
          <Animated.View style={animatedStyle}>
            <Icon name="ChevronDown" size={16} color={colors.foreground} />
          </Animated.View>
        </InputContainer>
      </View>
      <BottomSheet ref={bottomSheetRef} onBackdropPress={handleClose}>
        <View style={styles.calendarContainer}>
          <View style={styles.customHeader}>
            <Text
              variant="h4"
              style={[styles.monthTitle, { color: colors.foreground }]}
            >
              {formatMonthYear(currentMonth)}
            </Text>
            <View style={styles.navigationButtons}>
              <IconButton
                onPress={handlePrevMonth}
                iconName={I18nManager.isRTL ? 'ChevronRight' : 'ChevronLeft'}
                variant="outline"
              />
              <IconButton
                onPress={handleNextMonth}
                iconName={I18nManager.isRTL ? 'ChevronLeft' : 'ChevronRight'}
                variant="outline"
              />
            </View>
          </View>

          <View
            style={[
              styles.calendarContent,
              {
                backgroundColor: convertHexToRgba(colors.border, 0.3),
                borderRadius: theme.roundness,
              },
            ]}
          >
            <Calendar
              key={format(currentMonth, 'yyyy-MM')}
              current={format(currentMonth, 'yyyy-MM-dd')}
              onDayPress={handleDatePress}
              onMonthChange={handleMonthChange}
              disableAllTouchEventsForDisabledDays={true}
              rtl={I18nManager.isRTL}
              markedDates={getMarkedDates()}
              showSixWeeks={true}
              hideExtraDays={false}
              markingType="period"
              hideArrows={true}
              hideHeader={true}
              hideDayNames={false}
              disableArrowLeft={true}
              disableArrowRight={true}
              renderHeader={() => null}
              theme={{
                'calendarBackground': 'transparent',
                'backgroundColor': 'transparent',
                'textDayFontFamily': theme.fonts.regular,
                'textDayFontSize': 12,
                'dayTextColor': colors.foreground,
                'todayTextColor': colors.primary,
                'textMonthFontFamily': theme.fonts.medium,
                'monthTextColor': colors.foreground,
                'textMonthFontSize': 14,
                'textDayHeaderFontFamily': theme.fonts.medium,
                'textDayHeaderFontSize': 12,
                'textSectionTitleColor': convertHexToRgba(
                  colors.foreground,
                  0.7
                ),
                'textDisabledColor': convertHexToRgba(colors.foreground, 0.3),
                'arrowColor': colors.foreground,
                'stylesheet.calendar.header': {
                  header: {
                    height: 0,
                    opacity: 0,
                    display: 'none',
                  },
                },
              }}
              calendarWidth={width - 32}
            />
          </View>
        </View>
        <View
          style={[
            styles.buttonContainer,
            { paddingBottom: theme.insets.bottom + 16 },
          ]}
        >
          <View style={styles.buttonRow}>
            {toDate && fromDate && (
              <Button
                text="Limpiar"
                variant="outline"
                onPress={handleClear}
                style={styles.secondaryButton}
              />
            )}
            <Button
              text="Confirmar"
              onPress={handleConfirm}
              disabled={isButtonDisabled}
              style={styles.primaryButton}
            />
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  icon: { marginEnd: 8 },
  selectText: { flex: 1 },
  calendarContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: { textTransform: 'capitalize' },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonContainer: { marginHorizontal: 16, marginTop: 16 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  secondaryButton: { flex: 1 },
  primaryButton: { flex: 2 },
  calendarContent: { padding: 8, overflow: 'hidden' },
});

export default CalendarPicker;
