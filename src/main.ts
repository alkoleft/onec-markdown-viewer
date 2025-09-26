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
import type { MarkdownViewerInterface, RendererInterface, FileHandlerInterface, EventHandlerInterface } from './types.js';

/**
 * Главный класс приложения MarkdownViewer
 */
class MarkdownViewer implements MarkdownViewerInterface {
    private renderer!: RendererInterface;
    private fileHandler!: FileHandlerInterface;
    private eventHandler!: EventHandlerInterface;

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
    initComponents(): void {
        // Создаем рендерер
        this.renderer = createRenderer();
        
        // Получаем элемент input для файлов
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (!fileInput) {
            throw new Error('Не удалось найти элемент fileInput');
        }
        
        // Создаем обработчик файлов
        this.fileHandler = new FileHandler(
            fileInput,
            (content: string) => this.renderer.renderMarkdown(content),
            (error: Error) => this.renderer.showError(error.message)
        );
    }

    /**
     * Настраивает библиотеки
     */
    setupLibraries(): void {
        // Регистрируем языки для подсветки синтаксиса
        registerLanguages();
        
        // Настраиваем marked для работы с highlight.js
        configureMarked(marked);
    }

    /**
     * Инициализирует обработчики событий
     */
    initEventHandlers(): void {
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
    async loadExample(): Promise<void> {
        const exampleMarkdown = getExampleMarkdown();
        this.renderer.renderMarkdown(exampleMarkdown);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownViewer();
});
