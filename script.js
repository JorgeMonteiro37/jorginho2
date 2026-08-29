const menuButton = document.getElementById("menuButton");
const navigationMenu = document.getElementById("navigationMenu");
const navigationLinks = document.querySelectorAll(".navigation-menu a");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const phoneInput = document.getElementById("phone");

function toggleMenu() {
    const menuIsOpen = navigationMenu.classList.toggle("active");

    menuButton.classList.toggle("active", menuIsOpen);
    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
    menuButton.setAttribute(
        "aria-label",
        menuIsOpen ? "Fechar menu" : "Abrir menu"
    );

    document.body.classList.toggle("menu-open", menuIsOpen);
}

function closeMenu() {
    navigationMenu.classList.remove("active");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", toggleMenu);

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});

/* Exibe automaticamente o ano atual no rodapé. */
currentYear.textContent = new Date().getFullYear();

/* Formatação simples do telefone. */
phoneInput.addEventListener("input", (event) => {
    let phone = event.target.value.replace(/\D/g, "").slice(0, 11);

    if (phone.length > 10) {
        phone = phone.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
        );
    } else if (phone.length > 6) {
        phone = phone.replace(
            /(\d{2})(\d{4})(\d{0,4})/,
            "($1) $2-$3"
        );
    } else if (phone.length > 2) {
        phone = phone.replace(
            /(\d{2})(\d{0,5})/,
            "($1) $2"
        );
    } else if (phone.length > 0) {
        phone = phone.replace(/(\d{0,2})/, "($1");
    }

    event.target.value = phone;
});

/*
 * Demonstração do formulário.
 * Para enviar mensagens de verdade, será necessário conectar
 * o formulário a um servidor ou serviço de formulários.
 */
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Preencha os campos obrigatórios.";
        formStatus.style.color = "#b42318";
        return;
    }

    formStatus.textContent =
        `Mensagem registrada, ${name}. Retornarei o contato em breve.`;

    formStatus.style.color = "#0c7a4c";
    contactForm.reset();
});

/* Animação das barras de habilidades. */
const progressBars = document.querySelectorAll(".progress span");

const progressObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const progress = entry.target.dataset.progress;
            entry.target.style.width = `${progress}%`;
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.4
    }
);

progressBars.forEach((bar) => {
    progressObserver.observe(bar);
});

/* Destaca no menu a seção visível. */
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navigationLinks.forEach((link) => {
                const linkTarget = link.getAttribute("href");
                link.classList.toggle(
                    "active",
                    linkTarget === `#${entry.target.id}`
                );
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});
