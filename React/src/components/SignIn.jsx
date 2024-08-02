import { useState, useEffect} from 'react';
 
function SignIn(props) {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [wrongCredentials, setWrongCredentials] = useState(false);

    useEffect(
      () => {
        if(localStorage.getItem('token')) {
          props.setSignedIn(true);
        }
      }, []
    )

    const signIn = () => {
        props.setSignedIn(true);
 
          const encodedString = btoa(username + ':' + password);
          
          fetch('https://w21030911.nuwebspace.co.uk/coursework/token',
            {
              method: 'GET',
              headers: new Headers( { "Authorization": "Basic " + encodedString })
            }
          )
          .then(response => {
              console.log(response)
              if(response.status === 200) {
                //toast
                  props.setSignedIn(true);
              } else{
                setWrongCredentials(true);
              }
              return response.json()
          })
          .then(data => {
              console.log(data)
              if (data.token) {
              localStorage.setItem('token', data.token);
              } else{
                props.setSignedIn(false);
              }
          })
          .catch(error => console.log(error)); 
    }
    const signOut = () => {
      setUsername("");
      setPassword("");
      localStorage.removeItem('token');
      props.setSignedIn(false);
    }

    const handleUsername = (event) => {setUsername(event.target.value)}
    const handlePassword = (event) => {setPassword(event.target.value)}

    const bgColour = (wrongCredentials) ? "bg-red-500" : "bg-slate-100"

    return (
      <div className='bg-slate-800 p-2 text-md text-right'>
          { !props.signedIn && <div>
              <input 
                type="text" 
                placeholder='username' 
                className={'p-1 mx-2 rounded-md' + bgColour}
                value={username}
                onChange={handleUsername}
              />
              <input 
                type="password" 
                placeholder='password' 
                className={'p-1 mx-2 rounded-md' + bgColour}
                value={password}
                onChange={handlePassword}
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