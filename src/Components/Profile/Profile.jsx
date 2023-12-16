import React, { useEffect } from 'react'

export default function Profile({ userData }) {

    console.log(userData);
    return (
        <>

            <div className="container">
                <div className="row py-4">
                    <h2>UserName:{userData.name}</h2>
                </div>
            </div>
        </>
    )
}
