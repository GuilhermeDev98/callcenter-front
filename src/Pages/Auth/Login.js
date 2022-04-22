import { useState } from 'react'
import Api from '../../Services/Api';
import { useHistory } from "react-router-dom";
import Axios from 'axios'

const Login = ({ location }) => {

  let history = useHistory();
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  const GetWebphoneUrl = async (ramal: 1000) => {

  }

  const HandleLogin = async () => {
    try {
      //const { data, status } = await Api.post('auth/login', { email, password })
      const webphoneUrl = await Axios.get(`https://voice-api.zenvia.com/webphone?ramal=1000`, {}, {'Access-Token': '44537239cdf17a743548c50edd75351a'})
      console.log(webphoneUrl)

      //if (status === 200 && data.data.token)
        //localStorage.setItem("call@token", data.data.token)
        //return history.push('/dashboard')


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <form>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input type="text" name="email" placeholder="E-Mail" onChange={(e) => SetEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" placeholder="Senha" onChange={(e) => SetPassword(e.target.value)} />
        </div>
      </form>
      <button onClick={() => HandleLogin()}>logar</button>
    </>
  )
}

export default Login
