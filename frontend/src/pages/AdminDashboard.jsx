
import {useState, useEffect} from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [forms, setForms] = useState({
        name:"",
        email:"",
        password:"",
        role:""
    });

    const [user,setUsers] = useState([]);

    useEffect(()=>{
        fetchUsers();
    },[]) 
    const token = localStorage.getItem('token');
    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5001/users/all', {
            headers: {
                'Authorization': token
            }
        });
        setUsers(res.data);
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5001/users/delete/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        fetchUsers();
    };

    const handleChange = (e) =>{
        setForms({...forms,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const res = await axios.post('http://localhost:5001/auth/register',forms,{
            headers:{
                'Authorization': token
            }
        })
        if(res.data.message === 'User Registered Successfully'){
            fetchUsers();
        }
    }
    fetchUsers();

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Register New User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={forms.name} onChange={handleChange} /><br/>
                <input type="email" name="email" placeholder="Email" value={forms.email} onChange={handleChange} /><br/>
                <input type="password" name="password" placeholder="Password" value={forms.password} onChange={handleChange} /><br/>
                <input type="text" name="role" placeholder="Role (admin/manager/employee)" value={forms.role} onChange={handleChange} /><br/>
                <button type="submit">Register</button>
            </form>
            <h2>All Users</h2>

<table border="1" cellPadding="8" cellSpacing="0" width="100%">
    <thead>
        <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
        {user.map((u, index) => (
            <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                    <button onClick={() => deleteUser(u._id)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
}

export default AdminDashboard;