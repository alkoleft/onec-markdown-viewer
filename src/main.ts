// Главный файл приложения Markdown Viewer для 1С
// Этот файл инициализирует приложение и экспортирует глобальные функции

// Импортируем полифиллы для совместимости с 1С
import './polyfills.js';

// Импортируем глобальные функции для работы с markdown
import { renderMarkdown, clearMarkdown, isMarkdownSupported } from './markdown-viewer.js';

/**
 * Главный класс приложения MarkdownViewer
 * Теперь только инициализирует глобальные функции
 */
class MarkdownViewer {
    constructor() {
        // Проверяем поддержку markdown
        if (!isMarkdownSupported()) {
            console.error('Markdown не поддерживается в данной среде');
            return;
        }
        
        console.log('Markdown Viewer инициализирован');
        console.log('Доступные функции:');
        console.log('- renderMarkdown(markdownString, containerId?)');
        console.log('- clearMarkdown(containerId)');
        console.log('- isMarkdownSupported()');
        
        // Проверяем доступность функций
        console.log('renderMarkdown доступна:', typeof renderMarkdown === 'function');
        console.log('clearMarkdown доступна:', typeof clearMarkdown === 'function');
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownViewer();
});
