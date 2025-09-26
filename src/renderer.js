// Рендеринг markdown контента и управление UI
// Этот модуль содержит функции для рендеринга markdown и управления интерфейсом

import { marked } from 'marked';
import { highlightCodeBlocks } from './highlight-config.js';
import { createErrorHTML, createContentHTML, logError } from './utils.js';

/**
 * Класс для рендеринга markdown контента
 */
export class Renderer {
    constructor(markdownContent, loading, emptyState) {
        this.markdownContent = markdownContent;
        this.loading = loading;
        this.emptyState = emptyState;
    }

    /**
     * Рендерит markdown контент
     * @param {string} content - Markdown контент
     */
    renderMarkdown(content) {
        try {
            const html = marked.parse(content);
            
            // Применяем подсветку синтаксиса к блокам кода
            const processedHtml = highlightCodeBlocks(html);
            
            this.markdownContent.innerHTML = createContentHTML(processedHtml);
            this.hideLoading();
            this.hideEmptyState();
        } catch (error) {
            logError('Ошибка парсинга markdown', error);
            this.showError('Ошибка парсинга markdown: ' + error.message);
        }
    }

    /**
     * Показывает состояние загрузки
     */
    showLoading() {
        this.loading.classList.add('show');
        this.markdownContent.style.opacity = '0.5';
    }

    /**
     * Скрывает состояние загрузки
     */
    hideLoading() {
        this.loading.classList.remove('show');
        this.markdownContent.style.opacity = '1';
    }

    /**
     * Скрывает пустое состояние
     */
    hideEmptyState() {
        this.emptyState.style.display = 'none';
        this.markdownContent.style.display = 'block';
    }

    /**
     * Показывает ошибку
     * @param {string} message - Сообщение об ошибке
     */
    showError(message) {
        this.markdownContent.innerHTML = createErrorHTML(message);
        this.hideLoading();
        this.hideEmptyState();
    }

    /**
     * Показывает пустое состояние
     */
    showEmptyState() {
        this.emptyState.style.display = 'block';
        this.markdownContent.style.display = 'none';
    }

    /**
     * Очищает контент
     */
    clearContent() {
        this.markdownContent.innerHTML = '';
        this.showEmptyState();
    }
}

/**
 * Создает рендерер с привязкой к элементам DOM
 * @returns {Renderer} - Экземпляр рендерера
 */
export function createRenderer() {
    const markdownContent = document.getElementById('markdownContent');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    
    return new Renderer(markdownContent, loading, emptyState);
}
