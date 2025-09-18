export default function MyPortfolio() {
  return (
    <>
      <nav className="navbar navbar-light p-3 px-5">
        <div className="container-fluid">
          <span className=" display-3">Angelo Validad</span>

          <div className="d-flex gap-5" id="header_menu">
            <a type="button" className="text-decoration-none fs-5 active">
              <i class="fa-solid fa-house-chimney"></i> Home
            </a>
            <a type="button" className="text-decoration-none fs-5">
              <i class="fa-solid fa-circle-question"></i> About me
            </a>
            <a type="button" className="text-decoration-none fs-5">
              <i class="fa-solid fa-code"></i> Projects
            </a>
            <a type="button" className="text-decoration-none fs-5">
              <i class="fa-solid fa-mobile-screen"></i> Contact
            </a>
          </div>

          <button
            className="btn btn-outline-dark rounded-pill px-5 fw-bold"
            type="submit"
          >
            Let's Work!
          </button>
        </div>
      </nav>
      <div className="container-fluid mb-4">
        <div className="row align-items-center px-5">
          <div className="col-6">
            <div className="d-grid align-items-center gap-5">
              <span className="display-1 fw-bold">
                Hi There! Welcome to my Portfolio.
              </span>
              <span className="display-6">I am a full-stack Developer</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-grid gap-3 p-5">
              <img
                className="border rounded-circle border-dark"
                height={180}
                src="/assets/profile.png"
                alt="logo"
              />
              <span className="fw-bold fs-2">Overview</span>
              <span className="text-muted fs-5" align="justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                itaque blanditiis velit officiis placeat inventore consequuntur
                aliquid animi sapiente, et ea culpa earum cumque magnam, minus
                nihil asperiores. Consequatur placeat repellat mollitia id
                nesciunt exercitationem soluta in! Error, provident eligendi.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark p-5 my-4">
        <div className="container-fluid">
          <span className="display-3 fw-bold text-white">About me</span>
          <div className="d-grid gap-2 mt-4">
            <span className="fs-2  text-white my-3">Education</span>
            <div className="d-flex gap-4 w-100">
              <div className="d-grid gap-1 w-100">
                <span className="text-white fs-6">
                  <i class="fa-solid fa-graduation-cap"></i> College (Carlos
                  Hilado Memorial State University)
                </span>
                <span className="fs-4 text-white">
                  Bachelor of Science in Information Systems (BSIS)
                </span>
              </div>
              <div className="d-grid gap-1 w-100">
                <span className="text-white fs-6">
                  <i class="fa-solid fa-graduation-cap"></i> Senior High School
                  (STI West Negros University)
                </span>
                <span className="fs-4 text-white">
                  Information Technology Mobile App and Web Development
                </span>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2 mt-5">
            <span className="fs-2  text-white my-3">Programming Skills</span>
            <div className="row g-4 w-100">
              <div className="col-6 col-md-4 col-lg-3">
                <div className="border border-light shadow-lg bg-light p-2 px-4 rounded-pill fw-bold text-center">
                  Website Development
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="border border-light shadow-lg bg-light p-2 px-4 rounded-pill fw-bold text-center">
                  Desktop Software Development
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="border border-light shadow-lg bg-light p-2 px-4 rounded-pill fw-bold text-center">
                  Mobile App Development
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="border border-light shadow-lg bg-light p-2 px-4 rounded-pill fw-bold text-center">
                  Database Developer
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="border border-light shadow-lg bg-light p-2 px-4 rounded-pill fw-bold text-center">
                  Full-stack Developer
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="border border-light shadow-lg bg-light p-2 px-4 rounded-pill fw-bold text-center">
                  UI/UX Designer
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <div className="border border-light shadow-lg bg-light p-2 px-4 rounded-pill fw-bold text-center">
                  Figma Prototype Designer
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 mt-5 w-100">
            <span className="fs-2  text-white my-3 w-100">
              Frameworks and Languages
            </span>

            <div className="marquee-container w-100">
              <div className="marquee-track">
                <div className="marquee-content">
                  <img src="icon1.png" alt="icon1" className="icon" />
                  <img src="icon2.png" alt="icon2" className="icon" />
                  <img src="icon3.png" alt="icon3" className="icon" />
                  <img src="icon4.png" alt="icon4" className="icon" />
                  <img src="icon5.png" alt="icon5" className="icon" />
                </div>
                <div className="marquee-content">
                  <img src="icon1.png" alt="icon1" className="icon" />
                  <img src="icon2.png" alt="icon2" className="icon" />
                  <img src="icon3.png" alt="icon3" className="icon" />
                  <img src="icon4.png" alt="icon4" className="icon" />
                  <img src="icon5.png" alt="icon5" className="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
