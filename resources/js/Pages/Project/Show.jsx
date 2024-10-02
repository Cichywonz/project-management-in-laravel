import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";
export default function Show({auth, project, tasks, queryParams}){
    return(
        <Authenticated
            user={auth.user}
            header={
                <h2 className=" font-semibold text-x1 text-gray-800
                dark:text-gray-200 teading-tight">
                    {`Project "${project.name}"`}
                </h2>
            }
        >
            <Head title={`Project "${project.name}"`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" text-gray-900 dark:text-gray-100">
                            <img 
                                src={project.image_path}
                                alt=""
                                className="w-full h-64 object-cover"/>
                        </div>
                        <div className="  ml-4 grid gap-1 grid-cols-2 mt-2 text-gray-400">
                            <div>
                                <div className=" -mb-2">
                                    <label className="font-bold text-lg">Project Id</label>
                                    <p className="mt-1">{project.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Project Name</label>
                                    <p>{project.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Project Status</label>
                                    <p>
                                        <span className={"px-2 py-1 rounded text-white "+
                                            PROJECT_STATUS_CLASS_MAP[project.status]}
                                            >
                                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Author</label>
                                    <p>{project.createdBy.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Due Date</label>
                                    <p>{project.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="font-bold text-lg">Author</label>
                                    <p>{project.createdBy.name}</p>
                                </div>
                                <div className="mt-4 ">
                                    <label className="font-bold text-lg">Created At</label>
                                    <p>{project.created_at}</p>
                                </div>   
                            </div>
                            <div>
                                <div>
                                    <label className="font-bold text-lg">Description</label>
                                    <p>{project.description} </p>
                                </div>
                            </div>
                        </div>        
                    </div>
                    
                </div>
            </div>     

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-gray-400 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">       
                       <TasksTable tasks={tasks} queryParams={queryParams}/>
                    </div>
                </div>
            </div>      
        </Authenticated>
    );
}