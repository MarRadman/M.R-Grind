import React , { useState, useEffect } from 'react'
import config from "../../config"
import { DayWorkout } from '../../type';
import '../assets/appview.css';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [WorkoutData, setWorkoutData] = useState<DayWorkout>();
  const [loading , setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputValueNumber = Number(inputValue);
    if (inputValueNumber < 1 || inputValueNumber > 420) {
      alert("Please enter a number between 1 and 420.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${config.apiUrl}day/${inputValue}`)
      const data = await response.json()
      if (data.length > 0) {
        console.log(data[0]);
        setTimeout(() => {
          setLoading(false);
          setWorkoutData(data[0])
        }, 2000);
      } else {
        console.error('No data received from API');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <input type="number" min="1" max="420" placeholder='1 to 420' onChange={(event) => setInputValue(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {WorkoutData && (
        <div className='selectedDayWorkout'>
          <h3>Warmup:</h3>
            {WorkoutData.warmup.map((exercise: string, id: number) => (
              <p key={id}>{exercise}</p>
            ))}
          <h3>Strength:</h3>
            {WorkoutData.strength.map((exercise: string, index: number) => (
              <p key={index}>{exercise}</p>
            ))}
          <h3>Cardio:</h3>
            {WorkoutData.workout_cardio.map((exercise: string, index: number) => (
              <p key={index}>{exercise}</p>
            ))}
          <h3>Accessory:</h3>
            {WorkoutData.accessory.map((exercise: string, index: number) => (
              <p key={index}>{exercise}</p>
            ))}
          <h3>Bonus:</h3>
            {WorkoutData.bonus.map((exercise: string, index: number) => (
              <p key={index}>{exercise}</p>
            ))}
        </div>
      )}
        {loading && <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}
    </React.Fragment>
  )
}

export default App
