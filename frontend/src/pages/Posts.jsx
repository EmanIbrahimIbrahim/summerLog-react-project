import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import "../css/postsPage.css";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import CommentSection from '../components/CommentSection';
import dotenv from 'dotenv'
export default function Posts() {
  const [posts, setPosts] = useState([])
  const [visibleComments, setVisibleComments] = useState({}) // 💡 لتحديد البوستات اللي ظاهر فيها الكومنتات
  const { user, token } = useAuth()
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  dotenv.config()
  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${baseURL}/posts`)
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  const location = useLocation()

  useEffect(() => {
    if (location.state?.refresh) {
      axios.get(`${baseURL}/posts`).then(res => setPosts(res.data))
    }
  }, [location.state])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are You Sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: ' yes , Delete',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPosts(posts.filter(p => p.id !== id))
        toast.success('Deleted Successfully')
      } catch (err) {
        toast.error('Worng ! not Deleted')
      }
    }
  }

  return (
    <div className="posts-container flex justify-evenly">
      {posts.length === 0 ? (
        <div className="text-center mt-20 no-posts">
          <div className="no-posts-add-one">
            <h2 className="text-2xl font-bold mb-4">There is no posts </h2>
            <p className="text-lg mb-6">Add Your First Post Now</p>
            <li><Link to="/home/AddPost">Add New Post</Link></li>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
          {posts.map(post => (
            <div className="card bg-base-100 shadow-md rounded-lg min-w-[16em] max-w-[18em] mx-auto" key={post.id}>
              <figure className="h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <h1></h1>
              <div className="card-body p-4 flex flex-col justify-between">
                <div className='grid gap-3'>
                  <h2 className="card-title text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm mt-2">{post.description}</p>
                  <p className="text-xs text-gray-500 mt-1">by: {post.author}</p>

                  {user?.id === post.userId && (
                    <div className="card-actions justify-end mt-2">
                      <Link to={`edit/${post.id}`} className="btn btn-sm btn-outline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      </Link>
                      <Link onClick={() => handleDelete(post.id)} className="btn btn-sm btn-error ml-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    className="btn btn-sm btn-outline btn-accent w-full"
                    onClick={() => toggleComments(post.id)}
                  >
                    {visibleComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                  </button>

                  {visibleComments[post.id] && (
                    <CommentSection postId={post.id} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div >
  )
}
