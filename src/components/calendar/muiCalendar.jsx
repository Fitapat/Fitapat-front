'use client';

import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(day.format('YYYY-MM-DD'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🧡' : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function MuiCalendar({ value, setValue }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([
    '2023-12-17',
    '2023-12-18',
    '2023-12-19',
  ]);

  const initialValue = dayjs(); // today

  const fetchHighlightedDays = (date) => {
    // TODO 그 달에 해당하는 기록만 fetch 해오기
    setHighlightedDays(['2023-12-17', '2023-12-18', '2023-12-19']);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    setValue(initialValue);
  }, []);

  const handleMonthChange = (date) => {
    console.log(date.format('YYYY-MM-DD')); // 2023-12-01 ..  1일로 바뀜
    setValue(date.format('YYYY-MM-DD'));
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        value={value}
        onChange={(newValue) => setValue(newValue.format('YYYY-MM-DD'))}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
