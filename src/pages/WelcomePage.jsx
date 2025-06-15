import React from 'react'
import "../css/welcomePage.css";
import { Link } from 'react-router-dom';
export default function WelcomePage() {
    return (
        <div>
            <div className="video-container">
                <video autoPlay loop muted playsInline className="video-bg">
                    <source src="https://cdn.pixabay.com/video/2016/08/22/4739-179738691_large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="content">
                    <h1>Hi everyone! Summer's here</h1>
                    <p>let's share our fun and sunny adventures</p>
                    <Link to="/login"className="btn btn-secondary w-[15em] mr-5 " style={{marginRight: 1 + 'em'}}>Login</Link>
                    <Link to="/signup" className="btn  btn-success  w-[15em]">Sign up</Link>

                </div>
            </div>

        </div>
    )
}
