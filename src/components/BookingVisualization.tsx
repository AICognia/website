import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaClock, FaCalendarCheck } from 'react-icons/fa';

interface Appointment {
  id: number;
  time: string;
  name: string;
  service: string;
  value: string;
}

interface BookingVisualizationProps {
  industry: 'healthcare' | 'hospitality';
}

const BookingVisualization: React.FC<BookingVisualizationProps> = ({ industry }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [latestBooking, setLatestBooking] = useState<Appointment | null>(null);
  const [totalValue, setTotalValue] = useState(0);

  const healthcareAppointments = [
    { time: '9:00 AM', name: 'Sarah J.', service: 'Dental Cleaning', value: '$150' },
    { time: '10:30 AM', name: 'Michael R.', service: 'Consultation', value: '$200' },
    { time: '2:00 PM', name: 'Emily K.', service: 'Root Canal', value: '$1,200' },
    { time: '3:30 PM', name: 'David L.', service: 'Filling', value: '$350' },
    { time: '4:30 PM', name: 'Jessica M.', service: 'Implant Consult', value: '$500' }
  ];

  const hospitalityAppointments = [
    { time: 'Check-in: 3PM', name: 'Robert H.', service: 'King Suite', value: '$299/night' },
    { time: 'Check-in: 4PM', name: 'Lisa T.', service: 'Double Room', value: '$199/night' },
    { time: 'Check-in: 5PM', name: 'James W.', service: 'Presidential Suite', value: '$599/night' },
    { time: 'Check-in: 6PM', name: 'Anna S.', service: 'Family Room', value: '$249/night' },
    { time: 'Check-in: 7PM', name: 'Mark D.', service: 'Executive Suite', value: '$399/night' }
  ];

  const appointmentData = industry === 'healthcare' ? healthcareAppointments : hospitalityAppointments;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < appointmentData.length) {
        const newAppointment = { ...appointmentData[index], id: Date.now() };
        setAppointments(prev => [...prev, newAppointment]);
        setLatestBooking(newAppointment);
        
        // Calculate total value
        const value = parseInt(newAppointment.value.replace(/[$,\/night]/g, ''));
        setTotalValue(prev => prev + value);
        
        index++;
      } else {
        // Reset after showing all appointments
        setAppointments([]);
        setTotalValue(0);
        index = 0;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [industry]);

  // Get current date
  const currentDate = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = currentDate.getDate();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Calendar View */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">{currentMonth} {currentYear}</h3>
          <div className="flex items-center gap-2">
            <FaCalendarCheck className="text-cyan-400" />
            <span className="text-cyan-400 font-semibold">Booking Confirmed</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center text-xs text-gray-400 font-semibold p-2">
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded-lg transition-all ${
                day === null 
                  ? '' 
                  : day === today 
                    ? 'bg-cyan-600 text-white font-bold' 
                    : appointments.length > 0 && day === today + 1
                      ? 'bg-green-600 text-white animate-pulse'
                      : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Latest Booking Alert */}
        <AnimatePresence>
          {latestBooking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-600/20 border border-green-500/30 rounded-lg p-3"
            >
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-400" />
                <div className="flex-1">
                  <p className="text-green-100 font-semibold">{latestBooking.name}</p>
                  <p className="text-green-200 text-sm">{latestBooking.time} • {latestBooking.service}</p>
                </div>
                <span className="text-green-300 font-bold">{latestBooking.value}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Appointments List */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">
            {industry === 'healthcare' ? "Today's Appointments" : "Today's Bookings"}
          </h3>
          <div className="bg-cyan-600/20 px-3 py-1 rounded-full">
            <span className="text-cyan-300 font-semibold">
              {appointments.length} {industry === 'healthcare' ? 'Patients' : 'Guests'}
            </span>
          </div>
        </div>

        {/* Appointments Feed */}
        <div className="space-y-3 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-800">
          <AnimatePresence>
            {appointments.map(appointment => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-black/40 rounded-lg p-3 border border-gray-700 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-cyan-400" />
                    <div>
                      <p className="text-white font-semibold">{appointment.name}</p>
                      <p className="text-gray-400 text-sm">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-300 font-bold">{appointment.value}</p>
                    <p className="text-gray-500 text-xs">{appointment.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Total Value */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Total Booked Value</span>
            <motion.span 
              key={totalValue}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-cyan-300"
            >
              ${totalValue.toLocaleString()}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingVisualization;
