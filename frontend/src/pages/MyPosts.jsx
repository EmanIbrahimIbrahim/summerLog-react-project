import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../auth'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import "../css/myPosts.css"

function MyPosts() {
  const { user, token } = useAuth()
  const [myPosts, setMyPosts] = useState([])
const baseURL = import.meta.env.VITE_BACKEND_URL;

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${baseURL}/posts?userId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMyPosts(res.data)
    } catch (err) {
      toast.error("Failed to fetch your posts.")
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [user, token])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are You Sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setMyPosts(prev => prev.filter(p => p.id !== id))
        toast.success('Deleted successfully!')
      } catch (err) {
        toast.error('Error deleting post.')
      }
    }
  }

  return (
    <div className="myposts-container posts-container flex justify-evenly">
      {myPosts.length === 0 ? (
        <div className="text-center mt-20 no-posts">
          <div className="no-posts-add-one">
            <h2 className="text-2xl font-bold mb-4">Can't Wait!</h2>
            <p className="text-lg mb-6">Add Your First Post Now</p>
            <li><Link to="/home/AddPost">Add New Post</Link></li>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {myPosts.map(post => (
            <div key={post.id} className="card bg-base-100 shadow-md rounded-lg w-[17em]">
              <figure className="h-48">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              </figure>
              <div className="card-body p-4 flex flex-col max-h-full">
                <div className='grid gap-3'>
                  <h2 className="card-title text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm mt-2">{post.description}</p>
                  <p className="text-xs text-gray-500 mt-1">by: {post.author}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/home/myPosts/edit/${post.id}`} className="btn btn-sm btn-outline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  </Link>
                  <Link onClick={() => handleDelete(post.id)} className="btn btn-sm btn-error ml-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPosts
