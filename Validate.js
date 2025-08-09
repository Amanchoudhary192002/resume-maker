document.getElementById('resume-upload').addEventListener('change', handlePDFUpload);

async function handlePDFUpload(event) {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async function() {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(" ");
            fullText += pageText + "\n";
        }

        extractInfo(fullText);
    };
    fileReader.readAsArrayBuffer(file);
}

function extractInfo(text) {
    // Name (first two capitalized words)
    const nameMatch = text.match(/([A-Z][a-z]+\s[A-Z][a-z]+)/);
    if (nameMatch) document.getElementById('full-name').value = nameMatch[0];

    // Email
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    if (emailMatch) document.getElementById('email').value = emailMatch[0];

    // Contact Number
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10}/);
    if (phoneMatch) document.getElementById('contact-number').value = phoneMatch[0];

    // Summary (find section starting with "Summary" or "Profile")
    const summaryMatch = text.match(/(?:Summary|Profile)[:\s-]*(.+?)(?:Experience|Education|Skills|$)/is);
    if (summaryMatch) document.getElementById('summary').value = summaryMatch[1].trim();
}
















// Load saved data on page load
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("contactInfo"));
  if (saved) {
    document.getElementById("full-name").value = saved.fullName || "";
    document.getElementById("email").value = saved.email || "";
    document.getElementById("contact-number").value = saved.contactNumber || "";
    document.getElementById("current-city").value = saved.currentCity || "";
    document.getElementById("summary").value = saved.summary || "";
  }
};

// Auto-save on input
const inputs = ["full-name", "email", "contact-number", "current-city", "summary"];
inputs.forEach(id => {
  document.getElementById(id).addEventListener("input", saveData);
});

function saveData() {
  const contact = {
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    contactNumber: document.getElementById("contact-number").value,
    currentCity: document.getElementById("current-city").value,
    summary: document.getElementById("summary").value
  };
  localStorage.setItem("contactInfo", JSON.stringify(contact));
}

function resetForm() {
  const confirmed = confirm("Are you sure? Your personal data will be deleted.");
  if (confirmed) {
    // Clear input fields
    inputs.forEach(id => {
      document.getElementById(id).value = "";
    });

    // Remove from localStorage
    localStorage.removeItem("contactInfo");

    // Optional: confirmation alert
    alert("Personal data has been deleted.");
  }
}










const startSelect = document.getElementById("start-year");
  const endSelect = document.getElementById("end-year");

  const baseYear = 1980;
  const currentYear = new Date().getFullYear();
  const maxYear = 2040;

  // Populate Start Year dropdown
  for (let year = baseYear; year <= maxYear; year++) {
    const option = new Option(year, year);
    if (year === 2020) option.selected = true; // Default Start Year
    startSelect.add(option);
  }

  // Function to populate End Year based on Start Year
  function populateEndYears(startYear) {
    endSelect.innerHTML = ""; // clear existing options

    const endRangeMax = Math.min(startYear + 15, maxYear); // max end year

    for (let year = startYear; year <= endRangeMax; year++) {
      const option = new Option(year, year);
      if (year === startYear + 3) option.selected = true; // Default: 3 years after start
      endSelect.add(option);
    }
  }

  // Initial setup
  const defaultStartYear = parseInt(startSelect.value);
  populateEndYears(defaultStartYear);

  // Update End Year options on Start Year change
  startSelect.addEventListener("change", () => {
    const selectedStartYear = parseInt(startSelect.value);
    populateEndYears(selectedStartYear);
  });

  

// scoreValidation.js

document.addEventListener("DOMContentLoaded", function () {
  const scoreValueInput = document.getElementById('scoreValue');
  const scoreTypeSelect = document.getElementById('scoreType');

  function validateScoreInput() {
    const scoreType = scoreTypeSelect.value;
    const value = scoreValueInput.value.trim();

    // Clear previous error styles
    scoreValueInput.classList.remove("border-red-500");

    if (value === "") return;

    const numberValue = parseFloat(value);

    if (isNaN(numberValue)) {
      scoreValueInput.classList.add("border-red-500");
      alert("Please enter a valid number.");
      return;
    }

    if (scoreType === "CGPA") {
      if (numberValue < 0 || numberValue > 10) {
        scoreValueInput.classList.add("border-red-500");
        alert("CGPA must be between 0.00 and 10.00");
        return;
      }

      const cgpaPattern = /^\d{1,2}(\.\d{1,2})?$/;
      if (!cgpaPattern.test(value)) {
        scoreValueInput.classList.add("border-red-500");
        alert("CGPA must be a number with up to 2 decimal places.");
        return;
      }
    }

    if (scoreType === "Percentage") {
      if (numberValue < 0 || numberValue > 100) {
        scoreValueInput.classList.add("border-red-500");
        alert("Percentage must be between 0 and 100.");
        return;
      }
    }
  }

  // Event listeners
  scoreValueInput.addEventListener('blur', validateScoreInput);
  scoreTypeSelect.addEventListener('change', validateScoreInput);
});


document.addEventListener('DOMContentLoaded', () => {
    function toggleEndDateCheckbox(container) {
        const checkbox = container.querySelector('[data-field="currentlyWorking"]');
        const endDateInput = container.querySelector('[data-field="endDate"]');

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                endDateInput.disabled = true;
                endDateInput.value = ''; // optional: clear value
            } else {
                endDateInput.disabled = false;
            }
        });
    }

    // For all existing experience items
    document.querySelectorAll('.experience-item').forEach(item => {
        toggleEndDateCheckbox(item);
    });

    // If you're dynamically adding experience sections
    const addButton = document.getElementById('add-experience-btn');
    addButton.addEventListener('click', () => {
        setTimeout(() => {
            const items = document.querySelectorAll('.experience-item');
            const newItem = items[items.length - 1]; // Get last added item
            toggleEndDateCheckbox(newItem);
        }, 0);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    function setupExperienceValidation(container) {
        const startDateInput = container.querySelector('[data-field="startDate"]');
        const endDateInput = container.querySelector('[data-field="endDate"]');
        const currentlyWorkingCheckbox = container.querySelector('[data-field="currentlyWorking"]');

        // Disable end date if currently working
        currentlyWorkingCheckbox.addEventListener('change', () => {
            if (currentlyWorkingCheckbox.checked) {
                endDateInput.disabled = true;
                endDateInput.value = '';
            } else {
                endDateInput.disabled = false;
            }
        });

        // Validate end date ≥ start date
        function validateDates() {
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);

            if (
                !currentlyWorkingCheckbox.checked &&
                startDateInput.value &&
                endDateInput.value &&
                startDate > endDate
            ) {
                alert("End Date should not be before Start Date.");
                endDateInput.value = '';
            }
        }

        startDateInput.addEventListener('change', () => {
            if (startDateInput.value) {
                const year = new Date(startDateInput.value).getFullYear();
                if (year >= 2025) {
                    const suggestedEndYear = year + 15;
                    console.log(`Suggest an end year up to: ${suggestedEndYear}`); // optional
                }
            }
            validateDates();
        });

        endDateInput.addEventListener('change', validateDates);
    }

    // Apply logic to existing experience items
    document.querySelectorAll('.experience-item').forEach(setupExperienceValidation);

    // Add validation to new items
    const addButton = document.getElementById('add-experience-btn');
    addButton.addEventListener('click', () => {
        setTimeout(() => {
            const items = document.querySelectorAll('.experience-item');
            const newItem = items[items.length - 1];
            setupExperienceValidation(newItem);
        }, 0);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function setupProjectDateValidation(container) {
        const startMonth = container.querySelector('[data-field="startMonth"]');
        const endMonth = container.querySelector('[data-field="endMonth"]');
        const ongoingCheckbox = container.querySelector('[data-field="ongoing"]');

        // Disable/Enable endMonth based on ongoing checkbox
        ongoingCheckbox.addEventListener('change', () => {
            if (ongoingCheckbox.checked) {
                endMonth.disabled = true;
                endMonth.value = '';
            } else {
                endMonth.disabled = false;
            }
        });

        // Validate startMonth <= endMonth
        function validateProjectDates() {
            const start = new Date(startMonth.value);
            const end = new Date(endMonth.value);

            if (
                !ongoingCheckbox.checked &&
                startMonth.value &&
                endMonth.value &&
                start > end
            ) {
                alert("End Month cannot be before Start Month.");
                endMonth.value = '';
            }
        }

        startMonth.addEventListener('change', validateProjectDates);
        endMonth.addEventListener('change', validateProjectDates);
    }

    // Setup for all existing project forms
    document.querySelectorAll('.project-item').forEach(setupProjectDateValidation);

    // Setup for dynamically added project items (if any)
    const addButton = document.getElementById('add-project-btn');
    if (addButton) {
        addButton.addEventListener('click', () => {
            setTimeout(() => {
                const items = document.querySelectorAll('.project-item');
                const latest = items[items.length - 1];
                setupProjectDateValidation(latest);
            }, 0);
        });
    }
});



