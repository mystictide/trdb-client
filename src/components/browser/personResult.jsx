import Person from "../../components/main/person";

function PersonResult({ people }) {
  return (
    <>
      {people
        ? people.data.map((item, index) => (
            <div className="match" key={index}>
              <Person actor={item} />
              <div className="match-info">
                <div className="details">
                  <div className="header">
                    <span>{item.name}</span>
                  </div>
                  <p>Cast in x Films, including ...</p>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default PersonResult;
