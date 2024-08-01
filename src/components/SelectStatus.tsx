import React, { useState } from 'react';
import toast from 'react-hot-toast';
import apiService from '../services/ApiService';

const SelectStatus = ({ id, newStatus, debouncedCallApi }: any) => {
  const [status, setStatus] = useState(newStatus);

  // Define the options for status
  const statusOptions = [
    'active',
    'inactive',
    'pending',
    'blocked',
    'suspended',
  ];

  // Handle status change
  const handleStatusChange = async (event: any) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    let newData = {
      id,
      status: newStatus,
    };

    try {
      const res = await apiService.post('users/updateUser', newData);
      console.log('res', res);
      if (res.status === 201) {
        toast.success('Doctor Info Updated Successfully');
        //      getApiData();
        //   getPaginatedData();
        debouncedCallApi();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <select
        value={status}
        onChange={handleStatusChange}
        className="p-1 rounded bg-transparent border border-blue-gray-400"
        // className={`p-1.5 ${
        //   status === 'active'
        //     ? 'bg-green-400 text-white'
        //     : status === 'inactive'
        //     ? 'bg-gray-400 text-white'
        //     : 'bg-yellow-400 text-white'
        // }`}
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectStatus;
