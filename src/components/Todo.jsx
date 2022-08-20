import React, {useState} from 'react'
import { BsFillTrashFill } from "react-icons/bs"
import Modal from 'react-bootstrap/Modal';
import { Button} from 'react-bootstrap';

function Todo() {
  const[task, settask]=useState([]);
  const[taskname, settaskname]=useState("");
  const[desc, setdesc]=useState("");
  const[date, setdate]=useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createtask=(e)=>{
    e.preventDefault();
    let data={
               id: new Date().getTime(), 
               name:taskname,
               descrition:desc,
               date:date,
               completed:false
             }
    console.log(data)
     settask([...task,data]);
     settaskname("");
     setdesc("");
     setdate("");
  }
  const checkfunction=(id)=>{
      let updatedtask= [...task].filter((ele)=>
      {
             if(ele.id==id){
             ele.completed=!ele.completed
      }
      return ele
    })
  settask(updatedtask)
  }
  const deleteFunction=(id)=>{
      let updatedtask= [...task].filter((ele)=>ele.id!==id)
      settask(updatedtask)
  }
 
  return (
     <div className='totalq'>
       <div className='form1'>
         <div className='header'>
           <h3 >React Todo app</h3>
           <h6 >Create a todo list</h6>
         </div>
           <div className="button1">
              <Button variant="primary" onClick={handleShow}>Create a Task</Button>
           </div>
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create a Todo Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <form className='mt-3'>
                      <label>Task name</label>
                      <input  type='text' className='form-control' value={taskname}
                       onChange={(e)=>settaskname(e.target.value)}/>
                      <br/>
                      <label>Description</label>
                      <input  type='text' className='form-control' value={desc} 
                       onChange={(e)=>setdesc(e.target.value)} />
                      <br/>
                      <label>Date</label>
                      <input  type='date' className='form-control' value={date}
                       onChange={(e)=>setdate(e.target.value)}/>
                   </form>
                </Modal.Body>
                <Modal.Footer>
                   <Button variant="secondary" onClick={handleClose}>Close</Button>
                   <button onClick={createtask}  className='btn btn-primary' >Create Task</button>
                </Modal.Footer>
             </Modal>
           </div>
      {
        task.map((ele)=>{
            let date1 = new Date();
            let datePassed;
            let date2 = new Date(ele.date);
            date2.setDate (date2.getDate () + 1);
            if (date1.getTime() < date2.getTime()) {
                datePassed = false }
            else
             if (date1.getTime() > date2.getTime()) {
            datePassed = true
          };
          
        return(
        <div key={ele.id} className="taskdiv"style={{
                                                      border:datePassed === true && ele.completed === false
                                                       ? "2px solid red"
                                                       : "2px solid #007ACC",
                                                   }}>
        <input className='check' type='checkbox' onClick={()=>checkfunction(ele.id)}/>
        <div className='name'  style={{
                                       textDecoration:
                                       ele.completed === true
                                       ? "line-through"
                                       : "none",
                            }}>{""}{ele.name}
        </div>
        <br/>
        <div className='description' style={{
                                        textDecoration:
                                        ele.completed === true
                                        ? "line-through"
                                        : "none",
                            }}>{"Description:  "+ele.descrition}
        </div>
        <br/>
        <div className='date' style={{
                                      textDecoration:
                                      ele.completed === true
                                      ? "line-through"
                                      : "none",
                            }}>{"Date: "+ ele.date}{""}
        </div>
        <p style={{display:datePassed === true
                  ? "true"
                  : "None"}}>due date is Passed</p>
        <p className="para" style={{display:datePassed === true
                  ? "none"
                  : "true"}}>Good to Go</p>
        <br/>
        <button className='btn btn-primary' onClick={()=>deleteFunction(ele.id)}>
          Delete <BsFillTrashFill/>
        </button>
        </div>
        )
      }
    )
  }
  </div>
  )
}
export default Todo