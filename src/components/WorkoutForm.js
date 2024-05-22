import { useState, useContext } from 'react'
import { WorkoutContext } from "../context/WorkoutContext";

const WorkoutForm = () => {
  const { setWorkout } = useContext(WorkoutContext)
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workouts = {title, load, reps}
    
    const response = await fetch('https://api-workout.vercel.app/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workouts),
      headers: {
        'Content-Type': 'application/json'
      }
    })


    if (response.ok) {
      setError("Success")
      setTitle('')
      setLoad('')
      setReps('')

      const fetchWorkouts = async () => {
        const response = await fetch('https://api-workout.vercel.app/api/workouts');
        const data = await response.json();

        if (response.ok) {
            setWorkout(data);
        }

        fetchWorkouts();
    };


    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm