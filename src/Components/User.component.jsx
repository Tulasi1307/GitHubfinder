import "../Components/User.component.css";
import github from "../assets/gitpic.png";
import global from "../assets/site.png";
import user from "../assets/users.png";
import location from "../assets/Locationn.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Repos from "./Repos.component";

export function User() {

  const { login }= useParams();

  //user-information
  const [userInfo , setuserInfo ] = useState({});
  //repos
  const [repos , setRepos ] = useState([]);

  useEffect(
    ()=>{
      const fetchUserInfo = async () =>{
        try {
          const response = await Promise.all([
          axios.get(`https://api.github.com/users/${login}`),
          axios.get(`https://api.github.com/users/${login}/repos`)
          ]);
          setuserInfo(response[0].data);
          setRepos(response[1].data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserInfo();
    },[]);


  return (
    <>
      <div className="container">
          <Link to = "/" className = "back">Back</Link>
        <div className="user-information">
          <div className="image">
            <img src={userInfo?.avatar_url} alt="User Profile Photo" />
          </div>
          <div className="user-content">
            <h2>{userInfo?.name}</h2>
            <p>
              {userInfo?.bio}
            </p>
            <div className="more-data">
              <p>
                {" "}
                <img src={user} alt="" /> {userInfo?.followers} Followers {userInfo?.following} Following{" "}
              </p>
              {userInfo?.location && <p>
                <img src={location} alt="" /> {userInfo?.location}
              </p>}
              {userInfo?.blog &&<p>
                {" "}
                <img src={global} alt="" /> {userInfo?.blog}
              </p>}
              <p>
                {" "}
                <img src={github} alt="" /> <a href={userInfo?.html_url}>Github Profile</a>
              </p>
            </div>
          </div>
        </div>
        <div className="user-repos">
            {
              repos ? repos.map(repo => {
                return <Repos repo  = {repo} key={repo.id} />
              }) : <h2>No Repos From The User.....</h2>
            }
        </div>
      </div>
    </>
  );
}