import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { toast } from 'react-toastify'

export default function AddPost() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState(user?.name || '')
  const [imageFile, setImageFile] = useState(null)

  const handleImageUpload = async () => {
    const formData = new FormData()
    formData.append('image', imageFile)

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    )
    return response.data.data.url 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !imageFile) {
      toast.error("Please fill in all fields.")
      return
    }

    setLoading(true)

    try {
      const imageUrl = await handleImageUpload()

      await axios.post(
        'http://localhost:8000/posts',
        {
          title,
          description,
          author,
          image: imageUrl,
          userId: user.id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      navigate('/home')
    } catch (error) {
      toast.error("Error adding post.")
    } finally {
      setLoading(false)
    }
  }

  return (

    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset addPost-form bg-base-200 border-base-300 rounded-box w-xs border p-4 text-lg">
        <label className="label">Title</label>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)} required
          className="input border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300"
        />

        <label className="label">Description</label>
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)} required
          className="input border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300"
        />

        <label className="label">Image</label>
        <input type="file" accept="image/*" 
          onChange={(e) => setImageFile(e.target.files[0])} required
          className="input border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300" />


        <button className="btn btn-neutral mt-4 login-btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add Post'}
        </button>
      </fieldset>
    </form>
  )
}
