(function (global) {
    // Define the global interface
    global.WeglotCustom = {
        initialize: function ({ api_key, languages }) {
            if (!api_key || !languages || !Array.isArray(languages)) {
                console.error('WeglotCustom: Missing or invalid configuration.');
                return;
            }

            // Load Weglot
            if (!window.Weglot) {
                console.error('WeglotCustom: Weglot library not loaded.');
                return;
            }

            // Initialize Weglot
            Weglot.initialize({
                api_key: api_key,
                languages: languages,
            });

            // Set up event listeners and UI updates
            document.addEventListener('DOMContentLoaded', function () {
                function updateLanguageSelector(currentLang) {
                    // Your existing update logic
                    // Reset UI elements and update based on the currentLang
                    document.querySelectorAll('[language-item]').forEach(item => {
                        // Reset styles
                        item.style.backgroundColor = '';
                        const label = item.querySelector('[language-item-label]');
                        if (label) label.style.color = '';
                    });

                    // Highlight the active language
                    document.querySelectorAll(`[language-item="${currentLang}"]`).forEach(activeLangItem => {
                        activeLangItem.style.backgroundColor = 'var(--grey-99)';
                        const label = activeLangItem.querySelector('[language-item-label]');
                        if (label) label.style.color = 'var(--grey-20-text)';
                    });

                    // Update toggle elements
                    document.querySelectorAll('.language-toggle .language-flag').forEach(flag => {
                        flag.classList.add('lan-fla--hide');
                    });
                    document.querySelectorAll(`.language-toggle [language-flag="${currentLang}"]`).forEach(activeFlag => {
                        activeFlag.classList.remove('lan-fla--hide');
                    });

                    document.querySelectorAll('[language-toggle-label]').forEach(toggleLabel => {
                        const activeLangLabel = document.querySelector(`[language-item-label="${currentLang}"]`);
                        if (activeLangLabel) toggleLabel.textContent = activeLangLabel.textContent;
                    });
                }

                // On Weglot initialization
                Weglot.on('initialized', () => {
                    const currentLang = Weglot.getCurrentLang();
                    updateLanguageSelector(currentLang);
                });

                // Add click event listeners
                document.querySelectorAll('[language-item]').forEach(item => {
                    item.addEventListener('click', function (e) {
                        e.preventDefault();
                        const selectedLang = this.getAttribute('language-item');
                        Weglot.switchTo(selectedLang);
                        updateLanguageSelector(selectedLang);
                    });
                });
            });
        },
    };
})(window);