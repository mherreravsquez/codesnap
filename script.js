(function () {
    const textarea       = document.getElementById('codeInput');
    const codeDisplay    = document.getElementById('codePreview');
    const ideWindow      = document.getElementById('ideWindow');
    const exportBtn      = document.getElementById('exportBtn');
    const toast          = document.getElementById('toastMsg');
    const languageSelect = document.getElementById('languageSelect');
    const windowTitle    = document.getElementById('windowTitle');
    const filenameInput  = document.getElementById('filenameInput');
    const filenameExt    = document.getElementById('filenameExt');
    const osSelector     = document.getElementById('osSelector');
    const themeSwatches  = document.getElementById('themeSwatches');

    // ── Language → extension map ──────────────────────────────────────────────
    const langExtensions = {
        plaintext:  'txt',
        javascript: 'js',
        typescript: 'ts',
        csharp:     'cs',
        python:     'py',
        markup:     'html',
        css:        'css',
        json:       'json',
        java:       'java',
        cpp:        'cpp',
        rust:       'rs',
        go:         'go',
        bash:       'sh',
        glsl:       'glsl',
        hlsl:       'hlsl',
        gdscript:   'gd',
        lua:        'lua',
    };

    // Disable Prism auto-highlight
    if (window.Prism) Prism.manual = true;

    // ── Highlight ─────────────────────────────────────────────────────────────
    function highlightComments(codeText) {
        const escaped = codeText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        let processed = escaped;
        processed = processed.replace(/\/\*(.*?)\*\//gs, (_, c) =>
            `<span class="comment-highlight">/*${c}*/</span>`);
        processed = processed.replace(/^(\s*)(\/\/.*)$/gm, (_, sp, cm) =>
            `${sp}<span class="comment-highlight">${cm}</span>`);
        processed = processed.replace(/([^\n]*?)(\/\/[^\n]*)/g, (match, before, cm) => {
            if (before.includes('<span class="comment-highlight">')) return match;
            return `${before}<span class="comment-highlight">${cm}</span>`;
        });
        return processed;
    }

    function updateCodePreview() {
        const rawCode = textarea.value;
        const lang    = languageSelect.value;

        if (rawCode.trim() === '') {
            codeDisplay.className = '';
            codeDisplay.innerHTML = '<span style="color:var(--syn-comment);">// Paste your code here...</span>';
            return;
        }

        if (lang === 'plaintext') {
            codeDisplay.className = '';
            codeDisplay.innerHTML = highlightComments(rawCode);
        } else {
            codeDisplay.className = `language-${lang}`;
            codeDisplay.textContent = rawCode;
            if (window.Prism) Prism.highlightElement(codeDisplay);
        }
    }

    // ── Window title ──────────────────────────────────────────────────────────
    function updateWindowTitle() {
        const ext  = langExtensions[languageSelect.value] || 'txt';
        const name = filenameInput.value.trim() || 'code_snippet';
        filenameExt.textContent  = `.${ext}`;
        windowTitle.textContent  = `${name}.${ext}`;
    }

    // ── IDE resize (4:3) ──────────────────────────────────────────────────────
    function resizeIdeToFitContent() {
        const baseWidth = 800;
        ideWindow.style.transition = 'none';
        ideWindow.style.width  = `${baseWidth}px`;
        ideWindow.style.height = 'auto';

        void ideWindow.offsetHeight;
        const naturalHeight = ideWindow.scrollHeight;
        const ratioHeight   = baseWidth * 3 / 4;

        let finalWidth  = baseWidth;
        let finalHeight = ratioHeight;

        if (naturalHeight > ratioHeight) {
            finalHeight = naturalHeight + 2;
            finalWidth  = finalHeight * 4 / 3;
        } else {
            if (naturalHeight > ratioHeight) {
                finalHeight = naturalHeight + 2;
                finalWidth  = finalHeight * 4 / 3;
            }
        }

        ideWindow.style.width  = `${Math.ceil(finalWidth)}px`;
        ideWindow.style.height = `${Math.ceil(finalHeight)}px`;
        ideWindow.style.transition = '';

        const ca = document.querySelector('.code-area');
        if (ca) ca.style.overflowY = 'hidden';
    }

    function fullRefresh() {
        updateCodePreview();
        setTimeout(resizeIdeToFitContent, 10);
    }

    let resizeTimeout;
    function debouncedRefresh() {
        updateCodePreview();
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeIdeToFitContent, 50);
    }

    // ── OS Chrome switcher ────────────────────────────────────────────────────
    function setOsChrome(os) {
        ideWindow.dataset.os = os;
        osSelector.querySelectorAll('.seg-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.os === os);
        });
        // Resize because bar height may not change but layout shifts
        setTimeout(resizeIdeToFitContent, 20);
    }

    osSelector.addEventListener('click', e => {
        const btn = e.target.closest('.seg-btn');
        if (btn) setOsChrome(btn.dataset.os);
    });

    // ── Theme switcher ────────────────────────────────────────────────────────
    function setTheme(theme) {
        document.body.dataset.theme = theme;
        themeSwatches.querySelectorAll('.swatch').forEach(sw => {
            sw.classList.toggle('active', sw.dataset.theme === theme);
        });
    }

    themeSwatches.addEventListener('click', e => {
        const sw = e.target.closest('.swatch');
        if (sw) setTheme(sw.dataset.theme);
    });

    // ── Export ────────────────────────────────────────────────────────────────
    async function exportAsPNG() {
        resizeIdeToFitContent();
        await new Promise(r => setTimeout(r, 80));

        try {
            const canvas = await html2canvas(ideWindow, {
                scale: 2.5,
                backgroundColor: null,
                useCORS: false,
                logging: false,
                allowTaint: false,
                windowWidth:  ideWindow.scrollWidth,
                windowHeight: ideWindow.scrollHeight,
            });

            const link      = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            link.download   = `codesnap_${timestamp}.png`;
            link.href       = canvas.toDataURL('image/png');
            link.click();

            toast.style.opacity = '1';
            setTimeout(() => { toast.style.opacity = '0'; }, 2000);
        } catch (err) {
            console.error('Export error:', err);
            toast.textContent   = 'Error exporting PNG, try again';
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.textContent   = 'Exported as a PNG';
            }, 2000);
        }
    }

    // ── Default state ─────────────────────────────────────────────────────────
    const defaultCode = `// My featured snippet for the blog
function generateMessage(user) {
    // Comment: personalized greeting
    const greeting = \`Hello, \${user}\`;
    console.log(greeting);   // print to console
    return greeting;
}

/* 
 * Usage example:
 * generateMessage("dev_blog");
 */
generateMessage("Community");`;

    textarea.value = defaultCode;
    setOsChrome('macos');
    setTheme('github-dark');
    updateWindowTitle();
    updateCodePreview();

    // ── Event listeners ───────────────────────────────────────────────────────
    textarea.addEventListener('input', debouncedRefresh);
    languageSelect.addEventListener('change', () => { updateWindowTitle(); fullRefresh(); });
    filenameInput.addEventListener('input', updateWindowTitle);
    window.addEventListener('resize', () => setTimeout(resizeIdeToFitContent, 60));
    exportBtn.addEventListener('click', exportAsPNG);

    window.addEventListener('load', () => {
        setTimeout(() => {
            resizeIdeToFitContent();
            const ca = document.querySelector('.code-area');
            if (ca) ca.style.overflowY = 'hidden';
        }, 100);
    });

    const observer = new MutationObserver(resizeIdeToFitContent);
    observer.observe(codeDisplay, { childList: true, subtree: true, characterData: true });
})();