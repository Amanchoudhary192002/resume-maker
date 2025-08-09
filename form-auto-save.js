
document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    "full-name", "email", "contact-number", "current-city",
    "gender", "languages", "key-achievements", "summary"
  ];

  // Load static input fields
  fields.forEach(id => {
    const savedValue = localStorage.getItem(id);
    const el = document.getElementById(id);
    if (el && savedValue !== null) el.value = savedValue;
    if (el) {
      el.addEventListener("input", () => {
        localStorage.setItem(id, el.value);
      });
    }
  });

  // Education
  function saveEducationData() {
    const items = document.querySelectorAll("#education-container .education-item");
    const data = [];
    items.forEach(item => {
      const obj = {};
      item.querySelectorAll("[data-field]").forEach(input => {
        obj[input.dataset.field] = input.value;
      });
      data.push(obj);
    });
    localStorage.setItem("educationData", JSON.stringify(data));
  }

  function loadEducationData() {
    const saved = localStorage.getItem("educationData");
    if (saved) {
      const data = JSON.parse(saved);
      data.forEach(entry => {
        const newItem = addEducationItem();
        newItem.querySelectorAll("[data-field]").forEach(input => {
          const field = input.dataset.field;
          if (entry[field]) input.value = entry[field];
        });
      });
    }
  }

  // Experience
  function saveExperienceData() {
    const items = document.querySelectorAll("#experience-container .experience-item");
    const data = [];
    items.forEach(item => {
      const obj = {};
      item.querySelectorAll("[data-field]").forEach(input => {
        if (input.type === "checkbox") {
          obj[input.dataset.field] = input.checked;
        } else {
          obj[input.dataset.field] = input.value;
        }
      });
      data.push(obj);
    });
    localStorage.setItem("experienceData", JSON.stringify(data));
  }

  function loadExperienceData() {
    const saved = localStorage.getItem("experienceData");
    if (saved) {
      const data = JSON.parse(saved);
      data.forEach(entry => {
        const newItem = addExperienceItem();
        newItem.querySelectorAll("[data-field]").forEach(input => {
          const field = input.dataset.field;
          if (input.type === "checkbox") {
            input.checked = entry[field];
          } else {
            input.value = entry[field] || "";
          }
        });
      });
    }
  }

  // Skills
  function saveSkillsData() {
    const inputs = document.querySelectorAll("#skills-container input");
    const skills = [];
    inputs.forEach(input => {
      skills.push(input.value);
    });
    localStorage.setItem("skillsData", JSON.stringify(skills));
  }

  function loadSkillsData() {
    const saved = localStorage.getItem("skillsData");
    if (saved) {
      const skills = JSON.parse(saved);
      skills.forEach(skill => {
        const input = addSkillInput();
        input.value = skill;
      });
    }
  }

  // Projects
  function saveProjectsData() {
    const items = document.querySelectorAll("#projects-container .project-item");
    const data = [];
    items.forEach(item => {
      const obj = {};
      item.querySelectorAll("[data-field]").forEach(input => {
        obj[input.dataset.field] = input.value;
      });
      data.push(obj);
    });
    localStorage.setItem("projectsData", JSON.stringify(data));
  }

  function loadProjectsData() {
    const saved = localStorage.getItem("projectsData");
    if (saved) {
      const data = JSON.parse(saved);
      data.forEach(entry => {
        const newItem = addProjectItem();
        newItem.querySelectorAll("[data-field]").forEach(input => {
          const field = input.dataset.field;
          input.value = entry[field] || "";
        });
      });
    }
  }

  // Portfolio
  function savePortfolioData() {
    const items = document.querySelectorAll("#portfolio-container .portfolio-item");
    const data = [];
    items.forEach(item => {
      const obj = {};
      item.querySelectorAll("[data-field]").forEach(input => {
        obj[input.dataset.field] = input.value;
      });
      data.push(obj);
    });
    localStorage.setItem("portfolioData", JSON.stringify(data));
  }

  function loadPortfolioData() {
    const saved = localStorage.getItem("portfolioData");
    if (saved) {
      const data = JSON.parse(saved);
      data.forEach(entry => {
        const newItem = addPortfolioItem();
        newItem.querySelectorAll("[data-field]").forEach(input => {
          const field = input.dataset.field;
          input.value = entry[field] || "";
        });
      });
    }
  }

  // Certifications
  function saveCertificationsData() {
    const items = document.querySelectorAll("#certifications-container .certification-item");
    const data = [];
    items.forEach(item => {
      const obj = {};
      item.querySelectorAll("[data-field]").forEach(input => {
        obj[input.dataset.field] = input.value;
      });
      data.push(obj);
    });
    localStorage.setItem("certificationsData", JSON.stringify(data));
  }

  function loadCertificationsData() {
    const saved = localStorage.getItem("certificationsData");
    if (saved) {
      const data = JSON.parse(saved);
      data.forEach(entry => {
        const newItem = addCertificationItem();
        newItem.querySelectorAll("[data-field]").forEach(input => {
          const field = input.dataset.field;
          input.value = entry[field] || "";
        });
      });
    }
  }

  // Load everything on start
  loadEducationData();
  loadExperienceData();
  loadSkillsData();
  loadProjectsData();
  loadPortfolioData();
  loadCertificationsData();

  // Hook into saving actions if you want auto-save when navigating
  // Example:
  // document.getElementById("next-btn").addEventListener("click", () => {
  //   saveEducationData();
  //   saveExperienceData();
  //   ...
  // });
});
