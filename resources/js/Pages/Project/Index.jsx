import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
export default function Index({auth, projects, queryParams = null, success}){
    
    queryParams = queryParams || {}
    const searchFileldChanged = (name, value) =>{
        if(value){
            queryParams[name]=value
        }else{
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams)
    }

    const sortChanged = (name) =>{
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === "asc"){
                queryParams.sort_direction = "desc";
            }else{
                queryParams.sort_direction = "asc";
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('project.index'), queryParams)
    };

    const deleteProject = (project) =>{
        if(!window.confirm('Delete this project')){
            return;
        }
        router.delete(route('project.destroy', project.id))
    }

    return(
        <Authenticated
            user={auth.user}
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-x1 text-gray-800
                        dark:text-gray-200 leading-tight">
                            Projects
                        </h2>
                        <Link 
                        href={route("project.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded 
                        shadow transition-all hover:bg-emerald-600">
                            Add New
                        </Link>
                    </div>
                }>
                <Head title="Projects"/>
                <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    {success &&(
                    <div className="bg-emerald-500 py-2 px-4 text-white rounded">
                        {success}
                    </div>
                    )}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           <div className="overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right
                            text-gray-500 dark:text-gray-400">
                                <thead className="text-xs uppercase bg-gray-50
                                dark:bg-gray-700 border-b-2 border-gray-500
                                text-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <TableHeading 
                                            name="id" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >ID</TableHeading>
                                        
                                        <TableHeading 
                                            name="image" 
                                            sortable={false}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Image</TableHeading>

                                        <TableHeading 
                                            name="name" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Name</TableHeading>

                                        <TableHeading 
                                            name="status" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Status</TableHeading>

                                        <TableHeading 
                                            name="created_at" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Created At</TableHeading>

                                        <TableHeading 
                                            name="due_date" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Due Date</TableHeading>

                                        <TableHeading 
                                            name="created_by" 
                                            sortable={false}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Created By</TableHeading>

                                        <TableHeading 
                                            name="actions" 
                                            sortable={false}
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Actions</TableHeading>
                                    </tr>
                                </thead>
                                <thead className="text-xs uppercase bg-gray-50
                                dark:bg-gray-700 border-b-2 border-gray-500
                                text-gray-700 dark:text-gray-400">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput 
                                             className="w-full"
                                             defaultValue={queryParams.name}
                                             placeholder="Project Name"
                                             onBlur={e => searchFileldChanged('name', e.target.value)}
                                             onKeyPress={e => onKeyPress('name',e)}    
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput 
                                             className="w-full"
                                             defaultValue={queryParams.status}
                                             onChange={(e) => searchFileldChanged('status',e.target.value)
                                            }>
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"> </th>
                                        <th className="px-3 py-2"> </th>
                                        <th className="px-3 py-2"> </th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map(project => (
                                    <tr className="bg-white border-b dark:bg-gray-800 
                                    dark:border-gray-700"
                                    key={project.id}>
                                        <th className="px-3 py-2">{project.id}</th>
                                        <td className="px-3 py-2">
                                            <img src={project.image_path} alt=""/>
                                        </td>
                                        <th className="px-3 py-2 hover:text-blue-500 hover:underline">
                                            <Link href={route('project.show', project.id)}>
                                                {project.name}
                                            </Link>
                                        </th>
                                        <td className="px-3 py-2">
                                            <span className ={
                                                "px-2 py-1 rounded text-white "+
                                                PROJECT_STATUS_CLASS_MAP[project.status]}
                                            >
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2">{project.created_at}</td>
                                        <td className="px-3 py-2">{project.due_date}</td>
                                        <td className="px-3 py-2">{project.createdBy.name}</td>
                                        <td className="px-3 py-2">
                                            <Link href={route('project.edit', project.id)}
                                            className="font-medium text-blue-600
                                            dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                            onClick={(e) => deleteProject(project)}
                                            className="font-medium text-red-600
                                            dark:text-red-500 hover:underline mx-1"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                            <Pagination links={projects.meta.links}/>
                        </div> 
                    </div>
                </div>
            </div>
            </Authenticated>
    )
}