/**
 * Engineering Hour — i18n Runtime
 * Lightweight, zero-dependency internationalization for static HTML pages.
 *
 * Usage: add <script src="i18n.js"></script> to <head>.
 * Strings are loaded from locales/{lang}/common.json + locales/{lang}/{page}.json.
 * PT-BR is the canonical source (the HTML itself) — no pt/ JSON needed.
 */
;(function () {
  'use strict'

  const STORAGE_KEY = 'eh_lang'
  const DEFAULT_LANG = 'pt'
  const SUPPORTED = ['pt', 'en']

  function detectLang () {
    var stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase()
    for (var i = 0; i < SUPPORTED.length; i++) {
      if (nav === SUPPORTED[i] || nav.startsWith(SUPPORTED[i] + '-')) return SUPPORTED[i]
    }
    return DEFAULT_LANG
  }

  let currentLang = detectLang()
  let strings = {}

  // ── Helpers ──────────────────────────────────────────────

  function pageName () {
    const path = location.pathname.split('/').pop() || 'index.html'
    return path.replace('.html', '')
  }

  async function fetchJSON (url) {
    try {
      const res = await fetch(url)
      if (!res.ok) return {}
      return await res.json()
    } catch (_) {
      return {}
    }
  }

  function t (key) {
    return strings[key] || null
  }

  // ── Apply translations ──────────────────────────────────

  function apply () {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.closest('pre')) return
      var val = t(el.getAttribute('data-i18n'))
      if (val) el.textContent = val
    })

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      if (el.closest('pre')) return
      var val = t(el.getAttribute('data-i18n-html'))
      if (val) el.innerHTML = val
    })

    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : currentLang

    window.dispatchEvent(
      new CustomEvent('i18n:applied', { detail: { lang: currentLang, t: t } })
    )
  }

  // ── Language switcher ───────────────────────────────────

  function injectSwitcher () {
    var header = document.querySelector('header')
    if (!header) return

    var style = document.createElement('style')
    style.textContent = [
      '.eh-lang-switcher{display:inline-flex;gap:2px;background:#f5f5f4;border-radius:6px;padding:2px;font-size:12px;font-weight:600;margin-left:12px}',
      '.eh-lang-btn{padding:3px 8px;border-radius:4px;border:none;cursor:pointer;background:transparent;color:#78716c;transition:all .15s}',
      '.eh-lang-btn.active{background:#fff;color:#292524;box-shadow:0 1px 2px rgba(0,0,0,.08)}'
    ].join('')
    document.head.appendChild(style)

    var switcher = document.createElement('div')
    switcher.className = 'eh-lang-switcher'

    SUPPORTED.forEach(function (lang) {
      var btn = document.createElement('button')
      btn.className = 'eh-lang-btn' + (lang === currentLang ? ' active' : '')
      btn.textContent = lang.toUpperCase()
      btn.setAttribute('aria-label', 'Switch to ' + lang.toUpperCase())
      btn.addEventListener('click', function () {
        setLang(lang)
      })
      switcher.appendChild(btn)
    })

    // Insert into the header's inner div, before the last child
    var container = header.querySelector('div')
    if (container) {
      container.appendChild(switcher)
    }
  }

  // ── Public API ──────────────────────────────────────────

  async function setLang (lang) {
    if (SUPPORTED.indexOf(lang) === -1) return
    currentLang = lang
    localStorage.setItem(STORAGE_KEY, lang)

    if (lang === DEFAULT_LANG) {
      // PT-BR: reload to restore original DOM text
      location.reload()
      return
    }

    var page = pageName()
    var base = detectBase()
    var results = await Promise.all([
      fetchJSON(base + 'locales/' + lang + '/common.json'),
      fetchJSON(base + 'locales/' + lang + '/' + page + '.json')
    ])

    strings = Object.assign({}, results[0], results[1])
    apply()
    updateSwitcherUI()
  }

  function updateSwitcherUI () {
    document.querySelectorAll('.eh-lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.textContent.toLowerCase() === currentLang)
    })
  }

  function detectBase () {
    // Find the script tag for i18n.js to determine the base path
    var scripts = document.querySelectorAll('script[src*="i18n.js"]')
    if (scripts.length) {
      var src = scripts[0].getAttribute('src')
      return src.replace('i18n.js', '')
    }
    return ''
  }

  // ── Init ────────────────────────────────────────────────

  async function init () {
    injectSwitcher()

    if (currentLang === DEFAULT_LANG) return

    var page = pageName()
    var base = detectBase()
    var results = await Promise.all([
      fetchJSON(base + 'locales/' + currentLang + '/common.json'),
      fetchJSON(base + 'locales/' + currentLang + '/' + page + '.json')
    ])

    strings = Object.assign({}, results[0], results[1])
    apply()
  }

  // Run as soon as DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  // Expose minimal public API
  window.EHi18n = {
    setLang: setLang,
    t: t,
    get currentLang () { return currentLang }
  }
})()
