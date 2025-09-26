// Глобальный модуль для отображения markdown
// Этот модуль предоставляет глобальные функции для работы с markdown

import { marked } from 'marked';
import { registerLanguages, configureMarked, highlightCodeBlocks } from './highlight-config.js';
import { createErrorHTML, createContentHTML, logError } from './utils.js';

// Инициализация библиотек (выполняется один раз)
let librariesInitialized = false;

/**
 * Инициализирует библиотеки для работы с markdown
 */
function initializeLibraries(): void {
    if (librariesInitialized) return;
    
    // Регистрируем языки для подсветки синтаксиса
    registerLanguages();
    
    // Настраиваем marked для работы с highlight.js
    configureMarked(marked);
    
    librariesInitialized = true;
}

/**
 * Глобальная функция для отображения markdown строки на весь документ
 * @param markdownString - Строка с markdown контентом
 */
export function renderMarkdown(markdownString: string): void;

/**
 * Глобальная функция для отображения markdown строки в указанный контейнер
 * @param markdownString - Строка с markdown контентом
 * @param containerId - ID контейнера для отображения
 */
export function renderMarkdown(markdownString: string, containerId: string): void;

/**
 * Реализация функции renderMarkdown
 */
export function renderMarkdown(markdownString: string, containerId?: string): void {
    try {
        // Инициализируем библиотеки при первом вызове
        initializeLibraries();
        
        // Парсим markdown в HTML
        const html = marked.parse(markdownString) as string;
        
        // Применяем подсветку синтаксиса к блокам кода
        const processedHtml = highlightCodeBlocks(html);
        
        // Создаем финальный HTML с оберткой
        const finalHtml = createContentHTML(processedHtml);
        
        // Определяем целевой контейнер
        let targetContainer: HTMLElement | null = null;
        
        if (containerId) {
            // Если указан конкретный контейнер, используем его
            targetContainer = document.getElementById(containerId);
            if (!targetContainer) {
                logError('Контейнер не найден', new Error(`Элемент с ID "${containerId}" не найден`));
                return;
            }
        } else {
            // Если контейнер не указан, используем основной контейнер документа
            targetContainer = document.getElementById('markdownContent');
            if (!targetContainer) {
                logError('Основной контейнер не найден', new Error('Элемент с ID "markdownContent" не найден'));
                return;
            }
        }
        
        // Вставляем контент в целевой контейнер
        targetContainer.innerHTML = finalHtml;
        
        // Скрываем состояния загрузки и пустого состояния для основного контейнера
        if (!containerId || containerId === 'markdownContent') {
            const loading = document.getElementById('loading');
            const emptyState = document.getElementById('emptyState');
            
            if (loading) {
                loading.style.display = 'none';
            }
            if (emptyState) {
                emptyState.style.display = 'none';
            }
        }
        
    } catch (error) {
        logError('Ошибка рендеринга markdown', error as Error);
        const errorHtml = createErrorHTML('Ошибка рендеринга markdown: ' + (error as Error).message);
        
        // Определяем целевой контейнер для ошибки
        let targetContainer: HTMLElement | null = null;
        
        if (containerId) {
            targetContainer = document.getElementById(containerId);
        } else {
            targetContainer = document.getElementById('markdownContent');
        }
        
        if (targetContainer) {
            targetContainer.innerHTML = errorHtml;
        }
    }
}

/**
 * Глобальная функция для очистки основного контейнера документа
 */
export function clearMarkdown(): void;

/**
 * Глобальная функция для очистки указанного контейнера
 * @param containerId - ID контейнера для очистки
 */
export function clearMarkdown(containerId: string): void;

/**
 * Реализация функции clearMarkdown
 */
export function clearMarkdown(containerId?: string): void {
    let targetContainer: HTMLElement | null = null;
    
    if (containerId) {
        // Если указан конкретный контейнер, используем его
        targetContainer = document.getElementById(containerId);
        if (!targetContainer) {
            logError('Контейнер не найден', new Error(`Элемент с ID "${containerId}" не найден`));
            return;
        }
    } else {
        // Если контейнер не указан, используем основной контейнер документа
        targetContainer = document.getElementById('markdownContent');
        if (!targetContainer) {
            logError('Основной контейнер не найден', new Error('Элемент с ID "markdownContent" не найден'));
            return;
        }
    }
    
    // Очищаем контейнер
    targetContainer.innerHTML = '';
    
    // Показываем состояние пустого документа для основного контейнера
    if (!containerId || containerId === 'markdownContent') {
        const emptyState = document.getElementById('emptyState');
        if (emptyState) {
            emptyState.style.display = 'block';
        }
    }
}

/**
 * Глобальная функция для проверки поддержки markdown
 * @returns true если markdown поддерживается
 */
export function isMarkdownSupported(): boolean {
    return typeof marked !== 'undefined';
}

// Делаем функции доступными глобально для использования в 1С
if (typeof window !== 'undefined') {
    (window as any).renderMarkdown = renderMarkdown;
    (window as any).clearMarkdown = clearMarkdown;
    (window as any).isMarkdownSupported = isMarkdownSupported;
}
