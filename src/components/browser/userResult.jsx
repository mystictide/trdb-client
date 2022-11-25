import User from "../../components/main/user";

function UserResult({ users }) {
  return (
    <>
      {users
        ? users.data.map((item, index) => (
            <div className="match" key={index}>
              <User actor={item} />
              <div className="match-info">
                <div className="details">
                  <div className="header">
                    <span>{item.Username}</span>
                  </div>
                  <p>x followers, 4 following, x reviews</p>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default UserResult;
