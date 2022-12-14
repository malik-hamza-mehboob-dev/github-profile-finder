import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children}) => {

    const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    const initialState = {
        users: [],
        user: {},
        loading: false,
    }

    const [state,dispatch] = useReducer(githubReducer,initialState);
    
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })


        const {items} = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })


    }

    const getUser = async (login) => {
        setLoading()
        
        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status === 404) return window.location = '/notfound'
        else{
            
            const data = await response.json();

            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
    }

    const fetchUsers = async () => {
        setLoading();
        const response = await fetch(`${GITHUB_URL}/users`,{
                headers:{
                    Authorization: `token ${GITHUB_TOKEN}`
                }
        })

        const data = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: data,
        })
    }

    const setLoading = () => (dispatch({type: 'SET_LOADING'}))
    const clearUsers = () => (dispatch({type: 'CLEAR_USERS'}))

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser
    }}>
        {children}
    </GithubContext.Provider>
}


export default GithubContext

