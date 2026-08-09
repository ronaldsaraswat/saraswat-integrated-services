const menuToggle =
    document.querySelector(".menu-toggle");

const siteNav =
    document.querySelector(".site-nav");

const navLinks =
    document.querySelectorAll(".site-nav a");


if (menuToggle && siteNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                siteNav.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    siteNav.classList.remove("open");

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        }
    );

}
