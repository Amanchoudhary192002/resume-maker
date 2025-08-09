function showPopup() {
      const overlay = document.getElementById("popupOverlay");
      overlay.classList.remove("hidden");

      // Auto redirect after 3 seconds
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    }

    function destroyPopup() {
      const popup = document.getElementById("popupOverlay");
      popup.remove(); // ✅ Completely removes the popup from DOM
    }

    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");

    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });