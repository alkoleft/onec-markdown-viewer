// Рендеринг markdown контента и управление UI
// Этот модуль содержит функции для рендеринга markdown и управления интерфейсом

import { marked } from 'marked';
import { highlightCodeBlocks } from './highlight-config.js';
import { createErrorHTML, createContentHTML, logError } from './utils.js';
import type { RendererInterface } from './types.js';

/**
 * Класс для рендеринга markdown контента
 */
export class Renderer implements RendererInterface {
    private markdownContent: HTMLElement;
    private loading: HTMLElement;
    private emptyState: HTMLElement;

    constructor(markdownContent: HTMLElement, loading: HTMLElement, emptyState: HTMLElement) {
        this.markdownContent = markdownContent;
        this.loading = loading;
        this.emptyState = emptyState;
    }

    /**
     * Рендерит markdown контент
     * @param content - Markdown контент
     */
    renderMarkdown(content: string): void {
        try {
            const html = marked.parse(content) as string;
            
            // Применяем подсветку синтаксиса к блокам кода
            const processedHtml = highlightCodeBlocks(html);
            
            this.markdownContent.innerHTML = createContentHTML(processedHtml);
            this.hideLoading();
            this.hideEmptyState();
        } catch (error) {
            logError('Ошибка парсинга markdown', error as Error);
            this.showError('Ошибка парсинга markdown: ' + (error as Error).message);
        }
    }

    /**
     * Показывает состояние загрузки
     */
    showLoading(): void {
        this.loading.classList.add('show');
        this.markdownContent.style.opacity = '0.5';
    }

    /**
     * Скрывает состояние загрузки
     */
    hideLoading(): void {
        this.loading.classList.remove('show');
        this.markdownContent.style.opacity = '1';
    }

    /**
     * Скрывает пустое состояние
     */
    hideEmptyState(): void {
        this.emptyState.style.display = 'none';
        this.markdownContent.style.display = 'block';
    }

    /**
     * Показывает ошибку
     * @param message - Сообщение об ошибке
     */
    showError(message: string): void {
        this.markdownContent.innerHTML = createErrorHTML(message);
        this.hideLoading();
        this.hideEmptyState();
    }

    /**
     * Показывает пустое состояние
     */
    showEmptyState(): void {
        this.emptyState.style.display = 'block';
        this.markdownContent.style.display = 'none';
    }

    /**
     * Очищает контент
     */
    clearContent(): void {
        this.markdownContent.innerHTML = '';
        this.showEmptyState();
    }
}

/**
 * Создает рендерер с привязкой к элементам DOM
 * @returns Экземпляр рендерера
 */
export function createRenderer(): RendererInterface {
    const markdownContent = document.getElementById('markdownContent');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    
    if (!markdownContent || !loading || !emptyState) {
        throw new Error('Не удалось найти необходимые DOM элементы');
    }
    
    return new Renderer(markdownContent, loading, emptyState);
}
