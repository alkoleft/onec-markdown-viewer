// Обработка событий и горячих клавиш
// Этот модуль содержит функции для обработки пользовательских событий

import { toggleFullscreen, exitFullscreen, isFullscreen } from './utils.js';

/**
 * Класс для обработки событий
 */
export class EventHandler {
    constructor(fileHandler, onLoadExample) {
        this.fileHandler = fileHandler;
        this.onLoadExample = onLoadExample;
    }

    /**
     * Инициализирует обработчики событий
     */
    initEventListeners() {
        // Кнопки управления
        document.getElementById('loadExampleBtn').addEventListener('click', () => this.onLoadExample());
        document.getElementById('loadFileBtn').addEventListener('click', () => this.fileHandler.openFileDialog());
        document.getElementById('fullscreenBtn').addEventListener('click', () => toggleFullscreen());
        
        // Загрузка файла
        this.fileHandler.fileInput.addEventListener('change', (e) => this.fileHandler.handleFileLoad(e));
        
        // Горячие клавиши
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Drag & Drop
        document.addEventListener('dragover', (e) => this.fileHandler.handleDragOver(e));
        document.addEventListener('drop', (e) => this.fileHandler.handleDrop(e));
    }

    /**
     * Обрабатывает нажатия клавиш
     * @param {KeyboardEvent} event - Событие нажатия клавиши
     */
    handleKeydown(event) {
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
 * @param {FileHandler} fileHandler - Обработчик файлов
 * @param {Function} onLoadExample - Функция загрузки примера
 * @returns {EventHandler} - Экземпляр обработчика событий
 */
export function createEventHandler(fileHandler, onLoadExample) {
    return new EventHandler(fileHandler, onLoadExample);
}
