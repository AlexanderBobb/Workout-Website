import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

import {
    useParams
} from "react-router-dom";

export default function Workout() {
    const [worklist, setWorklist] = useState([]);
    let { category } = useParams();
    console.log(category);

    const getWorkoutList = useCallback(async() => {
        const data = {
            category: category,          
        };

        var result = await axios.post(`workout/category`, data );

        var res = result.data;
        console.log(res);

        setWorklist(res.list);
    }, [category])

    useEffect(() => {			
        getWorkoutList()
        // eslint-disable-next-line no-use-before-define
    }, [getWorkoutList]);

    return (
        <div>
            <div class="text-center">
                <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">{category}</h1>
            </div>
            <div class="flex justify-center">
                <div className="w-64 text-right">                    
                    <button class="bg-blue-500 px-4 py-1 text-xs font-semibold tracking-wider text-white inline-flex items-center space-x-2 rounded hover:bg-blue-600">
                        <span>                            
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
                        </span>
                        <span>
                            <a href={"/add/workout/" + category} className="text-base">Add</a>
                        </span>
                    </button>
                </div>
            </div>
            <div className="pt-1 flex justify-center font-sans">                
                <div className="rounded bg-gray-200 w-64 p-2">
                    <div className="text-sm">
                       {
                            worklist && worklist.map((item, key) => {
                                return (
                                    <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter" key={key}>
                                        <a href={"/detail/workout/" + item._id} className="text-base font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                                            {key + 1}. {item.title}
                                        </a>
                                    </div>            
                                )
                            })
                        }                     
                    </div>
                </div>
            </div>
        </div>
    )
}