export default function MainMenu(props) {
  return (
    <>
      <div className="d-grid d-lg-flex gap-2 gap-lg-5 p-0" id="header_menu">
        <a
          onClick={props.onSuccess}
          href="#home"
          className={`text-decoration-none fs-5 ${
            props.activeSection === "home" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-house-chimney"></i> Home
        </a>
        <a
          onClick={props.onSuccess}
          href="#about"
          className={`text-decoration-none fs-5 ${
            props.activeSection === "about" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-circle-question"></i> About me
        </a>
        <a
          onClick={props.onSuccess}
          href="#projects"
          className={`text-decoration-none fs-5 ${
            props.activeSection === "projects" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-code"></i> Projects
        </a>
        <a
          onClick={props.onSuccess}
          href="#contact"
          className={`text-decoration-none fs-5 ${
            props.activeSection === "contact" ? "active" : ""
          }`}
        >
          <i className="fa-solid fa-mobile-screen"></i> Contact
        </a>
      </div>
    </>
  );
}
