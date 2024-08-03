// import { PlusIcon } from '@heroicons/react/24/solid';
// import { Spinner } from '@material-tailwind/react';
// import { useState } from 'react';

// const AddConsultation = ({
//   consultations,
//   setConsultations,
//   handleDataSubmit,
//   loadSpin,
// }: any) => {
//   const [btnDisable, setBtnDisable] = useState(false);
//   const [submitBtn, setSubmitBtn] = useState(false);
//   const [selectedDay, setSelectedDay] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [currentConsultationIndex, setCurrentConsultationIndex] =
//     useState(null);

//   const days = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ];

//   const times = [
//     '12:00 AM',
//     '12:30 AM',
//     '1:00 AM',
//     '1:30 AM',
//     '2:00 AM',
//     '2:30 AM',
//     '3:00 AM',
//     '3:30 AM',
//     '4:00 AM',
//     '4:30 AM',
//     '5:00 AM',
//     '5:30 AM',
//     '6:00 AM',
//     '6:30 AM',
//     '7:00 AM',
//     '7:30 AM',
//     '8:00 AM',
//     '8:30 AM',
//     '9:00 AM',
//     '9:30 AM',
//     '10:00 AM',
//     '10:30 AM',
//     '11:00 AM',
//     '11:30 AM',
//     '12:00 PM',
//     '12:30 PM',
//     '1:00 PM',
//     '1:30 PM',
//     '2:00 PM',
//     '2:30 PM',
//     '3:00 PM',
//     '3:30 PM',
//     '4:00 PM',
//     '4:30 PM',
//     '5:00 PM',
//     '5:30 PM',
//     '6:00 AM',
//     '6:30 PM',
//     '7:00 PM',
//     '7:30 PM',
//     '8:00 PM',
//     '8:30 PM',
//     '9:00 PM',
//     '9:30 PM',
//     '10:00 PM',
//     '10:30 PM',
//     '11:00 PM',
//     '11:30 PM',
//   ];

//   const handleDayChange = (event: any) => {
//     setSelectedDay(event.target.value);
//     setSelectedTime('');
//   };

//   const handleTimeChange = (event: any) => {
//     setSelectedTime(event.target.value);
//   };

//   const addSchedule = () => {
//     if (
//       selectedDay &&
//       selectedTime !== '' &&
//       currentConsultationIndex !== null
//     ) {
//       setConsultations((prevConsultations: any) => {
//         const updatedConsultations = [...prevConsultations];
//         const consultation = updatedConsultations[currentConsultationIndex];

//         const dayExists = consultation.availableSlots.find(
//           (item: any) => item.day === selectedDay,
//         );
//         if (dayExists) {
//           if (!dayExists.time.includes(selectedTime)) {
//             dayExists.time = [...dayExists.time, selectedTime];
//           }
//         } else {
//           consultation.availableSlots.push({
//             day: selectedDay,
//             time: [selectedTime],
//           });
//         }

//         updatedConsultations[currentConsultationIndex] = consultation;
//         return updatedConsultations;
//       });
//       setSelectedTime('');
//     }
//   };

//   const handleAdd = () => {
//     setSubmitBtn(true);
//     if (consultations.length < 2) {
//       setConsultations([
//         ...consultations,
//         { type: '', fee: '', availableSlots: [] },
//       ]);
//       setCurrentConsultationIndex(consultations.length); // Set the current index for the new consultation
//     } else {
//       setBtnDisable(true);
//     }
//   };

//   const handleConsultationChange = (index: any, field: any, value: any) => {
//     setConsultations((prevConsultations: any) => {
//       const updatedConsultations = [...prevConsultations];
//       updatedConsultations[index] = {
//         ...updatedConsultations[index],
//         [field]: value,
//       };
//       return updatedConsultations;
//     });
//   };

//   const getFilteredTimes = () => {
//     if (selectedDay && currentConsultationIndex !== null) {
//       const currentConsultation = consultations[currentConsultationIndex];
//       const dayExists = currentConsultation?.availableSlots.find(
//         (item: any) => item.day === selectedDay,
//       );
//       if (dayExists) {
//         return times.filter((time) => !dayExists.time.includes(time));
//       }
//     }
//     return times;
//   };

//   return (
//     <>
//       <div className="items-center mt-10">
//         <button
//           disabled={btnDisable}
//           onClick={handleAdd}
//           className={`w-[20%] ${
//             btnDisable ? 'cursor-not-allowed' : 'cursor-pointer'
//           } rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex justify-center items-center`}
//         >
//           <PlusIcon className="w-5 h-5 mr-1" />
//           Add Consultation Detail
//         </button>
//       </div>

//       {consultations.map((consultation: any, index: any) => (
//         <div key={index}>
//           <h1 className="text-left mt-10 text-title-lg text-black">
//             Add Consultation Info
//           </h1>
//           <div className="flex flex-col gap-3 md:flex-row mb-15 mt-10 pt-10">
//             <div className="md:w-1/2 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
//               <label className="mb-2.5 text-left block text-black dark:text-white">
//                 Consultation Type
//               </label>
//               <select
//                 name="type"
//                 className="w-full rounded-lg border border-stroke bg-transparent py-4.5 px-5 outline-none transition focus:border-primary"
//                 value={consultation.type}
//                 onChange={(e) =>
//                   handleConsultationChange(index, 'type', e.target.value)
//                 }
//               >
//                 <option value="" disabled>
//                   Select the Type
//                 </option>
//                 <option value="online">Online</option>
//                 <option value="offline">Offline</option>
//               </select>
//             </div>
//             <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
//               <label className="mb-2.5 text-left block text-black dark:text-white">
//                 Fee
//               </label>
//               <input
//                 type="text"
//                 name="fee"
//                 className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
//                 value={consultation.fee}
//                 onChange={(e) =>
//                   handleConsultationChange(index, 'fee', e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <h1 className="text-left text-title-lg text-black">Add Slots Info</h1>
//           <div className="flex flex-col gap-3 md:flex-row mb-15 mt-10 pt-10">
//             <div className="md:w-4/12 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
//               <label className="mb-2.5 text-left block text-black dark:text-white">
//                 Days
//               </label>
//               <select
//                 name="days"
//                 className="w-full rounded-lg border border-stroke bg-transparent py-4.5 px-5 outline-none transition focus:border-primary"
//                 value={selectedDay}
//                 onChange={handleDayChange}
//               >
//                 <option value="" disabled>
//                   Select a day
//                 </option>
//                 {days.map((day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="md:w-4/12 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
//               <label className="mb-2.5 text-left block text-black dark:text-white">
//                 Time
//               </label>
//               <select
//                 value={selectedTime}
//                 onChange={handleTimeChange}
//                 className="w-full rounded-lg border border-stroke bg-transparent py-4.5 px-5 outline-none transition focus:border-primary"
//               >
//                 <option value="" disabled>
//                   Select a time
//                 </option>
//                 {getFilteredTimes().map((time) => (
//                   <option key={time} value={time}>
//                     {time}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="md:w-4/12 mt-10 flex-1 md:flex-none w-full mr-4">
//               <button
//                 onClick={addSchedule}
//                 className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               >
//                 Add Schedule
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col gap-5">
//             {consultation.availableSlots.map((slot: any, slotIndex: any) => (
//               <div key={slotIndex} className="flex flex-col">
//                 <h3 className="text-lg text-black text-left font-semibold">
//                   {slot.day} Available Time
//                 </h3>
//                 <div className="flex gap-2 flex-wrap mt-2">
//                   {slot.time.map((time: any, timeIndex: any) => (
//                     <div
//                       key={timeIndex}
//                       className="bg-blue-400 text-white py-2 px-4 rounded-md"
//                     >
//                       {time}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {submitBtn && (
//         <button
//           type="button"
//           onClick={handleDataSubmit}
//           className={`w-[20%] mt-15 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex justify-center items-center`}
//         >
//           {loadSpin ? <Spinner className="h-6 w-6" /> : 'Submit Detail'}
//         </button>
//       )}
//     </>
//   );
// };

// export default AddConsultation;
// 9;

import { PlusIcon, XCircleIcon } from '@heroicons/react/24/solid'; // Import XIcon for the cross button
import { Spinner } from '@material-tailwind/react';
import { useState } from 'react';

const AddConsultation = ({
  consultations,
  setConsultations,
  handleDataSubmit,
  loadSpin,
}: any) => {
  const [btnDisable, setBtnDisable] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentConsultationIndex, setCurrentConsultationIndex] = useState<
    number | null
  >(null);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const times = [
    '12:00 AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM',
  ];

  const handleDayChange = (event: any) => {
    setSelectedDay(event.target.value);
    setSelectedTime('');
  };

  const handleTimeChange = (event: any) => {
    setSelectedTime(event.target.value);
  };

  const addSchedule = () => {
    if (
      selectedDay &&
      selectedTime !== '' &&
      currentConsultationIndex !== null
    ) {
      setConsultations((prevConsultations: any) => {
        const updatedConsultations = [...prevConsultations];
        const consultation = updatedConsultations[currentConsultationIndex];

        const dayExists = consultation.availableSlots.find(
          (item: any) => item.day === selectedDay,
        );
        if (dayExists) {
          if (!dayExists.time.includes(selectedTime)) {
            dayExists.time = [...dayExists.time, selectedTime];
          }
        } else {
          consultation.availableSlots.push({
            day: selectedDay,
            time: [selectedTime],
          });
        }

        updatedConsultations[currentConsultationIndex] = consultation;
        return updatedConsultations;
      });
      setSelectedTime('');
    }
  };

  const handleAdd = () => {
    setSubmitBtn(true);
    if (consultations.length < 2) {
      setConsultations([
        ...consultations,
        { type: '', fee: '', availableSlots: [] },
      ]);
      setCurrentConsultationIndex(consultations.length); // Set the current index for the new consultation
    } else {
      setBtnDisable(true);
    }
  };

  const handleConsultationChange = (index: any, field: any, value: any) => {
    setConsultations((prevConsultations: any) => {
      const updatedConsultations = [...prevConsultations];
      updatedConsultations[index] = {
        ...updatedConsultations[index],
        [field]: value,
      };
      return updatedConsultations;
    });
  };

  const getFilteredTimes = () => {
    if (selectedDay && currentConsultationIndex !== null) {
      const currentConsultation = consultations[currentConsultationIndex];
      const dayExists = currentConsultation?.availableSlots.find(
        (item: any) => item.day === selectedDay,
      );
      if (dayExists) {
        return times.filter((time) => !dayExists.time.includes(time));
      }
    }
    return times;
  };

 const removeSlot = (slotDay: string, slotTime: string) => {
  setConsultations((prevConsultations: any) => {
    console.log("Before update:", prevConsultations); // Debugging line

    const updatedConsultations = prevConsultations.map((consultation: any) => {
      if (consultation.availableSlots) {
        const updatedAvailableSlots = consultation.availableSlots.map((slot: any) => {
          if (slot.day === slotDay) {
            const updatedTimes = slot.time.filter((time: string) => time !== slotTime);
            if (updatedTimes.length === 0) {
              return null;
            }
            return { ...slot, time: updatedTimes };
          }
          return slot;
        }).filter(Boolean);

        return { ...consultation, availableSlots: updatedAvailableSlots };
      }
      return consultation;
    });

    console.log("After update:", updatedConsultations); // Debugging line
    return updatedConsultations;
  });
};

  return (
    <>
      <div className="items-center mt-10">
        <button
          disabled={btnDisable}
          onClick={handleAdd}
          className={`w-[20%] ${
            btnDisable ? 'cursor-not-allowed' : 'cursor-pointer'
          } rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex justify-center items-center`}
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add Consultation Detail
        </button>
      </div>

      {consultations.map((consultation: any, index: any) => (
        <div key={index}>
          <h1 className="text-left mt-10 text-title-lg text-black">
            Add Consultation Info
          </h1>
          <div className="flex flex-col gap-3 md:flex-row mb-15 mt-10 pt-10">
            <div className="md:w-1/2 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
              <label className="mb-2.5 text-left block text-black dark:text-white">
                Consultation Type
              </label>
              <select
                name="type"
                className="w-full rounded-lg border border-stroke bg-transparent py-4.5 px-5 outline-none transition focus:border-primary"
                value={consultation.type}
                onChange={(e) =>
                  handleConsultationChange(index, 'type', e.target.value)
                }
              >
                <option value="" disabled>
                  Select the Type
                </option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div className="md:w-1/2 flex-1 md:flex-none w-full mr-4">
              <label className="mb-2.5 text-left block text-black dark:text-white">
                Fee
              </label>
              <input
                type="text"
                name="fee"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                value={consultation.fee}
                onChange={(e) =>
                  handleConsultationChange(index, 'fee', e.target.value)
                }
              />
            </div>
          </div>
          <h1 className="text-left text-title-lg text-black">Add Slots Info</h1>
          <div className="flex flex-col gap-3 md:flex-row mb-15 mt-10 pt-10">
            <div className="md:w-4/12 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
              <label className="mb-2.5 text-left block text-black dark:text-white">
                Days
              </label>
              <select
                name="days"
                className="w-full rounded-lg border border-stroke bg-transparent py-4.5 px-5 outline-none transition focus:border-primary"
                value={selectedDay}
                onChange={handleDayChange}
              >
                <option value="" disabled>
                  Select a day
                </option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:w-4/12 flex-1 md:flex-none w-full md:mb-0 mb-4.5">
              <label className="mb-2.5 text-left block text-black dark:text-white">
                Time
              </label>
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4.5 px-5 outline-none transition focus:border-primary"
              >
                <option value="" disabled>
                  Select a time
                </option>
                {getFilteredTimes().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:w-4/12 mt-10 flex-1 md:flex-none w-full mr-4">
              <button
                onClick={addSchedule}
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add Schedule
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {consultation.availableSlots.map((slot: any, slotIndex: any) => (
              <div key={slotIndex} className="flex flex-col">
                <h3 className="text-lg text-black text-left font-semibold">
                  {slot.day} Available Time
                </h3>
                <div className="relative flex gap-2 flex-wrap mt-2">
                  {slot.time.map((time: any, timeIndex: any) => (
                    <div
                      key={timeIndex}
                      className="bg-blue-400 text-white py-4 px-4 rounded-md relative"
                    >
                      <span>{time}</span>
                      <button
                        onClick={() => removeSlot(slot.day, time)}
                        className="absolute top-0 right-0 p-1"
                      >
                        <XCircleIcon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {submitBtn && (
        <button
          type="button"
          onClick={handleDataSubmit}
          className={`w-[20%] mt-15 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 flex justify-center items-center`}
        >
          {loadSpin ? <Spinner className="h-6 w-6" /> : 'Submit Detail'}
        </button>
      )}
    </>
  );
};

export default AddConsultation;
