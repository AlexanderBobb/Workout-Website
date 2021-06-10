import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import {
    useParams
} from "react-router-dom";

export default function WorkoutDetail() {
    const [message, setMessage] = useState("");

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [content, setContent] = useState("");

    const [workout, setWorkout] = useState({})

    let { id } = useParams();


    const history = useHistory();

    const getWorkoutDetail = useCallback(async() => {
        const data = {
            _id: id,          
        };

        var result = await axios.post(`workout/detail`, data );

        var res = result.data;
        console.log(res);

        setWorkout(res.data);
    }, [id])

    useEffect(() => {			
        getWorkoutDetail()
        // eslint-disable-next-line no-use-before-define
    }, [getWorkoutDetail]);

	return (
        <div>
            {   
                message !== "" &&
                <div className="text-center flex justify-center">
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative lg:max-w-xl sm:max-w-md w-full" role="alert">                    
                        <span class="block sm:inline">{message}</span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                </div>
            }
            <section className="flex flex-col">
                <div className="flex flex-1 items-center justify-center">
                    <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                        <form className="text-center">
                            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                                Detail Workout
                            </h1>
                            <div className="py-2 text-left">
                                <input type="text" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Title"                                     
                                    value={workout.title}
                                    />
                            </div>
                            <div className="py-2 text-left">
                                <input type="text" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Time" 
                                    onChange={(event) => setTime(event.target.value)}
                                    value={workout.time}
                                    />
                            </div>
                            <div className="py-2 text-left">
                                <input type="text" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Difficulty"                                     
                                    value={workout.difficulty}
                                    />
                            </div>
                            <div className="py-2 text-left">
                                <textarea type="text" rows="5" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Workout Content"                                
                                    value={workout.content}
                                >   
                                </textarea>
                            </div>
                       
                        </form>
                       
                    </div>
                </div>
            </section>
        </div>
    );
}

