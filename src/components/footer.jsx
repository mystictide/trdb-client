function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-content">
          <ul>
            <li>The Review Database - {new Date().getFullYear()}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
