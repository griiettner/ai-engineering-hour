/**
 * nav.js — Shared section navigation for Engineering Hour
 *
 * Handles:
 *  - Section show/hide via nav buttons
 *  - Active nav state
 *  - Session-complete banner on last section
 *  - URL hash sync (#sectionId) — survives refresh
 *  - Calls window.onNavigate(sectionId) hook for page-specific logic
 *
 * Usage in each partN.html:
 *  <script src="nav.js" defer></script>
 *
 *  // Optional: page-specific logic (chart init, etc.)
 *  window.onNavigate = function(sectionId) { ... };
 */
(function () {
    'use strict';

    function getLastSectionId() {
        var buttons = document.querySelectorAll('.nav-item');
        if (!buttons.length) return null;
        var lastId = buttons[buttons.length - 1].id;
        return lastId ? lastId.replace('nav-', '') : null;
    }

    function getFirstSectionId() {
        var first = document.querySelector('.nav-item');
        return first ? first.id.replace('nav-', '') : null;
    }

    function getSectionFromHash() {
        var hash = location.hash.replace('#', '');
        return hash && document.getElementById('sec-' + hash) ? hash : null;
    }

    function navigate(sectionId, updateHash) {
        // Nav active state
        document.querySelectorAll('.nav-item').forEach(function (btn) {
            btn.classList.remove('active');
        });
        var navEl = document.getElementById('nav-' + sectionId);
        if (navEl) navEl.classList.add('active');

        // Section visibility
        document.querySelectorAll('main > section').forEach(function (sec) {
            sec.classList.add('hidden');
        });
        var secEl = document.getElementById('sec-' + sectionId);
        if (secEl) secEl.classList.remove('hidden');

        // Session-complete banner on last section
        var complete = document.getElementById('session-complete');
        var lastId = getLastSectionId();
        if (complete && lastId) {
            complete.classList.toggle('hidden', sectionId !== lastId);
        }

        // URL hash (skip when triggered by hashchange to avoid loop)
        if (updateHash !== false) {
            history.replaceState(null, '', '#' + sectionId);
        }

        // Page-specific hook
        if (typeof window.onNavigate === 'function') {
            window.onNavigate(sectionId);
        }
    }

    // ── Copy code helper ───────────────────────────────────────────
    function copyCode(id) {
        navigator.clipboard.writeText(document.getElementById(id).innerText);
    }

    // Expose globally
    window.navigate = navigate;
    window.copyCode = copyCode;

    // React to hash changes (back/forward, manual URL edit)
    window.addEventListener('hashchange', function () {
        var section = getSectionFromHash();
        if (section) navigate(section, false);
    });

    // Auto-init on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
        var section = getSectionFromHash() || getFirstSectionId();
        if (section) navigate(section);
    });
})();
