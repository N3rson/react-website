import { useState, useEffect } from 'react';
 
function SignIn(props) {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorSigningIn, setErrorSigningIn] = useState(false);
    const inputColor = errorSigningIn ? 'bg-red-100' : 'bg-slate-100';

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.setSignedIn(true);
            //not working yet!
            getFavourites(localStorage.getItem('token'))
            console.log(props.favourites)
            }
        }, []);

    const signIn = () => {
 
        const encodedString = btoa(username + ':' + password)

        fetch('https://w21030911.nuwebspace.co.uk/coursework/token',
            {
                method: 'GET',
                headers: new Headers( { "Authorization": "Basic " + encodedString })
            }
        )
        .then(response => {
            console.log(response)
            if(response.status === 200) {
                props.setSignedIn(true);
            } else {
                setErrorSigningIn(true);
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.token) {
                localStorage.setItem('token', data.token);
                //does work but doesnt work on useeffect
                getFavourites(data.token)
                console.log(props.favourites)
            }
        })
        .catch(error => console.log(error))
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setUsername('');
        setPassword('');
        props.setSignedIn(false);
      }
 
      const getFavourites = ($token) => {
        fetch('https://w21030911.nuwebspace.co.uk/coursework/favourites',
          {
            method: 'GET',
            headers: new Headers({ "Authorization": "Bearer "+$token })
          })
         .then(response => response.json())
         .then(data => { props.setFavourites(data) })
         .catch(error => console.log(error))
       }

    return (
        <div className='bg-slate-800 p-2 text-md text-right'>
            { !props.signedIn && <div>
                <input 
                 type="text" 
                 placeholder='username' 
                 className={'p-1 mx-2 rounded-md' + inputColor}
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                 type="password" 
                 placeholder='password' 
                 className={'p-1 mx-2 rounded-md' + inputColor}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                 type="submit" 
                 value='Sign In' 
                 className='py-1 px-2 mx-2 bg-green-100 hover:bg-green-500 rounded-md'
                 onClick={signIn}
                />
            </div>
            }
            { props.signedIn && <div>
                <input 
                 type="submit" 
                 value='Sign Out' 
                 className='py-1 px-2 mx-2 bg-green-100 hover:bg-green-500 rounded-md'
                 onClick={signOut}
                />
            </div>
            }
        </div>
    )
}
 
export default SignIn;