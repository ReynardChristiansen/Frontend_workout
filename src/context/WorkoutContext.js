import {createContext, useState, useEffect} from 'react'

export const WorkoutContext = createContext()

export const WorkoutContextProvider = (props)=>{
    const [workout, setWorkout] = useState(null)
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://api-workout.vercel.app/api/workouts');
            const data = await response.json();

            if (response.ok) {
                setWorkout(data);
            }
        };

        fetchWorkouts();

    }, );

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://api-workout.vercel.app/api/workouts');
            const data = await response.json();

            if (response.ok) {
                setWorkout(data);
            }
        };

        fetchWorkouts();

    }, setWorkout);

    const contextValue = {
        workout, 
        setWorkout
    };


    return (
        <WorkoutContext.Provider value={contextValue}>
            {props.children}
        </WorkoutContext.Provider>
    )
}