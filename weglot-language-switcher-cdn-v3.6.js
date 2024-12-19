(function () {
    const WeglotCustom = {
        initialize: function (config) {
            if (typeof Weglot === 'undefined') {
                console.error('Weglot library is not loaded.');
                return;
            }

            Weglot.initialize(config);

            document.addEventListener('DOMContentLoaded', function () {
                // Restore saved language
                const savedLang = localStorage.getItem('selectedLanguage');
                if (savedLang) {
                    Weglot.switchTo(savedLang);
                }

                // Handle language updates on Weglot initialization
                Weglot.on('initialized', function () {
                    const currentLang = Weglot.getCurrentLang();
                    updateLanguageSelector(currentLang);
                });

                // Update the language selector
                function updateLanguageSelector(currentLang) {
                    // Update language flag
                    document.querySelectorAll('.language-toggle .language-flag').forEach(flag => {
                        flag.classList.add('lan-fla--hide');
                    });
                    document.querySelector(`.language-toggle [language-flag="${currentLang}"]`)?.classList.remove('lan-fla--hide');

                    // Update language toggle label
                    document.querySelectorAll('[language-toggle-label]').forEach(toggleLabel => {
                        const activeLangLabel = document.querySelector(`[language-item-label="${currentLang}"]`);
                        if (activeLangLabel) {
                            toggleLabel.textContent = activeLangLabel.textContent;
                        }
                    });
                }

                // Save language on user selection
                document.querySelectorAll('[language-item]').forEach(item => {
                    item.addEventListener('click', function () {
                        const selectedLang = this.getAttribute('language-item');
                        Weglot.switchTo(selectedLang);
                        localStorage.setItem('selectedLanguage', selectedLang);
                    });
                });
            });
        },
    };

    // Expose globally
    window.WeglotCustom = WeglotCustom;
})();
