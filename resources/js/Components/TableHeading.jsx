import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

export default function TableHeading({
    name,
    sortable = () => {}, 
    sort_field = null, 
    sort_direction = null,
    sortChanged = () => {},
    children,
}) {
return(
    <th onClick={(e) => sortChanged(name)}>
        <div className="px-3 py-2 flex items-center justify-between cursor-pointer">
            {children}
            {sortable &&(
                <div className='flex'>
                    <ChevronUpIcon className={ "w-4 " + (sort_field === name 
                        && sort_direction === "asc" ? "text-white": "")}/>
                    <ChevronDownIcon className={ "w-4 " + (sort_field === name 
                        && sort_direction === "desc" ? "text-white": "")} />
                </div>)}
        </div>
    </th>
)
}