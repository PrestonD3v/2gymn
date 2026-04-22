(function () {
    "use strict";

    function getClassIdFromPath() {
        const rawPath = window.location.pathname;

        const parts = rawPath
            .split("/")
            .filter(Boolean)
            .map(part => decodeURIComponent(part));

        if (parts.length === 0) {
            return null;
        }

        const lastPart = parts[parts.length - 1];

        const looksLikeFile = lastPart.includes(".");

        if (looksLikeFile) {
            return parts[parts.length - 2] || null;
        }

        return lastPart || null;
    }

    function initProgramPage() {
        const classId = getClassIdFromPath();

        if (!classId) {
            console.error("Δεν βρέθηκε όνομα τμήματος από το path.");
            return;
        }

        const pdfPath = `../../programs/${classId}.pdf`;

        document.title = `${classId} | Μαθητική Ιστοσελίδα | 2ο Γυμνάσιο Χανίων`;

        const headingEl = document.getElementById("class-title");
        if (headingEl) {
            headingEl.textContent = classId;
        }

        const viewerEl = document.getElementById("pdf-viewer");
        if (viewerEl) {
            viewerEl.src = `${pdfPath}#toolbar=1&navpanes=0&view=FitH`;
            viewerEl.title = `Πρόγραμμα ${classId}`;
        }

        const linkEl = document.getElementById("pdf-link");
        if (linkEl) {
            linkEl.href = pdfPath;
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProgramPage);
    } else {
        initProgramPage();
    }
})();