document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop() || "scm.html";

    // 1. Haupt-Navigation generieren
    let mainNavHTML = '<nav id="main-nav">';
    let activeModule = null;

    dashboardConfig.modules.forEach(mod => {
        // Prüfen, ob die aktuelle Seite zu diesem Modul gehört
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

    // 2. Unter-Navigation generieren (falls das Modul Unterseiten hat)
    let subNavHTML = '';
    if (activeModule && activeModule.subPages) {
        subNavHTML = '<div class="sub-nav">';
        activeModule.subPages.forEach(sub => {
            const isSubActive = (sub.file === currentPage);
            subNavHTML += `<a href="${sub.file}" class="${isSubActive ? 'active' : ''}">${sub.name}</a>`;
        });
        subNavHTML += '</div>';
    }

    // 3. In den Container auf der Seite einfügen
    const container = document.getElementById("dynamic-nav");
    if (container) {
        container.innerHTML = mainNavHTML + subNavHTML;
    }

    // 4. Mobile Hamburger-Menü Steuerung
    const toggleBtn = document.getElementById('hamburger-toggle');
    const mainNav = document.getElementById('main-nav');
    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-active');
            toggleBtn.innerHTML = mainNav.classList.contains('mobile-active') ? '✕' : '☰';
        });
    }
});
