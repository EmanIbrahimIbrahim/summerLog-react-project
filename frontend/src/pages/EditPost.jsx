import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { toast } from 'react-toastify'
import "../css/loginPage.css"

function EditPost() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState(user?.name || '')
  const [imageFile, setImageFile] = useState(null)
  const [existingImageUrl, setExistingImageUrl] = useState('')
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    axios.get(`${baseURL}/posts/${id}`)
      .then(res => {
        const post = res.data
        if (post.userId !== user.id) {
          toast.error('Unauthorized: You cannot edit this post.')
          navigate('/home')
        } else {
          setTitle(post.title)
          setDescription(post.description)
          setExistingImageUrl(post.image)
        }
      })
      .catch(() => {
        toast.error('Error loading post.')
        navigate('/home')
      })
      .finally(() => setLoading(false))
  }, [id, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let imageUrl = existingImageUrl
      if (imageFile) {
        imageUrl = await handleImageUpload()
      }

      await axios.put(`${baseURL}/posts/${id}`, {
        title,
        description,
        author,
        image: imageUrl,
        userId: user.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Post updated successfully!')
      navigate('/home')
    } catch (error) {
      toast.error('Failed to update post.')
    }
  }

  if (loading) return <div className="text-center mt-10">Loading post...</div>

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset addPost-form bg-base-200 border-base-300 rounded-box w-xs border p-4 text-lg">
        <label className="label">Title</label>
        <input
          className="input border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label className="label">Description</label>
        <input
          className="input border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label className="label">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="input border border-gray-300 focus:outline-none focus:ring-0 focus:border-pink-300"
        />

        {/* Preview image */}
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="New Preview"
            className="mt-2 w-32 h-auto rounded shadow"
          />
        ) : existingImageUrl ? (
          <img
            src={existingImageUrl}
            alt="Old Image"
            className="mt-2 w-32 h-auto rounded shadow"
          />
        ) : null}

        <button className="btn btn-neutral mt-4 login-btn">Update Post</button>
      </fieldset>
    </form>
  )
}

export default EditPost
