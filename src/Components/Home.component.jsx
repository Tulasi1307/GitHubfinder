import "../Components/Home.component.css";
import { useEffect, useState } from "react";
import axios from "../../src/axios";
import Userdetails from "./Userdetails.component";

export function Home() {
  const [query, setQuery] = useState("");
  //Users Fetched From The API
  const [users, setUsers] = useState([]);
  //limit for the results
  const [limit] = useState(50); 

  const handleQueryInput = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/search/users?q=" + query,{
        params: {
          per_page : limit
        }
      });
      // console.log(response);
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearchUsers = async (event) => {
    event.preventDefault();
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Your Query Is Empty");
    }
  };

  useEffect(
    ()=>{
      const displayUsers = async() => {
        if(query){
          const items = await fetchUsers();
          setUsers(items);
        }
      }
      displayUsers();
    },[limit]
  )

  return (
    <>
      {/* <h1>This is Home page!!!</h1> */}
      <div className="search-forms">
        <h2>GitFinder</h2>
        <form>
          <input
            type="text"
            value={query}
            onChange={handleQueryInput}
            placeholder="Enter the user name"
          />
          <button onClick={handleSearchUsers}>Search</button>
        </form>
      </div>

      <div className="search-results">
        {users ? (
          users.map((user) => {
            return <Userdetails user={user} key={user.id} />;
          })
        ) : (
          <h2>Nothing to display....</h2>
        )}
      </div>
    </>
  );
}
