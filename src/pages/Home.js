import { useContext } from "react";

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { WorkoutContext } from "../context/WorkoutContext";

const Home = () => {
    const { workout, setWorkout } = useContext(WorkoutContext)


    return (
        <div className="home">
            <div className="workouts">
                {workout && 
                    workout.map((item, index) => (
                        <WorkoutDetails key={item.id} workout={item}/>
                    ))
                }
            </div>
            <WorkoutForm />
        </div>


    );
};

export default Home;
