import React from 'react'
import { useState, useContext } from 'react'
import GithubContext from '../../context/githubContext';
import alertContext from '../../context/AlertContext';
import Alert from '../layout/Alert';

function UserSearch() {

    const [text, setText] = useState('');
    const {users, searchUsers, clearUsers} = useContext(GithubContext);
    const { setAlert } = useContext(alertContext);


    const handleChange = (e) => (setText(e.target.value))
    const handleSubmit = (e) => {
        e.preventDefault()

        if(text === '') return setAlert('Please Enter sonething');
        else {
            searchUsers(text)
            setText('')
        }
    }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <Alert />
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black" 
                        placeholder='Search' value={text}
                        onChange={handleChange} />
                        <button type='submit' className='absolute h-14 top-4 right-0 rounded-l-none w-36 btn btn-lg'>
                            GO
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div>
            {users.length > 0 && (
                <button onClick={clearUsers} className="btn btn-ghost btn-lg">Clear</button>
            )}
        </div>
    </div>
  )
}

export default UserSearch