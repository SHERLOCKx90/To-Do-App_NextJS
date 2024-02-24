"use client"

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTodo } from '@/api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue]= useState<string>('');

  const handleSubmitNewTodo:FormEventHandler<HTMLFormElement> = async (e)=>{
    e.preventDefault();
    await addTodo({
      id: uuidv4(), //for unique ID , we gonna use UUID --> Universal Unique ID generator.
      text: newTaskValue
    })
    setNewTaskValue(""); 
    setModalOpen(false);
    router.refresh();
  }
  return (
    <div>
      <button onClick={() => {
        setModalOpen(true);
      }} className="btn btn-primary w-full text-white font-normal">Add new task
        <AiOutlinePlus size={18} className='ml-2' />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='flex gap-2'>
            <input value={newTaskValue} onChange={(e) => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask


// video stamp --> 00:24:58