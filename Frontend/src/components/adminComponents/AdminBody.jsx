import React, { useEffect, useState } from 'react'
import { useDeleteUserMutation, useGetUsersMutation } from '../../slices/adminSlice.js/AdminApiSlics';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';


const AdminBody = () => {

  const [users,setUsers] = useState([]);
  const [exisistingUser,setExisistingUser] = useState(users?.length||0)
  const [search,setSearch] = useState('')
  const [filteredValue, setFilteredValue] = useState([])
  const [editUserModal,setEditUserModal] = useState(false)
  const [selectedValue,setSelectedValue] = useState(null)
  const [addNewUserModal,setAddNewUserModal] = useState(false)

  const [getUsers,{isLoading}] = useGetUsersMutation()

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await getUsers()
        setUsers(response.data.userData)
      } catch (error) {
          toast.error("failed to fetch users")
      }
    }
   fetchData()
  },[exisistingUser,editUserModal,addNewUserModal])

  function filterUsers(text, userList) {
    if (text === '') {
      return userList;
    } else {
      const startsWith = userList.filter((user) => {
      const lowerCaseText = text.toLowerCase();
        return (
          user.name.toLowerCase().startsWith(lowerCaseText) || 
          user.email.toLowerCase().startsWith(lowerCaseText)
        );
      });
  
      const contains = userList.filter((user) => {
        const lowerCaseText = text.toLowerCase();
        return (
          !startsWith.includes(user) && 
          (user.name.toLowerCase().includes(lowerCaseText) || 
          user.email.toLowerCase().includes(lowerCaseText))
        );
      });
  
      return [...startsWith, ...contains];
    }
  }
  
  useEffect(()=>{
    const searchedUsers = filterUsers(search,users)
    setFilteredValue(searchedUsers)
  },[search,users])
  
  const [deleteUser,{removeLoading}] =  useDeleteUserMutation()


  const deleteHandler = async (userId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      iconColor: '#3F51B5',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3F51B5',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result)=>{
        if(result.isConfirmed){
          try {
            const res = await deleteUser({userId:userId}).unwrap()
            if(res){
              setExisistingUser(prev=> prev-1)
              toast.success('user deleted')
            }
          } catch (error) {
            toast.error(error?.data?.message || error.message)
          }
        }
    })
  }

  const openEditUserModal = (userData) =>{
    setSelectedValue(userData)
    setEditUserModal(true)
  }

  const closeEditModal = ()=>{
    setSelectedValue(null)
    setEditUserModal(false)
  }

  return (
   <>
   <div className="container mx-auto mt-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
      <input type="text" placeholder="Search by name..." onChange={(e)=> setSearch(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md mx-auto" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={()=> setAddNewUserModal(true)}>Add User</button>
      </div>

      {/* User List */}
      <div className="grid grid-cols-3 gap-4">
      {
      filteredValue.map((value) => {
        return (
          <div key={value._id} className="bg-gray-100 p-4 rounded-md relative">
            <h3 className="text-lg font-semibold">{value.name}</h3>
            <p className="text-gray-600">{value.email}</p>
            {/* Profile Image */}
            {value.profileImage && (
              <img src={value.profileImage} alt="Profile" className="absolute top-0 right-0 mt-2 mr-2 w-10 h-10 rounded-full" />
            )}
            {/* End of Profile Image */}
            <div className="mt-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2" onClick={() => openEditUserModal(value)}>Edit</button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md" onClick={() => deleteHandler(value._id)}>Delete</button>
            </div>
          </div>
        );
      })
    }      
      {
        editUserModal && <EditUserModal userData={selectedValue} isOpen={editUserModal} close={closeEditModal} />
      }
      {
        addNewUserModal && <AddUserModal isOpen={addNewUserModal} close={()=> setAddNewUserModal(false)} />
      }
      </div>
    </div>
   </>
  )
}

export default AdminBody
