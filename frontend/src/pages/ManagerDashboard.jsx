import { useState, useEffect } from 'react';
import axios from 'axios';
// import { propfind } from '../../../backend/routes/taskRoutes';

function ManagerDashboard(){
    const [form,setForm] = useState({
        title:"",
        description:"",
        assignedEmployee:"",
        priority:"",
        dueDate:"",
        createdBy:""
    })
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const data ={
        ...form,
        createdBy: localStorage.getItem('id')
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const createBy = localStorage.getItem('id');
        const token = localStorage.getItem('token')
        const res = await axios.post('http://localhost:5001/tasks/create',data,{
            headers:{
                Authorization: token
            }
        })
        alert('Task Created Successfully')
        fetchTask();
    }
    const [tasks,setTasks] = useState([]); 

    useEffect(()=>{
        fetchTask();
    },[])

    const fetchTask = async()=>{
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const id = localStorage.getItem('id');
        const userId = payload.id;

        const res = await axios.get(`http://localhost:5001/tasks/assigned/${id}`,{
            headers:{
                Authorization: `${token}`    
            }
        });
        console.log(res.data);
        setTasks(res.data);
    }

    const [updateData, setUpdateData] = useState({
        status: "",
        dueDate: ""
    });
    const handleUpdate = async (taskId, status, dueDate) => {
        
    try {

        const token = localStorage.getItem('token');

        await axios.put(
            `http://localhost:5001/tasks/update/${taskId}`,

            {
                status: status,
                dueDate: dueDate
            },

            {
                headers: {
                    Authorization: token
                }
            }
        );

        alert("Task Updated Successfully");

        fetchTask();

    } catch (error) {
        console.log(error.response?.data || error.message);
    }


}
const handleDelete = async (taskId) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(
            `http://localhost:5001/tasks/delete/${taskId}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        alert("Task Deleted Successfully");
        fetchTask();
    } catch (error) {
        console.log(error.response?.data || error.message);
    }


}
    
return (
    <div>
        <h1>Manager Dashboard</h1>

        <h2>Create New Task</h2>

        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
            <br />
            <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <br />
            <input type="text" name="assignedEmployee" placeholder="Assigned Employee ID" value={form.assignedEmployee} onChange={handleChange}/>
            <br />
            <input type="text" name="priority" placeholder="Priority" value={form.priority} onChange={handleChange}/>
            <br />
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange}/>
            <br />
            <button type="submit">Create Task</button>
        </form>

        <h2>Assigned Tasks</h2>

        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
            <thead>
                <tr>
                    <th>SL</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Assigned Employee</th>
                    <th>Status</th>
                    <th>Actions</th>
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
                        <td>{task.assignedEmployee._id}</td>
                        <td>{task.status}</td>

                        <td>
                            <select
                                onChange={(e) =>
                                    setUpdateData({
                                        ...updateData,
                                        [task._id]: {
                                            ...updateData[task._id],
                                            status: e.target.value
                                        }
                                    })
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <input type="date" onChange={(e) => setUpdateData({
                                            ...updateData,
                                            [task._id]: {
                                            ...updateData[task._id],
                                            dueDate: e.target.value
                                        }
                                    })
                                }
                            />

                            <button
                                onClick={() =>
                                    handleUpdate(
                                        task._id,
                                        updateData[task._id]?.status,
                                        updateData[task._id]?.dueDate
                                    )
                                }
                            >
                                Update Task
                            </button><br/>
                            <button onClick={() => handleDelete(task._id)}>Delete Task</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        
    </div>
);

}

export default ManagerDashboard