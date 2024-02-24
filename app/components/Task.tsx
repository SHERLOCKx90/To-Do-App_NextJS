'use client'

import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import Modal from './Modal'
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { TiDelete } from "react-icons/ti";

interface TaskProps {
    task: ITask
}


const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id, //for unique ID , we gonna use UUID --> Universal Unique ID generator.
            text: taskToEdit,
        })
        //setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
    }
    return (
        <tr key={task.id}>
            <td className="w-full">{task.text}</td>
            <td className="flex flex-row gap-5">
                <FiEdit onClick={() => {
                    setOpenModalEdit(true)
                }} size={20} className='text-blue-600 hover:cursor-pointer' />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Edit task</h3>
                        <div className='flex gap-2'>
                            <input value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </Modal>
                <LuTrash2 onClick={() => {
                    setOpenModalDeleted(true);
                }} size={20} className='text-red-600 hover:cursor-pointer' />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <div className="flex flex-row gap-1"><TiDelete className='text-red-500' size={30} /><span></span>
                        <h3 className="text-lg">Are you sure, you want to delete this task?</h3></div>

                    <div className="modal-action">
                        <button onClick={() => {
                            handleDeleteTask(task.id);
                        }} className="btn hover:bg-red-500">Yes</button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task
