import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import './Profile.css'
const Profile = () => {
    const {isLoaded, getToken}=useAuth();
    const [profile,setProfile]=useState(null);
    useEffect(()=>{
        if(!isLoaded)
            return;
        const getProfile = async () =>{
            const token= await getToken();
            console.log(token);
            const res= await fetch('https://hand-cricket-xm73.onrender.com/getprofile',{
                headers:{
                   Authorization : `Bearer ${token}`
                }
            })
            if(!res.ok) throw new Error('Failed to load profile');
            const data= await res.json();
            console.log(data);
            setProfile(data);
        }
        getProfile();
    },[])
  return (
    <div>
    {profile && <div className="board-wrapper">
        <div className="board" style={{'background-image':"url('/board2.png')"}}>
            <h2 className="board-title">Profile</h2>
             <p className="chalk">
            User Id : {profile.userId}
            </p>
            <p className="chalk">
            User Name : {profile.userName}
            </p>
            <p className="chalk">
            Wins : {profile.wins}
            </p>
            <p className="chalk">
            Matches Played : {profile.matchesPlayed}
            </p>
            <p className="chalk">
            Highest Score : {profile.highestScore}
            </p>
        </div>
    </div>}
    </div>
  )
}
export default Profile
