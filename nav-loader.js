(function() {
    // 1. ZENTRALES CSS FÜR MOBILE ANPASSUNG INJIZIEREN
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
                    color: #333333 !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. HAUPTFUNKTION ZUM BAUEN DER NAVIGATION
    function initNav() {
        let rawPage = window.location.pathname.split("/").pop().split("?")[0].split("#")[0];
        let currentPage = (!rawPage || rawPage === "" || rawPage === "index.html") ? "scm.html" : rawPage;

        // Container suchen oder automatisch direkt nach dem <header> erstellen, falls er fehlt!
        let container = document.getElementById("dynamic-nav");
        if (!container) {
            const headerEl = document.querySelector("header");
            if (headerEl) {
                container = document.createElement("div");
                container.id = "dynamic-nav";
                headerEl.insertAdjacentElement("afterend", container);
            } else {
                return;
            }
        }

        if (typeof dashboardConfig === "undefined" || !dashboardConfig.modules) {
            console.error("Warte auf nav-config.js...");
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

    // 3. ZENTRALES KLICK-HANDLING FÜR MOBILE HAMBURGER & MENÜ
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

        const navLink = e.target.closest("#main-nav a, .sub-nav a");
        if (navLink) {
            const mainNav = document.getElementById("main-nav");
            const toggleBtn = document.getElementById("hamburger-toggle");
            if (mainNav) mainNav.classList.remove("mobile-active");
            if (toggleBtn) toggleBtn.innerHTML = "☰";
        }
    });

    // 4. LADESTEUERUNG (Prüft auch, ob nav-config.js nachgeladen werden muss)
    if (typeof dashboardConfig !== "undefined") {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initNav);
        } else {
            initNav();
        }
    } else {
        // Falls nav-config.js im Kopf vergessen wurde, lädt der Loader sie dynamisch nach!
        const script = document.createElement("script");
        script.src = "nav-config.js";
        script.onload = initNav;
        document.head.appendChild(script);
    }
})();
