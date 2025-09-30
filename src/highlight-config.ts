// Конфигурация highlight.js для подсветки синтаксиса
// Этот модуль настраивает highlight.js для работы с различными языками программирования

import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/vs.css';
import bsl from './bsl';
import gherkin from './gherkin';

/**
 * Регистрирует языки для подсветки синтаксиса
 */
export function registerLanguages(): void {
    // Регистрируем основные языки
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('bsl', bsl);
    hljs.registerLanguage('gherkin', gherkin);
    hljs.registerLanguage('turbo-gherkin', gherkin);
}

/**
 * Настраивает marked для работы с highlight.js
 */
export function configureMarked(marked: any): void {
    marked.setOptions({
        highlight: function (code: string, lang: string): string {
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
 * @param html - HTML строка с блоками кода
 * @returns HTML с примененной подсветкой синтаксиса
 */
export function highlightCodeBlocks(html: string): string {
    return html.replace(/<pre><code class="language-([^"]*)">([\s\S]*?)<\/code><\/pre>/g, (_match: string, lang: string, code: string) => {
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
 * @param text - Текст с HTML entities
 * @returns Декодированный текст
 */
function decodeHtmlEntities(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

// Экспортируем hljs для использования в других модулях
export { hljs };
