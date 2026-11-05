// Zentrale Konfiguration für alle Module und Unterkapitel mit sprechenden Titeln
const dashboardConfig = {
    modules: [
        { id: "scm", name: "SCM", file: "scm.html" },
        { id: "unlo", name: "UNLO", file: "unlo.html" },
        { 
            id: "belo", 
            name: "BELO", 
            file: "belo_teil1.html",
            subPages: [
                { name: "Teil 1: Grundlagen", file: "belo_teil1.html" },
                { name: "Teil 2: Sourcing & MoB", file: "belo_teil2.html" },
                { name: "Teil 3: Kennzahlen", file: "belo_teil3.html" },
                { name: "Teil 4: Bedarfsermittlung", file: "belo_teil4.html" },
                { name: "Teil 5: Beschaffungswege & Losgröße", file: "belo_teil5.html" }
            ]
        },
        { 
            id: "lalo", 
            name: "LALO", 
            file: "lalo_teil1.html",
            subPages: [
                { name: "Teil 1: Materialwirtschaft", file: "lalo_teil1.html" },
                { name: "Teil 2: Kommissionierung", file: "lalo_teil2.html" },
                { name: "Teil 3: Transportsysteme", file: "lalo_teil3.html" },
                { name: "Teil 4: Lagerstrategien", file: "lalo_teil4.html" },
                { name: "Teil 5: Distribution", file: "lalo_teil5.html" },
                { name: "Teil 6: Risiken & Repetition", file: "lalo_teil6.html" }
            ]
        },
        { 
            id: "as", 
            name: "AS", 
            file: "as_teil1.html",
            subPages: [
                { name: "Teil 1: Grundlagen & Recht", file: "as_teil1.html" },
                { name: "Teil 2: Akteure & STOP", file: "as_teil2.html" },
                { name: "Teil 3: Notfall & PSA", file: "as_teil3.html" }
            ]
        },
        { 
            id: "prod", 
            name: "PROLO", 
            file: "prod_kap6.html",
            subPages: [
                { name: "Kapitel 6: PPS", file: "prod_kap6.html" },
                { name: "Kapitel 7: Steuerung", file: "prod_kap7.html" },
                { name: "Kapitel 8: Strategien", file: "prod_kap8.html" },
                { name: "Kapitel 9: Layout", file: "prod_kap9.html" },
                { name: "Zusatz: Kosten & Risiko", file: "prod_zusatz.html" }
            ]
        }
    ]
};
