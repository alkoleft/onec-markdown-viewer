// Обработка событий и горячих клавиш
// Этот модуль содержит функции для обработки пользовательских событий

import { toggleFullscreen, exitFullscreen, isFullscreen } from './utils.js';
import type { FileHandlerInterface, EventHandlerInterface } from './types.js';

/**
 * Класс для обработки событий
 */
export class EventHandler implements EventHandlerInterface {
    private fileHandler: FileHandlerInterface;

    constructor(fileHandler: FileHandlerInterface, private onLoadExample: () => void) {
        this.fileHandler = fileHandler;
    }

    /**
     * Инициализирует обработчики событий
     */
    initEventListeners(): void {
        // Кнопки управления
        const loadExampleBtn = document.getElementById('loadExampleBtn');
        const loadFileBtn = document.getElementById('loadFileBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        
        if (loadExampleBtn) {
            loadExampleBtn.addEventListener('click', () => this.onLoadExample());
        }
        
        if (loadFileBtn) {
            loadFileBtn.addEventListener('click', () => this.fileHandler.openFileDialog());
        }
        
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => toggleFullscreen());
        }
        
        // Загрузка файла
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.fileHandler.handleFileLoad(e));
        }
        
        // Горячие клавиши
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Drag & Drop
        document.addEventListener('dragover', (e) => this.fileHandler.handleDragOver(e as DragEvent));
        document.addEventListener('drop', (e) => this.fileHandler.handleDrop(e as DragEvent));
    }

    /**
     * Обрабатывает нажатия клавиш
     * @param event - Событие нажатия клавиши
     */
    private handleKeydown(event: KeyboardEvent): void {
        // Обработка Ctrl+O для открытия файла
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case 'o':
                case 'O':
                    event.preventDefault();
                    this.fileHandler.openFileDialog();
                    break;
            }
        }
        
        // Обработка F11 для полноэкранного режима
        if (event.key === 'F11') {
            event.preventDefault();
            toggleFullscreen();
        }
        
        // Обработка Escape для выхода из полноэкранного режима
        if (event.key === 'Escape' && isFullscreen()) {
            exitFullscreen();
        }
    }
}

/**
 * Создает обработчик событий с привязкой к элементам DOM
 * @param fileHandler - Обработчик файлов
 * @param onLoadExample - Функция загрузки примера
 * @returns Экземпляр обработчика событий
 */
export function createEventHandler(fileHandler: FileHandlerInterface, onLoadExample: () => void): EventHandlerInterface {
    return new EventHandler(fileHandler, onLoadExample);
}
