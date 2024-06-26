import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { VerticalDotsIcon } from './VerticalDotsIcon';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { SwalErrorShow } from '../../assets/scripts/Utility';
const RestaurentTableRow = ({ restaurent, getColor, refetch }) => {
    const navigate = useNavigate()
    // console.log(restaurent);
    const fieldsStatus = getColor(restaurent?.subscriptionStart, restaurent?.subscriptionEnd)
    const axiosSecure = useAxiosSecure();
    if(!restaurent?.isActive){
        fieldsStatus.color= "danger"
    }

    // for deleting branch payment history
    const handleBranchDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // delete branch request
                axiosSecure.delete(`/delete-branch-from-payment-lists/${id}`)
                    .then(data => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your package has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
                    .catch(err => SwalErrorShow(err))
            }
        });
    }

    // for deactivating branch 
    const handleDeactiveBranch = (id, status) => {
        console.log(status);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${!status ? "Activate" : "Deactivate"} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                // delete branch request
                axiosSecure.patch(`/deactive-branch-from-payment-lists/${id}`, {status})
                    .then(data => {
                        Swal.fire({
                            title: !status ? "Activated" : "Deactivated",
                            text: `Your package has been ${!status ? "Activated" : "Deactivated"}"`,
                            icon: "success"
                        });
                        refetch();
                    })
                    .catch(err => SwalErrorShow(err))
            }
        });
    }
    // notify user for when subscription ending
    const handleNotifyBranchOwner = (restaurant) => {
        const data = {
            city: restaurant?.city, 
            res_id: restaurant?.res_id, 
            branch_name : restaurant?.branch_name,
            subscriptionEnd: restaurant?.subscriptionEnd,
            streetAddress: restaurant?.streetAddress
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to notify the branch owner!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, notify!"
        }).then((result) => {
            if (result.isConfirmed) {
                // delete branch request
                axiosSecure.patch(`/notify-branch-owner-from-payment-lists/${restaurant._id}`, { data })
                    .then(data => {
                        Swal.fire({
                            title: "Successful!",
                            text: "Your message has been sent to the branch owner!",
                            icon: "success"
                        });
                        refetch();
                    })
                    .catch(err => SwalErrorShow(err))
            }
        });
    }
    return (
        <tr>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='pl-2 flex items-center'>
                    {/* <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src="https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no"
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div> */}
                    <div className='ml-3'>
                        <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{restaurent?.res_name}</p>
                        <p className='text-gray-400 whitespace-no-wrap'>{restaurent?._id}</p>
                    </div>
                </div>
            </td>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{restaurent?.branch_name}</p>
                <p className='text-gray-400 whitespace-no-wrap'>{restaurent?.branchID}</p>
            </td>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{
                    restaurent?.subscriptionStart && new Date(restaurent?.subscriptionStart).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                }</p>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{
                    restaurent?.payment_time && new Date(restaurent?.payment_time).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                }</p>
            </td>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{
                    restaurent?.subscriptionEnd && new Date(restaurent?.subscriptionEnd).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                }</p>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{
                    restaurent?.payment_time && new Date(restaurent?.payment_time).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                }</p>
            </td>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{
                    restaurent?.payment_time && new Date(restaurent?.payment_time).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                }</p>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{
                    restaurent?.payment_time && new Date(restaurent?.payment_time).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                }</p>
            </td>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm text-center'>


                {restaurent?.payment_status === "Paid"
                    ? <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{restaurent?.transaction_id} <span className='text-gray-400 text-xs'>({restaurent?.payment_method})</span></p>
                    : ""
                }
            </td>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>{restaurent?.payment_status}</p>
            </td>
            <td className='px-1 py-5 border-b border-gray-200 bg-white text-sm text-center'>
              
                <p className={`whitespace-no-wrap text-${fieldsStatus.color}`}>
                {
                    restaurent?.isActive ? "Active" : "Deactivated"
                }
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <div className="relative flex justify-center items-center gap-2">
                    <Dropdown aria-label='dropdown'>
                        <DropdownTrigger>
                            <Button aria-label='edit-button' isIconOnly size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-300" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label='dropdown-menu'>
                            <DropdownItem aria-label='dropdown-item' onClick={() => handleNotifyBranchOwner(restaurent)}>Notify Owner</DropdownItem>
                            {
                                restaurent?.isActive ?
                                    <DropdownItem onClick={() => handleDeactiveBranch(restaurent?._id, restaurent?.isActive)}>Deactivate</DropdownItem>
                                    :
                                    <DropdownItem onClick={() => handleDeactiveBranch(restaurent?._id, restaurent?.isActive)}>Activate</DropdownItem>

                            }

                            <DropdownItem onClick={() => handleBranchDelete(restaurent?._id)}>Delete</DropdownItem >
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </td>
        </tr>
    )
}

export default RestaurentTableRow;