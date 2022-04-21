import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/profilestyles.css'
import styled from 'styled-components'
import bell from './assets/notification2.svg'
import user from './assets/user.svg'
import Contact from './subCompenents/Contact'
import Message from './subCompenents/Message'


const Profile = (props) => {
  axios.defaults.withCredentials=true;
  let id = props.id
    useEffect(()=>{
        getContacts()

    },[])
    const [isRespond,setIsRespond] = useState(false)
    const [response,setResponce] = useState({})
    const getData = async ()=>{
      const response = await axios.post(`/getdata?userID=${id}`)
      .then((res)=>{
        setResponce(res.data.data)
        console.log(res.data.data)
        setIsRespond(true)
      }).catch((error)=>{
        console.log(error);
    })
    }
    
    const handleEnter = async (e)=>{
      if(e.keyCode===13){
        await axios.post('http://localhost:5501/api/addcontact',{userEmail:e.target.vale})
        .then((res)=>{console.log(res);})
        .catch((eroor)=>{
          console.log(("error"));
        })
      }
    }
    const [contacts,setContacts]=useState({})
    const getContacts = async ()=>{
      await axios.get('http://localhost:5501/api/allcontacts')
        .then((res)=>{
            console.log(res.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    //just for testing
    useEffect(()=>{
    console.log(response);
    
    },[response])

    useEffect(()=>{
      console.log(contacts);
    },[contacts])
    
  return (
    <div>
      <div className='profile-container'>
          <div className='head'>
              <div ><p>Messaging</p></div>
              <div className='sub-head'>
                  <div>
                      <input type="text" placeholder='Search' onKeyUp={(e)=>handleEnter(e)} />
                  </div>
                  <div>
                    <img src={bell} />
                  </div>
                  <div>
                    <img src={user} />
                  </div>
              </div>
          </div>
          <div className='coore'>
            <div className='chats'>
              <h5>Chats</h5>
              <ul>
                <li>Open</li>
                <li>Read</li>
                <li>Unread</li>
              </ul>
              <div className='contacts'>
              {

              }
                <Contact name={"The wkknd"} message={"Call out my name"} time={"now"}/>
                <Contact name={"YG Woah"} message={"Hello wssp"} time={"12m"}/>
                <Contact name={"Alhassan Zakriti"} message={"if i wont die for you"} time={"2h"}/>

              </div>
            </div>
            <div className='message-section' >
              <Message/>
            </div>
          </div>
      </div>
        
    </div>
    
  )
}

export default Profile

