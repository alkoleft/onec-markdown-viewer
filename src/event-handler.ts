// Обработка событий
// Этот модуль содержит функции для обработки пользовательских событий

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
        
        if (loadExampleBtn) {
            loadExampleBtn.addEventListener('click', () => this.onLoadExample());
        }
        
        if (loadFileBtn) {
            loadFileBtn.addEventListener('click', () => this.fileHandler.openFileDialog());
        }
        
        // Загрузка файла
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.fileHandler.handleFileLoad(e));
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
