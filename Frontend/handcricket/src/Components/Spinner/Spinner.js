import React from 'react'

const spinner = ({text}) => {
  return (
    <div>
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
            <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Waiting for opponent....</span>
            </div>
            <p className="mt-3 mb-0 text-warning fs-4">{text}</p>
        </div>
    </div>
  )
}

export default spinner
