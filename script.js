(function() {
    const textarea = document.getElementById('codeInput');
    const codeDisplay = document.getElementById('codePreview');
    const ideWindow = document.getElementById('ideWindow');
    const exportBtn = document.getElementById('exportBtn');
    const toast = document.getElementById('toastMsg');
    const languageSelect = document.getElementById('languageSelect');
    const windowTitle = document.getElementById('windowTitle');
    const filenameInput = document.getElementById('filenameInput');
    const filenameExt = document.getElementById('filenameExt');

    // Map language keys to file extensions for the window title
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
        // Game development
        glsl:       'glsl',
        hlsl:       'hlsl',
        gdscript:   'gd',
        lua:        'lua',
    };

    // Disable Prism auto-highlight — we call it manually
    if (window.Prism) {
        Prism.manual = true;
    }

    // ── Plain-text mode: highlight comments only ──────────────────────────────
    function highlightComments(codeText) {
        const escaped = codeText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        let processed = escaped;

        // Multiline comments /* ... */
        processed = processed.replace(/\/\*(.*?)\*\//gs, (match, content) => {
            return `<span class="comment-highlight">/*${content}*/</span>`;
        });

        // Line comments // at start or after whitespace
        processed = processed.replace(/^(\s*)(\/\/.*)$/gm, (match, spaces, comment) => {
            return `${spaces}<span class="comment-highlight">${comment}</span>`;
        });

        // Line comments after code
        processed = processed.replace(/([^\n]*?)(\/\/[^\n]*)/g, (match, before, comment) => {
            if (before.includes('<span class="comment-highlight">')) return match;
            return `${before}<span class="comment-highlight">${comment}</span>`;
        });

        return processed;
    }

    // ── Core highlight dispatcher ─────────────────────────────────────────────
    function updateCodePreview() {
        const rawCode = textarea.value;
        const lang = languageSelect.value;

        if (rawCode.trim() === '') {
            codeDisplay.className = '';
            codeDisplay.innerHTML = '<span style="color:#7e8a98;">// Paste your code here...</span>';
            return;
        }

        if (lang === 'plaintext') {
            codeDisplay.className = '';
            codeDisplay.innerHTML = highlightComments(rawCode);
        } else {
            // Let Prism handle it
            codeDisplay.className = `language-${lang}`;
            codeDisplay.textContent = rawCode;
            if (window.Prism) {
                Prism.highlightElement(codeDisplay);
            }
        }
    }

    // ── Window title ──────────────────────────────────────────────────────────
    function updateWindowTitle() {
        const ext  = langExtensions[languageSelect.value] || 'txt';
        const name = filenameInput.value.trim() || 'code_snippet';
        filenameExt.textContent = `.${ext}`;
        windowTitle.textContent = `${name}.${ext}`;
    }

    // ── IDE resize (4:3) ──────────────────────────────────────────────────────
    function resizeIdeToFitContent() {
        const baseWidth = 800;
        const originalTransition = ideWindow.style.transition;
        ideWindow.style.transition = 'none';

        ideWindow.style.width = `${baseWidth}px`;
        ideWindow.style.height = 'auto';

        void ideWindow.offsetHeight;
        const naturalHeight = ideWindow.scrollHeight;
        const ratioHeight = baseWidth * 3 / 4;

        let finalWidth  = baseWidth;
        let finalHeight = ratioHeight;

        if (naturalHeight > ratioHeight) {
            const neededHeight = naturalHeight + 2;
            finalHeight = neededHeight;
            finalWidth  = neededHeight * 4 / 3;
        } else {
            finalHeight = ratioHeight;
            finalWidth  = baseWidth;
            if (naturalHeight > finalHeight) {
                finalHeight = naturalHeight + 2;
                finalWidth  = finalHeight * 4 / 3;
            }
        }

        finalWidth  = Math.ceil(finalWidth);
        finalHeight = Math.ceil(finalHeight);

        ideWindow.style.width  = `${finalWidth}px`;
        ideWindow.style.height = `${finalHeight}px`;
        ideWindow.style.transition = originalTransition;

        const codeAreaElem = document.querySelector('.code-area');
        if (codeAreaElem) {
            codeAreaElem.style.overflowY = 'hidden';
        }
    }

    function fullRefresh() {
        updateCodePreview();
        setTimeout(() => resizeIdeToFitContent(), 10);
    }

    let resizeTimeout;
    function debouncedRefresh() {
        updateCodePreview();
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => resizeIdeToFitContent(), 50);
    }

    // ── Export ────────────────────────────────────────────────────────────────
    async function exportAsPNG() {
        resizeIdeToFitContent();
        await new Promise(r => setTimeout(r, 80));

        const element = ideWindow;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2.5,
                backgroundColor: null,
                useCORS: false,
                logging: false,
                allowTaint: false,
                windowWidth:  element.scrollWidth,
                windowHeight: element.scrollHeight,
            });

            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            link.download = `codesnap_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            toast.style.opacity = '1';
            setTimeout(() => { toast.style.opacity = '0'; }, 2000);
        } catch (err) {
            console.error('Export error:', err);
            toast.textContent = 'Error exporting PNG, try again';
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.textContent = 'Exported as a PNG';
            }, 2000);
        }
    }

    // ── Default code ──────────────────────────────────────────────────────────
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
        generateMessage("Community");
    `;

    textarea.value = defaultCode;
    updateCodePreview();
    updateWindowTitle();

    // ── Event listeners ───────────────────────────────────────────────────────
    textarea.addEventListener('input', debouncedRefresh);

    languageSelect.addEventListener('change', () => {
        updateWindowTitle();
        fullRefresh();
    });

    filenameInput.addEventListener('input', updateWindowTitle);

    window.addEventListener('resize', () => {
        setTimeout(() => resizeIdeToFitContent(), 60);
    });

    exportBtn.addEventListener('click', exportAsPNG);

    window.addEventListener('load', () => {
        setTimeout(() => {
            resizeIdeToFitContent();
            const codeArea = document.querySelector('.code-area');
            if (codeArea) codeArea.style.overflowY = 'hidden';
        }, 100);
    });

    // Resize when Prism injects spans (avoid re-triggering highlight)
    const observer = new MutationObserver(() => {
        resizeIdeToFitContent();
    });
    observer.observe(codeDisplay, { childList: true, subtree: true, characterData: true });
})();