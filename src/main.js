// Главный файл приложения Markdown Viewer для 1С
// Этот файл инициализирует приложение и связывает все модули

// Импортируем полифиллы для совместимости с 1С
import './polyfills.js';

// Импортируем модули
import { marked } from 'marked';
import { registerLanguages, configureMarked } from './highlight-config.js';
import { FileHandler, getExampleMarkdown } from './file-handler.js';
import { createEventHandler } from './event-handler.js';
import { createRenderer } from './renderer.js';

/**
 * Главный класс приложения MarkdownViewer
 */
class MarkdownViewer {
    constructor() {
        // Инициализируем компоненты
        this.initComponents();
        
        // Настраиваем библиотеки
        this.setupLibraries();
        
        // Инициализируем обработчики событий
        this.initEventHandlers();
        
        // Скрываем пустое состояние
        this.renderer.hideEmptyState();
    }

    /**
     * Инициализирует компоненты приложения
     */
    initComponents() {
        // Создаем рендерер
        this.renderer = createRenderer();
        
        // Создаем обработчик файлов
        this.fileHandler = new FileHandler(
            document.getElementById('fileInput'),
            (content) => this.renderer.renderMarkdown(content),
            (error) => this.renderer.showError(error)
        );
    }

    /**
     * Настраивает библиотеки
     */
    setupLibraries() {
        // Регистрируем языки для подсветки синтаксиса
        registerLanguages();
        
        // Настраиваем marked для работы с highlight.js
        configureMarked(marked);
    }

    /**
     * Инициализирует обработчики событий
     */
    initEventHandlers() {
        // Создаем обработчик событий
        this.eventHandler = createEventHandler(
            this.fileHandler,
            () => this.loadExample()
        );
        
        // Инициализируем обработчики событий
        this.eventHandler.initEventListeners();
    }

    /**
     * Загружает пример markdown контента
     */
    async loadExample() {
        const exampleMarkdown = getExampleMarkdown();
        this.renderer.renderMarkdown(exampleMarkdown);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownViewer();
});