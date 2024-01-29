import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className='footer'>
            <footer>
                <p>GoFood &copy; {year}<br></br>
                    mail@gofood.com
                </p>
            </footer>
        </div>
    )
}

export default Footer