import { useEffect, useState } from "react";
import axios from "axios";
function EmployeeDashboard(){


    const [tasks,setTasks] = useState([]); 
    
        useEffect(()=>{
            fetchTask();
        },[])
    
        const fetchTask = async()=>{
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('id');
            const payload = JSON.parse(atob(token.split('.')[1]));
            // const userId = payload.id;
    
            const res = await axios.get(`http://localhost:5001/tasks/assigned/${id}`,{
                headers:{
                    Authorization: token   
                }
            });
            console.log(res.data);
            setTasks(res.data)
        }

    return (
    <div>
        <h1>Employee Dashboard</h1>

        <h2>Assigned Tasks</h2>
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <tr key={task._id}>
                        <td>{index + 1}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.priority}</td>
                        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                        <td>{task.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default EmployeeDashboard