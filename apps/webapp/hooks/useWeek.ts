import { useState } from 'react';

import {
  isWednesday,
  nextTuesday,
  previousWednesday,
  format,
  addDays,
  isWithinInterval,
} from 'date-fns';

import { Week } from '../types/index';

interface WeekMeta {
  label: string;
  isAvailable: boolean;
}

interface HookResponse {
  selectedWeek: Week;
  setSelectedWeek: (week: Week) => void;
  thisWeekMeta: WeekMeta;
  nextWeekMeta: WeekMeta;
}

export const useWeek = (): HookResponse => {
  const [selectedWeek, setSelectedWeek] = useState<Week>('thisWeek');
  const { thisWeekMeta, nextWeekMeta } = getWeekLabels();

  return {
    selectedWeek,
    setSelectedWeek,
    thisWeekMeta,
    nextWeekMeta,
  };
};

const getWeekLabels = () => {
  const thisWeekDate = new Date();
  const nextWeekDate = addDays(thisWeekDate, 7);

  return {
    thisWeekMeta: formatWeeklyLabel(thisWeekDate),
    nextWeekMeta: formatWeeklyLabel(nextWeekDate),
  };
};

const formatWeeklyLabel = (date: Date) => {
  let label = '';
  const dateFormat = 'E dd LLL';
  const wednesday = isWednesday(date);
  let isAvailable = false;

  if (wednesday) {
    const nextTue = nextTuesday(date);
    isAvailable = isWithinInterval(new Date(), { start: date, end: nextTue });
    label = `${format(date, dateFormat)} - ${format(nextTue, dateFormat)}`;
  } else {
    const prevWed = previousWednesday(date);
    const nextTue = nextTuesday(date);
    isAvailable = isWithinInterval(new Date(), {
      start: prevWed,
      end: nextTue,
    });
    label = `${format(prevWed, dateFormat)} - ${format(nextTue, dateFormat)}`;
  }

  return {
    label,
    isAvailable,
  };
};
