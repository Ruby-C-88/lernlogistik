(function() {
    // 1. ZENTRALES CSS FÜR MOBILE ANPASSUNG (Verhindert CSS-Konflikte auf Unterseiten)
    if (!document.getElementById("nav-dynamic-styles")) {
        const style = document.createElement("style");
        style.id = "nav-dynamic-styles";
        style.textContent = `
            @media (max-width: 767px) {
                .hamburger-btn { 
                    display: block !important; 
                    z-index: 9999 !important; 
                    cursor: pointer !important; 
                }
                #main-nav { 
                    display: none !important; 
                    flex-direction: column !important; 
                    width: 100% !important; 
                    margin: 0 !important; 
                    background-color: #ffffff !important;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important;
                }
                #main-nav.mobile-active { 
                    display: flex !important; 
                }
                #main-nav a { 
                    width: 100% !important; 
                    box-sizing: border-box !important; 
                    display: block !important;
                    padding: 12px 20px !important;
                    border-bottom: 1px solid #e2e8f0 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. NAVIGATION DYNAMISCH GENERIEREN
    function buildNavigation() {
        let rawPage = window.location.pathname.split("/").pop().split("?")[0].split("#")[0];
        let currentPage = (!rawPage || rawPage === "index.html") ? "scm.html" : rawPage;

        const container = document.getElementById("dynamic-nav");
        if (!container) return;

        if (typeof dashboardConfig === "undefined" || !dashboardConfig.modules) {
            console.error("Fehler: nav-config.js wurde nicht geladen!");
            return;
        }

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

        let subNavHTML = '';
        if (activeModule && activeModule.subPages && activeModule.subPages.length > 0) {
            subNavHTML = '<div class="sub-nav">';
            activeModule.subPages.forEach(sub => {
                const isSubActive = (sub.file === currentPage);
                subNavHTML += `<a href="${sub.file}" class="${isSubActive ? 'active' : ''}">${sub.name}</a>`;
            });
            subNavHTML += '</div>';
        }

        container.innerHTML = mainNavHTML + subNavHTML;
    }

    // 3. ZENTRALES KLICK-HANDLING (Hamburger-Button & Menü-Links)
    document.addEventListener("click", function(e) {
        const toggleBtn = e.target.closest("#hamburger-toggle");
        if (toggleBtn) {
            e.preventDefault();
            e.stopPropagation();
            const mainNav = document.getElementById("main-nav");
            if (mainNav) {
                const isOpen = mainNav.classList.toggle("mobile-active");
                toggleBtn.innerHTML = isOpen ? "✕" : "☰";
            }
            return;
        }

        const navLink = e.target.closest("#main-nav a");
        if (navLink) {
            const mainNav = document.getElementById("main-nav");
            const toggleBtn = document.getElementById("hamburger-toggle");
            if (mainNav) mainNav.classList.remove("mobile-active");
            if (toggleBtn) toggleBtn.innerHTML = "☰";
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildNavigation);
    } else {
        buildNavigation();
    }
})();
