function FilmCharacterPopup({ data }) {
  return (
    <>
      <div
        className="character-popup"
        style={{ top: data.top - 50, left: data.left }}
      >
        <span>{data.name}</span>
      </div>
    </>
  );
}

export default FilmCharacterPopup;
