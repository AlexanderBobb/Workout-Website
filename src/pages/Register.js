import {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { AppContext } from "../context";

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const [isAuthenticated, userHasAuthenticated] = useContext(AppContext); 


    const history = useHistory();
    
    useEffect(() => {
        console.log("Register");
    }, []);

    const onClickSignUp = async(event) => {
        event.preventDefault();

        console.log("onClickSignUp");

        const data = {
            username: username,
            email: email,
            password: password,
            crossdomain: true
          };
      
        axios.post(`register`, data )
            .then(res => {
                var data = res.data;
                console.log(data);
                if( data.code !== 200 )
                {
                    setMessage(data.message);
                    localStorage.setItem('login_flag', false);
                    localStorage.setItem('user_id', "");
                    userHasAuthenticated(false);
                }
                else{
                    userHasAuthenticated(true);
                    localStorage.setItem('login_flag', true);
                    localStorage.setItem('user_id', data.user_id);                                      
                    history.push("/");
                }
            })
    }

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
            <section className="flex flex-col mt-5">
                <div className="flex flex-1 items-center justify-center">
                    <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                        <form className="text-center">
                            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                                Sign-up
                            </h1>
                            <div className="py-2 text-left">
                                <input type="text" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " 
                                    placeholder="Username" 
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                    />
                            </div>
                            <div className="py-2 text-left">
                                <input type="email" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " 
                                    onChange={(event) => setEmail(event.target.value)}
                                    value={email}
                                    placeholder="Email" 
                                />
                            </div>
                            <div className="py-2 text-left">
                                <input type="password" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " 
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
                                    placeholder="Password" />
                            </div>
                            <div className="py-2">
                                <button type="submit" className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
                                    onClick={(event) => {onClickSignUp(event);}}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                       
                        <div className="text-center mt-12">
                            <span>
                                Do you have an account?
                            </span>
                            <a href="/login" className="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800"> Login</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

