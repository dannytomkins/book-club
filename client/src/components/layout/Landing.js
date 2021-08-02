import React from 'react'

export const Landing = () => {
    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Book Club</h1>
            <p className="lead">
              Create or join a book club! Make a profile and connect with others that share your interests.
            </p>
            <div className="buttons">
              <a href="register.html" className="btn btn-primary">Sign Up</a>
              <a href="login.html" className="btn btn-light">Login</a>
            </div>
          </div>
        </div>
      </section>
    )
}
