import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MyPortfolio() {
  const [activeSection, setActiveSection] = useState("home");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after the component mounts (first visible)
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100); // small delay for smoothness
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section"));
    if (!sections.length) return;

    const navbar = document.querySelector(".navbar.fixed-top");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const handleScroll = () => {
      let currentId = sections[0].id;
      let maxVisible = 0;
      const viewportHeight = window.innerHeight;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();

        // calculate visible portion of this section
        const visibleTop = Math.max(rect.top, navbarHeight);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisible) {
          maxVisible = visibleHeight;
          currentId = sec.id;
        }
      });

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // run once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const sentences = [
    "am a Full-Stack Developer.",
    "build scalable applications.",
    "create custom websites.",
    "design UI and prototypes.",
  ];

  const [currentSentence, setCurrentSentence] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = sentences[sentenceIndex];

    let typingSpeed = isDeleting ? 50 : 100; // faster when deleting

    const typingTimeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentSentence(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
        }
      } else {
        // Deleting backward
        setCurrentSentence(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          // ✅ Immediately switch sentence before typing again
          setIsDeleting(false);
          setSentenceIndex((prev) => (prev + 1) % sentences.length);
          setCurrentSentence(""); // clear instantly (no flash)
        }
      }
    }, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, sentenceIndex]);

  return (
    <>
      <nav
        className={`navbar navbar-light p-3 px-2 px-xxl-5 bg-light fixed-top shadow-lg navbar-slide ${
          visible ? "visible" : ""
        }`}
      >
        <div className="container-fluid">
          <a
            href="#!"
            className="text-decoration-none text-dark d-block d-xl-none "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <i className="fa-solid fa-bars fa-xl"></i>
          </a>
          <span className="display-5 fw-bold">Angelo Validad</span>

          <div className="d-none d-xl-flex gap-5" id="header_menu">
            <a
              href="#home"
              className={`text-decoration-none fs-5 ${
                activeSection === "home" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-house-chimney"></i> Home
            </a>
            <a
              href="#about"
              className={`text-decoration-none fs-5 ${
                activeSection === "about" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-circle-question"></i> About me
            </a>
            <a
              href="#projects"
              className={`text-decoration-none fs-5 ${
                activeSection === "projects" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-code"></i> Projects
            </a>
            <a
              href="#contact"
              className={`text-decoration-none fs-5 ${
                activeSection === "contact" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-mobile-screen"></i> Contact
            </a>
          </div>

          <a
            href="#contact"
            className="btn btn-outline-dark rounded-pill px-5 fw-bold d-none d-md-block"
            type="submit"
          >
            Let's Work!
          </a>
        </div>
      </nav>
      <section
        id="home"
        className="container-fluid container-lg mb-4"
        style={{ paddingTop: "100px" }}
      >
        <div className="row align-items-center px-2 px-md-3 px-xxl-5">
          {/* LEFT SIDE */}
          <motion.div
            className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="d-grid align-items-center py-4">
              <span className="display-3 fw-bold text-center text-md-start">
                Hi There!
              </span>
              <span className="display-3 fw-bold text-center text-md-start">
                Welcome to my Portfolio.
              </span>
              <span className="display-6 text-center text-md-start mt-5">
                <em>
                  I {currentSentence}
                  <span className="cursor blink"></span>
                </em>
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="col-sm-12 col-md-12 col-lg-6 col-xl-6"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1.3 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="d-grid gap-3 p-3 p-md-3 p-xl-5">
              <img
                className="border rounded-circle border-dark mx-auto mx-md-0 mx-lg-0"
                height={180}
                src="/assets/profile.png"
                alt="logo"
              />
              <span className="fw-bold fs-3">Overview</span>
              <span className="text-muted fs-6" align="justify">
                I am a passionate and results-driven full-stack developer with
                experience building software solutions for web, desktop, and
                mobile platforms. Skilled in designing intuitive user interfaces
                and developing robust server-side logic, I specialize in
                creating complete, scalable, and efficient systems. I work
                confidently with modern programming languages and frameworks to
                deliver high-quality, reliable applications.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="container-fluid bg-dark p-4 p-md-5 p-lg-5">
        {/* Section Title */}
        <motion.span
          className="display-3 fw-bold text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Who am I?
        </motion.span>

        {/* Education */}
        <motion.div
          className="d-grid gap-2 mt-5 py-5"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="fs-3 text-white mb-3">Education</span>
          <div className="d-grid d-lg-flex gap-5 w-100 align-items-start">
            <motion.div
              className="d-grid gap-1 w-100"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="text-white fs-6">
                <i className="fa-solid fa-graduation-cap"></i> College (Carlos
                Hilado Memorial State University)
              </span>
              <span className="fs-3 text-white">
                Bachelor of Science in Information Systems
              </span>
            </motion.div>
            <motion.div
              className="d-grid gap-1 w-100"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="text-white fs-6">
                <i className="fa-solid fa-graduation-cap"></i> Senior High
                School (STI West Negros University)
              </span>
              <span className="fs-3 text-white">
                Information Technology Mobile App and Web Development
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Programming Skills */}
        <motion.div
          className="d-grid gap-2 mt-5 py-5"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="fs-3 text-white mb-4">Programming Skills</span>
          <div className="row g-4 w-100 align-items-center justify-content-center mx-auto">
            {[
              "Website Development",
              "Desktop Software Development",
              "Mobile App Development",
              "Web Based System",
              "Database Developer",
              "Full-stack Developer",
              "UI/UX Designer",
              "Figma Prototype Designer",
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="col-sm-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="border border-light shadow-lg bg-light p-2 px-3 rounded-pill fw-bold text-center">
                  {skill}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Frameworks and Languages */}
        <motion.div
          className="d-grid gap-2 mt-5 py-5"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="fs-3 text-white mb-4">Frameworks and Languages</span>
          <div className="row g-5 align-items-center justify-content-center text-center">
            {[
              { src: "./assets/logos/dot_net.png", label: ".Net Framework" },
              { src: "./assets/logos/React.svg", label: "React Js" },
              { src: "./assets/logos/Flutter.png", label: "Flutter" },
              {
                src: "./assets/logos/Net_Core.svg",
                label: "ASP.NET Core Web API",
              },
              { src: "./assets/logos/HTML5.png", label: "HTML 5" },
              { src: "./assets/logos/CSS3.png", label: "CSS 3" },
              { src: "./assets/logos/JavaScript.png", label: "JavaScript" },
              { src: "./assets/logos/jquery.png", label: "JQuery" },
              { src: "./assets/logos/php.png", label: "PHP" },
              { src: "./assets/logos/dart.png", label: "Dart" },
              { src: "./assets/logos/c_sharp.png", label: "C#" },
              { src: "./assets/logos/Bootstrap.png", label: "Bootstrap 5" },
              { src: "./assets/logos/mysql.png", label: "MySQL" },
              { src: "./assets/logos/mssql.svg", label: "MS SQL" },
              { src: "./assets/logos/figma.svg", label: "Figma" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="col-sm-12 col-md-3 col-lg-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="d-grid">
                  <img
                    src={item.src}
                    alt={item.label}
                    height={80}
                    className="rounded p-1 mx-auto"
                  />
                  <span className="text-light">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          className="d-grid gap-2 mt-5 py-5"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="fs-3 text-white mb-4">Services</span>
          <div className="row g-4 w-100 align-items-center justify-content-center mx-auto">
            {[
              "Software Development",
              "Customized Website",
              "Graphics Design",
            ].map((service, index) => (
              <motion.div
                key={index}
                className="col-sm-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="border border-light shadow-lg bg-light p-2 px-3 rounded-pill fw-bold text-center">
                  {service}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* <section
        id="projects"
        className="container-fluid bg-white p-3 p-md-5 p-lg-5"
      >
        <span className="display-3 fw-bold text-dark ">Projects</span>
        <div className="d-grid justify-content-center gap-2 my-5">
          <span className="fs-3 fw-bold text-dark mb-2 mb-md-3 mb-lg-3">
            Featured Projects
          </span>

          

          

          

          <div className="d-grid gap-2 shadow-sm p-3 p-lg-5 rounded mb-4 bg-dark text-light">
            <span className="display-6">
              Resort Amenities/Facilities Management System
            </span>

            <div
              id="resortCarousel"
              className="carousel slide my-2 mx-auto"
              data-bs-ride="carousel"
              style={{ maxWidth: "650px" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./assets/projects/9.png"
                    className="d-block w-100 img-rounded"
                    alt="Resort System Screenshot 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./assets/projects/8.png"
                    className="d-block w-100 img-rounded"
                    alt="Resort System Screenshot 2"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#resortCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#resortCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <span className="my-3 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              obcaecati modi ab dolorum at ipsum aut. Officiis expedita nesciunt
              deserunt dolore voluptate veritatis eos obcaecati eveniet animi,
              fuga provident, voluptatem quisquam vero? Dolorem culpa ut
              corrupti asperiores laudantium. Et ad, omnis illum corrupti
              similique mollitia quis ex ea excepturi laborum!
            </span>

            <span className="fs-5 fw-bold mb-1">Features:</span>
            <div className="d-grid d-md-flex d-lg-flex gap-3 align-items-end justify-content-between fs-6">
              <div className="d-grid gap-2 w-100">
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i> QR
                  Code Generator (Printable)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Ratings (via Website)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Website
                </span>
              </div>
              <button className="btn btn-sm btn-outline-light w-50">
                View <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section> */}

      <section
        id="projects"
        className="container-fluid bg-white p-3 p-md-5 p-lg-5"
      >
        <motion.span
          className="display-3 fw-bold text-dark "
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.span>

        <div className="d-grid justify-content-center gap-2 my-5">
          <motion.span
            className="fs-3 fw-bold text-dark mb-2 mb-md-3 mb-lg-3"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.span>
          {/* Restaurant Management System */}
          <motion.div
            className="d-grid gap-2 shadow-sm p-3 p-lg-5 rounded mb-4 bg-dark text-light"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="display-6">Restaurant Management System</span>
            <div
              id="projectCarousel"
              className="carousel slide my-2 mx-auto"
              data-bs-ride="carousel"
              style={{ maxWidth: "650px" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./assets/projects/10.png"
                    className="d-block w-100 img-rounded"
                    alt="Project 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./assets/projects/11.png"
                    className="d-block w-100 img-rounded"
                    alt="Project 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./assets/projects/10.png"
                    className="d-block w-100 img-rounded"
                    alt="Project 3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#projectCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#projectCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <span className="my-3 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              obcaecati modi ab dolorum at ipsum aut. Officiis expedita nesciunt
              deserunt dolore voluptate veritatis eos obcaecati eveniet animi,
              fuga provident, voluptatem quisquam vero? Dolorem culpa ut
              corrupti asperiores laudantium. Et ad, omnis illum corrupti
              similique mollitia quis ex ea excepturi laborum!
            </span>
            <span className="fs-5 fw-bold mb-1">Features:</span>
            <div className="d-grid d-md-flex d-lg-flex gap-3 align-items-end justify-content-between fs-6">
              <div className="d-grid gap-2 w-100">
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Point of Sale
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Inventory Management with PO/PR Generation
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Booking Website
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Booking Scheduling and Management
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i> Data
                  Analytics (Sales Monitoring, Descriptive and Predictive
                  Analytics)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Report Generation
                </span>
              </div>
              <button className="btn btn-sm btn-outline-light w-50">
                View <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
          {/* CrimeX */}
          <motion.div
            className="d-grid gap-2 shadow-sm p-3 p-lg-5 rounded mb-4 bg-dark text-light"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="display-6">
              CrimeX 2D Crime Scene Investigation Simulator (Web Portion)
            </span>
            <div
              id="crimexCarousel"
              className="carousel slide my-2 mx-auto"
              data-bs-ride="carousel"
              style={{ maxWidth: "650px" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./assets/projects/2.png"
                    className="d-block w-100 img-rounded"
                    alt="CrimeX Screenshot 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./assets/projects/3.png"
                    className="d-block w-100 img-rounded"
                    alt="CrimeX Screenshot 2"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#crimexCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#crimexCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <span className="my-3 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              obcaecati modi ab dolorum at ipsum aut. Officiis expedita nesciunt
              deserunt dolore voluptate veritatis eos obcaecati eveniet animi,
              fuga provident, voluptatem quisquam vero?
            </span>
            <span className="fs-5 fw-bold mb-1">Features:</span>
            <div className="d-grid d-md-flex d-lg-flex gap-3 align-items-end justify-content-between fs-6">
              <div className="d-grid gap-2 w-100">
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i> User
                  Registration with Email Verification
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i> Data
                  Graphical Charts (Compilation of student score)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i> Data
                  Analytics (Descriptive)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Report Generation
                </span>
              </div>
              <button className="btn btn-sm btn-outline-light w-50">
                View <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
          {/* Agency Portal */}
          <motion.div
            className="d-grid gap-2 shadow-sm p-3 p-lg-5 rounded mb-4 bg-dark text-light"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="display-6">Agency/Department Online Portal</span>
            <div
              id="agencyCarousel"
              className="carousel slide my-2 mx-auto"
              data-bs-ride="carousel"
              style={{ maxWidth: "650px" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./assets/projects/1.png"
                    className="d-block w-100 img-rounded"
                    alt="Agency Portal Screenshot"
                  />
                </div>
              </div>
            </div>
            <span className="my-3 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </span>
            <span className="fs-5 fw-bold mb-1">Features:</span>
            <div className="d-grid d-md-flex d-lg-flex gap-3 align-items-end justify-content-between fs-6">
              <div className="d-grid gap-2 w-100">
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Violation and Record Management
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Violator Online Portal
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i> Data
                  Analytics (Descriptive)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Activity Logs
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Report Generation
                </span>
              </div>
              <button className="btn btn-sm btn-outline-light w-50">
                View <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
          {/* ---------------- RESTAURANT/COFFEE SHOP POS SYSTEM ---------------- */}
          <motion.div
            className="d-grid gap-2 shadow-sm p-3 p-lg-5 rounded mb-4 bg-dark text-light"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="display-6">Restaurant/Coffee Shop POS System</span>

            <div
              id="posCarousel"
              className="carousel slide my-2 mx-auto"
              data-bs-ride="carousel"
              style={{ maxWidth: "650px" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./assets/projects/4.png"
                    className="d-block w-100 img-rounded"
                    alt="POS Screenshot 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./assets/projects/5.png"
                    className="d-block w-100 img-rounded"
                    alt="POS Screenshot 2"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#posCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#posCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <span className="my-3 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              obcaecati modi ab dolorum at ipsum aut. Officiis expedita nesciunt
              deserunt dolore voluptate veritatis eos obcaecati eveniet animi,
              fuga provident, voluptatem quisquam vero? Dolorem culpa ut
              corrupti asperiores laudantium. Et ad, omnis illum corrupti
              similique mollitia quis ex ea excepturi laborum!
            </span>

            <span className="fs-5 fw-bold mb-1">Features:</span>
            <div className="d-grid d-md-flex d-lg-flex gap-3 align-items-end justify-content-between fs-6">
              <div className="d-grid gap-2 w-100">
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Contactless Ordering (Order via phone by scanning QR Code)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Customer Queue Timer
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Real-Time Order Ready Alarm
                </span>
              </div>
              <button className="btn btn-sm btn-outline-light w-50">
                View <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
          {/* ---------------- AIRPORT MANAGEMENT SYSTEM (PROTOTYPE) ---------------- */}
          <motion.div
            className="d-grid gap-2 shadow-sm p-3 p-lg-5 rounded mb-4 bg-dark text-light"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="display-6">
              Airport Management System (Prototype)
            </span>

            <div
              id="airportCarousel"
              className="carousel slide my-2 mx-auto"
              data-bs-ride="carousel"
              style={{ maxWidth: "650px" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./assets/projects/6.png"
                    className="d-block w-100 img-rounded"
                    alt="Airport System Screenshot 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./assets/projects/7.png"
                    className="d-block w-100 img-rounded"
                    alt="Airport System Screenshot 2"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#airportCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#airportCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <span className="my-3 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              obcaecati modi ab dolorum at ipsum aut. Officiis expedita nesciunt
              deserunt dolore voluptate veritatis eos obcaecati eveniet animi,
              fuga provident, voluptatem quisquam vero? Dolorem culpa ut
              corrupti asperiores laudantium. Et ad, omnis illum corrupti
              similique mollitia quis ex ea excepturi laborum!
            </span>

            <span className="fs-5 fw-bold mb-1">Features:</span>
            <div className="d-grid d-md-flex d-lg-flex gap-3 align-items-end justify-content-between fs-6">
              <div className="d-grid gap-2 w-100">
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Ticket Booking (Website)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Shop
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Website
                </span>
              </div>
              <button className="btn btn-sm btn-outline-light w-50">
                View <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="d-grid gap-2 shadow-sm p-3 p-lg-5 rounded mb-4 bg-dark text-light"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="display-6">
              Resort Amenities/Facilities Management System
            </span>

            <div
              id="resortCarousel"
              className="carousel slide my-2 mx-auto"
              data-bs-ride="carousel"
              style={{ maxWidth: "650px" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./assets/projects/9.png"
                    className="d-block w-100 img-rounded"
                    alt="Resort System Screenshot 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./assets/projects/8.png"
                    className="d-block w-100 img-rounded"
                    alt="Resort System Screenshot 2"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#resortCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#resortCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <span className="my-3 fs-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
              obcaecati modi ab dolorum at ipsum aut. Officiis expedita nesciunt
              deserunt dolore voluptate veritatis eos obcaecati eveniet animi,
              fuga provident, voluptatem quisquam vero? Dolorem culpa ut
              corrupti asperiores laudantium. Et ad, omnis illum corrupti
              similique mollitia quis ex ea excepturi laborum!
            </span>

            <span className="fs-5 fw-bold mb-1">Features:</span>
            <div className="d-grid d-md-flex d-lg-flex gap-3 align-items-end justify-content-between fs-6">
              <div className="d-grid gap-2 w-100">
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i> QR
                  Code Generator (Printable)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Ratings (via Website)
                </span>
                <span>
                  <i className="fa-solid fa-circle-check text-primary"></i>{" "}
                  Online Website
                </span>
              </div>
              <button className="btn btn-sm btn-outline-light w-50">
                View <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
          {/* Continue wrapping the rest (POS System, Airport, Resort) the same way */}
        </div>
      </section>

      <motion.section
        id="contact"
        className="container-fluid bg-dark p-4 p-md-5"
        initial={{ opacity: 0, y: 50 }} // start hidden and slightly down
        whileInView={{ opacity: 1, y: 0 }} // animate to visible
        viewport={{ once: true, amount: 0.3 }} // trigger when 30% visible
        transition={{ duration: 0.8, ease: "easeOut" }} // smooth transition
      >
        <span className="display-3 fw-bold text-white">Contact</span>
        <div className="row justify-content-center align-items-stretch mt-5">
          <motion.div
            className="col-sm-12 col-md-12 col-lg-6 mb-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="d-grid gap-5 p-2 p-md-0 p-xl-0">
              <div className="d-grid d-lg-flex gap-3">
                <img
                  className="border rounded-circle border-light shadow mx-md-0 mx-lg-0"
                  height={100}
                  src="/assets/profile.png"
                  alt="logo"
                />
                <div className="d-grid justify-content-start">
                  <span className="fs-3 fw-bold text-light">
                    Angelo F. Validad
                  </span>
                  <span className="fs-6 fw-bold text-light">
                    Bacolod City, Negros Occidental, Philippines 6100
                  </span>
                  <span className="fs-6 fw-bold text-light">Male</span>
                </div>
              </div>
              <div className="d-grid gap-4 text-light fs-5">
                <a href="#!" className="text-decoration-none text-light">
                  <i className="fa-brands fa-facebook"></i> ArtByGelay Official
                  (Graphics Design)
                </a>
                <a href="#!" className="text-decoration-none text-light">
                  <i className="fa-brands fa-facebook-messenger"></i> ConCat
                  Softwares (Software Development)
                </a>
                <a href="#!" className="text-decoration-none text-light">
                  <i className="fa-solid fa-at"></i>{" "}
                  validad.angelo.f01@gmail.com
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.upwork.com/freelancers/~016b497ca9a3c39794?mp_source=share"
                  className="text-decoration-none text-light"
                >
                  <i className="fa-brands fa-square-upwork"></i> Angelo Validad
                </a>
                <a href="#!" className="text-decoration-none text-light">
                  <i className="fa-solid fa-mobile-screen-button"></i> +63 992
                  905 3534
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/CodePai09"
                  className="text-decoration-none text-light"
                >
                  <i className="fa-brands fa-square-github"></i> CodePai09
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-sm-12 col-md-12 col-lg-6 text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="d-grid h-100 gap-5 align-items-center">
              <span className="text-light display-3">
                "Master your skills, and success will follow"
              </span>

              <a
                href="#home"
                className="btn btn-sm btn-outline-light mt-auto w-50 ms-auto"
              >
                Back to Top
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <div className="container-fluid bg-light p-3 text-center fw-bold">
        © 2025 Angelo Validad. All Rights Reserved.
      </div>
      <div
        className="offcanvas offcanvas-start w-25"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Colored with scrolling
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasWithBackdrop"
        aria-labelledby="offcanvasWithBackdropLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
            Offcanvas with backdrop
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>.....</p>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Backdroped with scrolling
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </>
  );
}
