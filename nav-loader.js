document.addEventListener("DOMContentLoaded", function() {
    // 1. Aktuelle Seite aus der URL bestimmen
    const currentPage = window.location.pathname.split("/").pop() || "scm.html";

    if (typeof dashboardConfig === "undefined" || !dashboardConfig.modules) {
        console.error("Fehler: dashboardConfig ist nicht geladen!");
        return;
    }

    // 2. Haupt-Navigation generieren
    let mainNavHTML = '<nav id="main-nav">';
    let activeModule = null;

    dashboardConfig.modules.forEach(mod => {
        let isActive = false;
        if (mod.file === currentPage) {
            isActive = true;
            activeModule = mod;
        } else if (mod.subPages && mod.subPages.some(sub => sub.file === currentPage)) {
            isActive = true;
            activeModule = mod;
        }

        mainNavHTML += `<a href="${mod.file}" class="${isActive ? 'active' : ''}">${mod.name}</a>`;
    });
    mainNavHTML += '</nav>';

    // 3. Unter-Navigation generieren
    let subNavHTML = '';
    if (activeModule && activeModule.subPages) {
        subNavHTML = '<div class="sub-nav">';
        activeModule.subPages.forEach(sub => {
            const isSubActive = (sub.file === currentPage);
            subNavHTML += `<a href="${sub.file}" class="${isSubActive ? 'active' : ''}">${sub.name}</a>`;
        });
        subNavHTML += '</div>';
    }

    // 4. In den Platzhalter der Seite einfügen
    const container = document.getElementById("dynamic-nav");
    if (container) {
        container.innerHTML = mainNavHTML + subNavHTML;
    }
});

// 5. ZENTRALES KLICK-HANDLING (Funktioniert auf allen Seiten ohne HTML-Anpassung)
document.addEventListener("click", function(e) {
    // Hamburger-Button Klick abfangen
    const toggleBtn = e.target.closest("#hamburger-toggle");
    if (toggleBtn) {
        e.preventDefault();
        const mainNav = document.getElementById("main-nav");
        if (mainNav) {
            mainNav.classList.toggle("mobile-active");
            toggleBtn.innerHTML = mainNav.classList.contains("mobile-active") ? "✕" : "☰";
        }
        return;
    }

    // Klick auf einen Navigationslink (Menü mobil wieder zuklappen)
    const navLink = e.target.closest("#main-nav a, .sub-nav a");
    if (navLink) {
        const mainNav = document.getElementById("main-nav");
        const toggleBtn = document.getElementById("hamburger-toggle");
        if (mainNav) mainNav.classList.remove("mobile-active");
        if (toggleBtn) toggleBtn.innerHTML = "☰";
    }
});
