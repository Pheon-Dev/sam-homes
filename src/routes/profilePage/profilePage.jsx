import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";

function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Contact Information</h1>
            {/* <button>Update Profile</button> */}
          </div>
          <div className="info">
            {/* <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span> */}
            <span>
              Call 1: <b>+254 724 414 162</b>
            </span>
            <span>
              Call 2: <b>+254 727 860 186</b>
            </span>
          </div>
          {/* <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div> */}
          <h1> List</h1>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      {/* <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div> */}
    </div>
  );
}

export default ProfilePage;
