// Конфигурация highlight.js для подсветки синтаксиса
// Этот модуль настраивает highlight.js для работы с различными языками программирования

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import onec from 'highlight.js/lib/languages/1c';
import gherkin from 'highlight.js/lib/languages/gherkin';
import 'highlight.js/styles/github.css';

/**
 * Регистрирует языки для подсветки синтаксиса
 */
export function registerLanguages() {
    // Регистрируем основные языки
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('1c', onec);
    hljs.registerLanguage('gherkin', gherkin);

    // Добавляем алиас bsl для языка 1C
    hljs.registerLanguage('bsl', function(hljs) {
        const definition = hljs.getLanguage('1c');
        return hljs.inherit(definition, { 
            aliases: ['bsl', '1c'] 
        });
    });
}

/**
 * Настраивает marked для работы с highlight.js
 */
export function configureMarked(marked) {
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {
                    console.warn('Ошибка подсветки синтаксиса:', err);
                }
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true,
        langPrefix: 'language-',
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
}

/**
 * Применяет подсветку синтаксиса к блокам кода в HTML
 * @param {string} html - HTML строка с блоками кода
 * @returns {string} - HTML с примененной подсветкой синтаксиса
 */
export function highlightCodeBlocks(html) {
    return html.replace(/<pre><code class="language-([^"]*)">([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
        try {
            // Декодируем HTML entities
            const decodedCode = decodeHtmlEntities(code);
            
            // Применяем подсветку синтаксиса
            const highlighted = hljs.highlight(decodedCode, { language: lang || 'plaintext' }).value;
            
            return `<pre><code class="language-${lang} hljs">${highlighted}</code></pre>`;
        } catch (error) {
            console.warn('Ошибка подсветки синтаксиса для языка:', lang, error);
            // Если подсветка не удалась, возвращаем обычный блок кода
            return `<pre><code class="language-${lang}">${code}</code></pre>`;
        }
    });
}

/**
 * Декодирует HTML entities в тексте
 * @param {string} text - Текст с HTML entities
 * @returns {string} - Декодированный текст
 */
function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

// Экспортируем hljs для использования в других модулях
export { hljs };
