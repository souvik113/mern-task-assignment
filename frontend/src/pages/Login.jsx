import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email, password);
    const handleLogin = async (e) => {
        const res = await axios.post('http://localhost:5001/auth/login', {email, password});
        console.log(res.data);
        if(res.data.message === 'Login Successful'){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('id',res.data.id)
            localStorage.setItem('role', res.data.role);
            // console.log(res.data.role)
            if(res.data.role === 'admin'){
                navigate('/AdminDashboard');
            }else if(res.data.role === 'manager'){
                navigate('/ManagerDashboard');
            }else if(res.data.role === 'employee'){
                console.log('employee');
                navigate('/EmployeeDashboard');
            }
        } else {
            alert('Login failed');
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;