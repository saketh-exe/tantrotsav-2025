import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '../store/authStore'; // Zustand store
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigation

const schema = z
  .object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    profileImage: z.string().url({ message: 'Invalid URL' }),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),
    collegeName: z.string().nonempty({ message: 'College name is required' }),
    collegeRollNumber: z
      .string()
      .nonempty({ message: 'College roll number is required' }),
    city: z.string().nonempty({ message: 'City is required' }),
    state: z.string().nonempty({ message: 'State is required' }),
    isAmritaChennaiStudent: z.boolean(),
    department: z.string().optional(),
  })
  .refine((data) => !data.isAmritaChennaiStudent || data.department, {
    message:
      'Department is required if "Is Amrita Chennai student?" is checked',
    path: ['department'],
  });

function UserDetails() {
  const { user, setUserRegistrationStatus } = useAuthStore();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: '',
    collegeName: '',
    collegeRollNumber: '',
    city: '',
    state: '',
    isAmritaChennaiStudent: false,
    department: '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formValues,
  });

  const isAmritaChennaiStudent = watch('isAmritaChennaiStudent');

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || '',
        email: user.email || '',
        profileImage: user.photoURL || '',
        phoneNumber: '',
        collegeName: '',
        collegeRollNumber: '',
        city: '',
        state: '',
        isAmritaChennaiStudent: false,
        department: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        data
      );
      if (response.status === 201) {
        toast.success('User details updated successfully');
        setUserRegistrationStatus(true);
        return (window.location.href = '/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white mt-20 rounded-md scrollbar-hide">
      {/* Centered Image */}
      <div className="flex justify-center mb-6">
        <img
          src={user.photoURL || user.profileImage}
          alt="Profile Pic"
          referrerPolicy="no-referrer"
          className="h-[100px] w-[100px] rounded-full"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-[#C50B4C]">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-[#C50B4C]">
            <Controller
              name="isAmritaChennaiStudent"
              control={control}
              render={({ field }) => <input {...field} type="checkbox" />}
            />
            <span>Is Amrita Chennai student?</span>
          </label>
        </div>

        {isAmritaChennaiStudent && (
          <div>
            <label className="block text-sm font-medium text-[#C50B4C]">
              Department
            </label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
                >
                  <option value="">Select department</option>
                  <option value="CSE">CSE</option>
                  <option value="CYS">CYS</option>
                  <option value="AIE">AIE</option>
                  <option value="ECE">ECE</option>
                  <option value="RAI">RAI</option>
                  <option value="ARE">ARE</option>
                  <option value="MECH">MECH</option>
                  <option value="CCE">CCE</option>
                </select>
              )}
            />
            {errors.department && (
              <p className="text-sm text-red-500">
                {errors.department.message}
              </p>
            )}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-[#C50B4C]">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                disabled
                className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
              />
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-[#C50B4C]">
            Phone Number
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* College Name Field */}
        <div>
          <label className="block text-sm font-medium text-[#C50B4C]">
            College Name
          </label>
          <Controller
            name="collegeName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your college name"
                className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
              />
            )}
          />
          {errors.collegeName && (
            <p className="text-sm text-red-500">{errors.collegeName.message}</p>
          )}
        </div>

        {/* College Roll Number Field */}
        <div>
          <label className="block text-sm font-medium text-[#C50B4C]">
            College Roll Number
          </label>
          <Controller
            name="collegeRollNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your roll number"
                className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
              />
            )}
          />
          {errors.collegeRollNumber && (
            <p className="text-sm text-red-500">
              {errors.collegeRollNumber.message}
            </p>
          )}
        </div>

        {/* City Field */}
        <div>
          <label className="block text-sm font-medium text-[#C50B4C]">
            City
          </label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
              />
            )}
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* State Field */}
        <div>
          <label className="block text-sm font-medium text-[#C50B4C]">
            State
          </label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your state"
                className="w-full px-4 py-2 mt-2 border border-[#C50B4C] rounded-lg focus:ring-[#C50B4C] focus:outline-none"
              />
            )}
          />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-[#C50B4C] text-white focus:outline-none focus:ring-[#C50B4C] border border-[#C50B4C] rounded hover:shadow-md hover:bg-[#9e0a3c] hover:border-[#9e0a3c] hover:text-white transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
