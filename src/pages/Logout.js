import {useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { AppContext } from "../context";

export default function Logout() {
    const [isAuthenticated, userHasAuthenticated] = useContext(AppContext); 

    const history = useHistory();

    useEffect(() => {
        localStorage.setItem('login_flag', false);
		localStorage.setItem('user_id', "");	
        
        userHasAuthenticated(false);
        history.push("/login");        
    }, []);

	return (
        <div>
        </div>
    );
}

