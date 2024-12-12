document.addEventListener("DOMContentLoaded", function() {
    const dropdownContent = document.querySelector(".dropdown-content");
    const dropdownArrow = document.querySelector(".dropdown-arrow");
    const menuIcon = document.querySelector("#menu-icon");

    function showDropdown() {
        dropdownContent.style.display = "block";
        setTimeout(() => {
            dropdownContent.classList.add("show");
        }, 10);
        dropdownArrow.classList.add("rotate");
    }

    function hideDropdown() {
        dropdownContent.classList.add("hide");
        dropdownArrow.classList.remove("rotate");

        setTimeout(() => {
            dropdownContent.classList.remove("hide");
            dropdownContent.style.display = "none";
        }, 300);
    }

    dropdownArrow.addEventListener("click", function(event) {
        event.stopPropagation();

        if (dropdownContent.style.display === "block") {
            hideDropdown();
        } else {
            showDropdown();
        }
    });

    document.addEventListener("click", function(event) {
        if (!dropdownContent.contains(event.target) && !dropdownArrow.contains(event.target)) {
            if (dropdownContent.style.display === "block") {
                hideDropdown();
            }
        }
    });

    menuIcon.addEventListener("click", function() {
        if (dropdownContent.style.display === "block") {
            hideDropdown();
        }
    });

    dropdownContent.addEventListener("click", function(event) {
        event.stopPropagation();
    });
});