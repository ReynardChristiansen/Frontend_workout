import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { Link } from "react-router-dom";

const WorkoutDetails = ({ workout }) => {
    const { setWorkout } = useContext(WorkoutContext);

    const handleDelete = async () => {
        const response = await fetch('https://api-workout.vercel.app/api/workouts/' + workout._id, {
            method: 'DELETE'
        });

        if (response.ok) {
            const fetchWorkouts = async () => {
                const response = await fetch('https://api-workout.vercel.app/api/workouts');
                const data = await response.json();
                if (response.ok) {
                    setWorkout(data);
                }
            };
            fetchWorkouts();
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            
            <div className="button-container-red" onClick={handleDelete}>
                <strong>delete</strong>
            </div>

            <div className="button-container-yellow">
                <Link to={`/Update/${workout._id}`} className="button-container-blue" ><strong>update</strong></Link>
            </div>

        </div>
    );
}

export default WorkoutDetails;
