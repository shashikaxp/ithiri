import {
  isWednesday,
  isTuesday,
  nextTuesday,
  previousWednesday,
  format,
  addDays,
  isWithinInterval,
  differenceInDays,
} from 'date-fns';

interface WeekMeta {
  label: string;
  isAvailable: boolean;
}

interface HookResponse {
  thisWeekMeta: WeekMeta;
  nextWeekMeta: WeekMeta;
}

export const useWeek = (): HookResponse => {
  const { thisWeekMeta, nextWeekMeta } = getWeekLabels();

  return {
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
    const now = new Date();
    const prevWed = previousWednesday(date);
    const nextTue = isTuesday(now) ? now : nextTuesday(date);

    // catalogue is release in every monday so it will be available in ithiri on tuesday
    const oneDayDifferentForWeek = differenceInDays(prevWed, now) <= 1;

    isAvailable =
      oneDayDifferentForWeek ||
      isWithinInterval(now, {
        start: prevWed,
        end: nextTue,
      });
    label = `${format(prevWed, dateFormat)} - ${format(nextTue, dateFormat)}`;
  }

  return {
    label,
    isAvailable: isAvailable,
  };
};
