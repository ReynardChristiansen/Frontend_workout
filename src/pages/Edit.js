import { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const WorkoutForm = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // Change initial state to null
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://api-workout.vercel.app/api/workouts/' + id);
      const final = await response.json();

      if (response.ok) {
        setData(final);
        setTitle(final.title);
        setLoad(final.load);
        setReps(final.reps);
      }
    };

    fetchWorkouts();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workouts = { title, load, reps };

    const response = await fetch('https://api-workout.vercel.app/api/workouts/' + id, {
      method: 'PATCH',
      body: JSON.stringify(workouts),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
        navigate('/');
    }
  }

  return (
    <div>
      {data && (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Update a Workout</h3>

          <label>Exercise Title:</label>
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

          <button>Update Workout</button>

        </form>
      )}
    </div>
  )
}

export default WorkoutForm;
