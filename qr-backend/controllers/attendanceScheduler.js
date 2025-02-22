const Attendance = require('../model/attendanceModel');
const Student = require('../model/studentModel');
const cron = require('node-cron');


const periods = [
  { start: "09:20", end: "09:55", period: 1 },
  { start: "10:20", end: "10:55", period: 2 },
  { start: "11:20", end: "11:55", period: 3 },
  { start: "13:00", end: "13:30", period: 4 },
  { start: "14:10", end: "14:30", period: 5 },
  { start: "15:10", end: "15:30", period: 6 },
  { start: "16:00", end: "16:25", period: 7 },
];


const checkAndMarkAbsentees = async () => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const dayOfWeek = now.toLocaleString('en-us', { weekday: 'long' });

  console.log(`[${new Date().toISOString()}] Starting absentee check...`);

  try {
   
    const students = await Student.find();
console.log(students)
    for (const student of students) {
      for (const { period } of periods) {
     
        const existingAttendance = await Attendance.findOne({
          rollNumber: student.rollNumber,
          date: today,
          period,
        });

        
        if (!existingAttendance) {
          const absentAttendance = new Attendance({
            rollNumber: student.rollNumber,
            date: today,
            dayOfWeek,
            period,
            start: null, 
            end: null,   
            status: 'Absent',
          });

          await absentAttendance.save();
        }
      }
    }

    console.log(`[${new Date().toISOString()}] Absentee check completed successfully.`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error checking and marking absentees:`, err);
  }
};


cron.schedule('30 16 * * *', () => {
    console.log(`[${new Date().toISOString()}] Running scheduled absentee check at 4:30 PM.`);
    checkAndMarkAbsentees();
  });


module.exports = {
  checkAndMarkAbsentees,
};
