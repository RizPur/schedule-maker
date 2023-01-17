import React, { useState } from "react";
// import { render } from "react-dom";
import { useRef } from "react";
// import PrettyTable from "prettytable-react";

function Schedule() {
  const [employees, setEmployees] = useState([
    { name: "John", vacationDays: [] },
    { name: "Jane", vacationDays: [] },
    { name: "Bob", vacationDays: [] },
    { name: "Sara", vacationDays: [] },
    { name: "Alex", vacationDays: [] },
  ]);
  const [schedule, setSchedule] = useState({});
  const tableRef = useRef();

  const handleVacationDaysChange = (e, index) => {
    const newEmployees = [...employees];
    newEmployees[index].vacationDays = e.target.value
      .split(",")
      .map((day) => parseInt(day));
    setEmployees(newEmployees);
  };

  const generateSchedule = () => {
    // Number of working shifts
    const shifts = 8;

    // Number of working hours per shift
    const hoursPerShift = 8;

    // Total number of working hours per week
    const totalHours = 40;

    // Create a schedule dictionary
    let schedule = {};

    // Initialize the schedule with empty lists for each employee
    for (let employee of employees) {
      schedule[employee.name] = [];
    }

    // Assign hours to each employee until all employees have reached 40 hours
    while (
      Object.values(schedule).reduce(
        (acc, val) => acc + val.length,
        0
      ) < employees.length * totalHours
    ) {
      // Pick a random employee and a random shift
      let employee = employees[Math.floor(Math.random() * employees.length)];
      let shift = Math.floor(Math.random() * shifts) + 1;

      // If the employee has not reached their weekly hour limit and the shift is not in their vacation days
      if (
        schedule[employee.name].length + hoursPerShift <= totalHours &&
        !employee.vacationDays.includes(shift)
      ) {
        schedule[employee.name].push(shift);
      }
    }
    setSchedule(schedule);
  };

   return (
    <div>
      {employees.map((employee, index) => (
        <div key={employee.name}>
          <label>
            {employee.name} vacation days:
            <input
              type="text"
              onChange={(e) => handleVacationDaysChange(e, index)}
            />
          </label>
        </div>
      ))}
      <button onClick={generateSchedule}>Generate Schedule</button>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(schedule).map((employee) => (
            <tr key={employee}>
              <td>{employee}</td>
              {schedule[employee].map((shift, index) => (
                <td key={index}>{shift}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;