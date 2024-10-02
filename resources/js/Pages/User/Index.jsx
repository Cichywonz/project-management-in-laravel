import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
export default function Index({auth, users, queryParams = null, success}){
    
    queryParams = queryParams || {}
    const searchFileldChanged = (name, value) =>{
        if(value){
            queryParams[name]=value
        }else{
            delete queryParams[name]
        }

        router.get(route('user.index'), queryParams)
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
        router.get(route('user.index'), queryParams)
    };

    const deleteUser = (user) =>{
        if(!window.confirm('Delete this user')){
            return;
        }
        router.delete(route('user.destroy', user.id))
    }

    return(
        <Authenticated
            user={auth.user}
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-x1 text-gray-800
                        dark:text-gray-200 leading-tight">
                            Users
                        </h2>
                        <Link 
                        href={route("user.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded 
                        shadow transition-all hover:bg-emerald-600">
                            Add New
                        </Link>
                    </div>
                }>
                <Head title="Users"/>
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
                                            name="name" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Name</TableHeading>

                                        <TableHeading 
                                            name="email" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Email</TableHeading>

                                        <TableHeading 
                                            name="created_at" 
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Created At</TableHeading>

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
                                        <th className="px-3 py-2">
                                            <TextInput 
                                             className="w-full"
                                             defaultValue={queryParams.name}
                                             placeholder="User Name"
                                             onBlur={e => searchFileldChanged('name', e.target.value)}
                                             onKeyPress={e => onKeyPress('name',e)}    
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                        <TextInput 
                                             className="w-full"
                                             defaultValue={queryParams.email}
                                             placeholder="User Email"
                                             onBlur={e => searchFileldChanged('email', e.target.value)}
                                             onKeyPress={e => onKeyPress('email',e)}    
                                            />
                                        </th>
                                        <th className="px-3 py-2"> </th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map(user => (
                                    <tr className="bg-white border-b dark:bg-gray-800 
                                    dark:border-gray-700"
                                    key={user.id}>
                                        <th className="px-3 py-2">{user.id}</th>
                                        <th className="px-3 py-2 hover:text-blue-500 hover:underline">
                                            {user.name}
                                        </th>
                                        <td className="px-3 py-2">
                                            {user.email}
                                        </td>
                                        <td className="px-3 py-2">{user.created_at}</td>
                                        <td className="px-3 py-2">
                                            <Link href={route('user.edit', user.id)}
                                            className="font-medium text-blue-600
                                            dark:text-blue-500 hover:underline mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                            onClick={(e) => deleteUser(user)}
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
                            <Pagination links={users.meta.links}/>
                        </div> 
                    </div>
                </div>
            </div>
            </Authenticated>
    )
}