import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, user }) {
 const {data,setData, post, errors, reset} = useForm({
    image: "",
    name: user.name || "",
    status: user.name || "", 
    description: user.name || "",
    due_date: user.date || "",
    _method: 'PUT'
});
const onSubmit =(e) =>{
    e.preventDefault();
    post(route("user.update", user.id));
}
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-x1 text-gray-800
                        dark:text-gray-200 leading-tight">
                        Edit User {user.name}
                    </h2>

                </div>
            }
        >
            <Head title="Create" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800
                        shadow sm:rounded-lg"> 
                         {user.image_path && <div>
                            <img src={user.image_path} className="w-64" alt=""/>
                            </div>}
                            <div>
                                <InputLabel 
                                    htmlFor="user_image_path"
                                    value="User Image"/>
                                <TextInput 
                                    id="user_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="user_name"
                                    value="User Name"/>
                                <TextInput 
                                    id="user_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="user_description"
                                    value="User Descriprion"/>
                                <TextAreaInput 
                                    id="user_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description}/>
                            </div>
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="user_due_date"
                                    value="User Deadline"/>
                                <TextInput 
                                    id="user_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="user_status"
                                    value="User Status"/>
                                <SelectInput 
                                    id="user_status"
                                    name="status"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.user_status} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <Link href={route('user.index')} 
                                className="bg-red-500 py-1 px-3 text-white rounded 
                                shadow transition-all hover:bg-red-600 mr-2">
                                    Cancel
                                </Link>
                                
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded 
                                shadow transition-all hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

