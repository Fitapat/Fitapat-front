'use client';

import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import todoAPI from '/src/apis/todoAPI.js';

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
    todoAPI
      .getTodo(date, 'm')
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setHighlightedDays(
            data.map((item) => {
              return dayjs(item.date).format('YYYY-MM-DD');
            }),
          );
        }
      });

    setIsLoading(false);
    console.log(highlightedDays);
  };

  React.useEffect(() => {
    fetchHighlightedDays(value);
  });

  const handleMonthChange = (date) => {
    // console.log(date.format('YYYY-MM-DD')); // 2023-12-01 ..  1일로 바뀜
    setValue(date);
    setIsLoading(true);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        // defaultValue={initialValue}
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
