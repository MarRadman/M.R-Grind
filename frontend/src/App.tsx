import React , { useState, useEffect } from 'react'
import config from "../config"
import { DayWorkout } from '../type';

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [WorkoutData, setWorkoutData] = useState<DayWorkout>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputValueNumber = Number(inputValue);
    if (inputValueNumber < 1 || inputValueNumber > 420) {
      alert("Please enter a number between 1 and 420.");
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}day/${inputValue}`)
      const data = await response.json()
      if (data.length > 0) {
        console.log(data[0]);
        setWorkoutData(data[0]);
      } else {
        console.error('No data received from API');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <h1>M.R GRIND</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <input type="number" min="1" max="420" placeholder='1 to 420' onChange={(event) => setInputValue(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {WorkoutData && (
        <div>
          <h3>Warmup:
            {WorkoutData.warmup.map((exercise: string, id: number) => (
              <div key={id}>{exercise}</div>
            ))}
          </h3>
          <h3>Strength:
            {WorkoutData.strength.map((exercise: string, index: number) => (
              <div key={index}>{exercise}</div>
            ))}
          </h3>
          <h3>Cardio:
            {WorkoutData.workout_cardio.map((exercise: string, index: number) => (
              <div key={index}>{exercise}</div>
            ))}
          </h3>
          <h3>Accessory:
            {WorkoutData.accessory.map((exercise: string, index: number) => (
              <div key={index}>{exercise}</div>
            ))}
          </h3>
          <h3>Bonus:
            {WorkoutData.bonus.map((exercise: string, index: number) => (
              <div key={index}>{exercise}</div>
            ))}
          </h3>
        </div>
      )}
    </React.Fragment>
  )
}

export default App
