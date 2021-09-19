import React from 'react';
import { useWeek } from '../../hooks/useWeek';
import { Week } from '@ithiri/shared-types';
import { useStore } from './../../store';

export const WeekSelector: React.FC = () => {
  const { thisWeekMeta, nextWeekMeta } = useWeek();
  const selectedWeek = useStore().selectedWeek;
  const setSelectedWeek = useStore().setSelectedWeek;

  const getSelectedClass = (weekType: Week) => {
    const commonClasses =
      'text-lg text-center bg-white self-stretch p-4 flex-grow cursor-pointer';
    if (selectedWeek === weekType) {
      return commonClasses + ' shadow-lg font-bold underline';
    }
    return commonClasses;
  };

  return (
    <div className="flex align-middle items-stretch bg-red-200">
      <div
        className={`${getSelectedClass('thisWeek')} p-4 flex-grow`}
        onClick={() => {
          setSelectedWeek('thisWeek');
        }}
      >
        {thisWeekMeta.label}
      </div>
      <div
        className={`${getSelectedClass('nextWeek')}`}
        onClick={() => {
          if (!nextWeekMeta.isAvailable) return;
          setSelectedWeek('nextWeek');
        }}
      >
        {nextWeekMeta.label}{' '}
        {!nextWeekMeta.isAvailable && '(Not available yet)'}
      </div>
    </div>
  );
};
