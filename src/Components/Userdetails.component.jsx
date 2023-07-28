import { Link } from "react-router-dom";

export default function Userdetails({ user }) {
  const { avatar_url, login, id } = user;

  return (
    <>
      <div className="bodySection">
        <div className="search-results">
          <div className="user">
            <div className="image">
              <img src={avatar_url} alt={login} />
            </div>
            <div className="user-info">
              <h3>Name of the User : {login}</h3>
              <small>ID : {id}</small> <br />
              <Link to={`/user-profile/${login}`}>View Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
