document.addEventListener("DOMContentLoaded", function() {
    // 1. Aktuelle Seite aus der URL auslesen
    const currentPage = window.location.pathname.split("/").pop() || "scm.html";

    if (typeof dashboardConfig === "undefined" || !dashboardConfig.modules) {
        console.error("Fehler: dashboardConfig ist nicht geladen!");
        return;
    }

    // 2. Haupt-Navigation aufbauen
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

    // 3. Unter-Navigation (Sub-Nav) aufbauen
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

    // 5. Mobile Hamburger-Steuerung (funktioniert sofort nach dem Einfügen)
    const toggleBtn = document.getElementById('hamburger-toggle');
    const mainNav = document.getElementById('main-nav');

    if (toggleBtn && mainNav) {
        toggleBtn.onclick = function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('mobile-active');
            toggleBtn.innerHTML = mainNav.classList.contains('mobile-active') ? '✕' : '☰';
        };

        // Menü schliessen, wenn ausserhalb oder auf einen Link geklickt wird
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && e.target !== toggleBtn) {
                mainNav.classList.remove('mobile-active');
                toggleBtn.innerHTML = '☰';
            }
        });
    }
});
