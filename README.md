# 📝 Blog System (React + JSON Server)

A simple blog system built with React and JSON Server, supporting user authentication via JWT. Users can view, create, edit, and delete posts — plus add comments — but only when signed in.

---

## 💡 Features

- ✅ User Signup & Login using JWT
- ✅ View posts with image, title, description, and author
- ✅ Create new posts (only for authenticated users)
- ✅ Edit/Delete only your own posts
- ✅ Add comments to posts
- ✅ Responsive design with Dark Mode toggle
- ✅ SweetAlert & Toastify notifications

---

## 📁 Tech Stack

### Frontend
- React
- Axios
- React Router DOM
- React Context API (for auth state)
- SweetAlert2 + React Toastify
- External custom CSS

### Backend
- JSON Server `v0.17.3`
- JSON Server Auth (for JWT support)

---

##  Getting Started Locally

###  Clone the Repository

```bash
git clone https://github.com/yourusername/blog-system.git
cd blog-system


### Install Dependencies

## frontend
cd frontend
npm install
npm run dev

## backend
cd backend
npm install
node server.js

## The backend will run at: http://localhost:8000


## Authentication
JWT-based login/register using json-server-auth
Token is saved in localStorage
Only logged-in users can access posts and add/edit/delete them

## Deployment
Frontend: Deployed on Vercel https://summer-log-react-project.vercel.app/
Backend: Deployed on Glitch or run locally   https://polar-opalescent-bulb.glitch.me

## Notes for Developers
Make sure db.json contains users, posts, and comments collections
Use a .env file if you want to store API URLs separately

## Author
Name: Eman Ibrahim
Email: emanelhalwany1@gmail.com
GitHub: https://github.com/EmanIbrahimIbrahim