import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Register(){
    const navigate = useNavigate();
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:"",
        role:""
    })

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const res = await axios.post('http://localhost:5001/auth/register',form)
        // alert('Registration Successful')
        if(res.data.message === 'User Registered Successfully'){
            navigate('/login');
        }
    }
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br/>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
                <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} /><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register;