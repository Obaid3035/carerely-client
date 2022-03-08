import React, { useState } from 'react';
import Select from 'react-select';

const DateSelect = () => {
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   const [selectedDate, setSelectedDate] = useState({
      month: {
         value: 1,
         label: months[1],
      },
      year: {
         value: 1997,
         label: '1997',
      },
   });

   const [day, setDay] = useState(daysInMonth(selectedDate.month.value, selectedDate.year.value)[0]);

   function generateArrayOfYears() {
      const max = new Date().getFullYear();
      const min = max - 92;
      const years = [];

      for (let i = max; i >= min; i--) {
         years.push({
            label: i.toString(),
            value: i,
         });
      }
      return years;
   }

   function convertMonth() {
      return months.map((month, index) => {
         return {
            value: index,
            label: month,
         };
      });
   }

   function daysInMonth(month: number, year: number) {
      const arrSelect = [];
      const noOfDays = new Date(year, month + 1, 0).getDate();
      for (let i = 1; i <= noOfDays; i++) {
         arrSelect.push({
            value: i,
            label: i.toString(),
         });
      }
      return arrSelect;
   }

   return (
      <div className={'d-flex justify-content-between'}>
         <Select options={convertMonth()} onChange={(option) => setSelectedDate({
            ...selectedDate,
            month: option!,
         })} value={selectedDate.month} placeholder={'Month'} className={'w-75'} />
         <Select options={daysInMonth(selectedDate.month.value, selectedDate.year.value)}
                 value={day}
                 onChange={(value) => setDay(value!)}
                 placeholder={'Date'} className={'w-75 mx-3'} />
         <Select options={generateArrayOfYears()}
                 onChange={(option) => setSelectedDate({
                    ...selectedDate,
                    year: option!,
                 })}
                 value={selectedDate.year} placeholder={'Year'} className={'w-75'} />
      </div>
   );
};

export default DateSelect;
