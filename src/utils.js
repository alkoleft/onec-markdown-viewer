// Утилиты для работы с файлами и общие функции
// Этот модуль содержит вспомогательные функции для работы с файлами и общие утилиты

/**
 * Проверяет, является ли файл markdown файлом
 * @param {File} file - Файл для проверки
 * @returns {boolean} - true, если файл является markdown файлом
 */
export function isMarkdownFile(file) {
    const extensions = ['.md', '.markdown', '.txt'];
    const fileName = file.name.toLowerCase();
    return extensions.some(ext => fileName.endsWith(ext));
}

/**
 * Читает содержимое файла как текст
 * @param {File} file - Файл для чтения
 * @returns {Promise<string>} - Promise с содержимым файла
 */
export function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Не удалось прочитать файл'));
        reader.readAsText(file, 'UTF-8');
    });
}

/**
 * Переключает полноэкранный режим
 */
export function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Проверяем поддержку различных префиксов для совместимости
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('Не удалось войти в полноэкранный режим:', err);
            });
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Выходим из полноэкранного режима
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

/**
 * Проверяет, находится ли браузер в полноэкранном режиме
 * @returns {boolean} - true, если браузер в полноэкранном режиме
 */
export function isFullscreen() {
    return !!(document.fullscreenElement || 
              document.webkitFullscreenElement || 
              document.mozFullScreenElement || 
              document.msFullscreenElement);
}

/**
 * Выходит из полноэкранного режима
 */
export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Создает HTML для отображения ошибки
 * @param {string} message - Сообщение об ошибке
 * @returns {string} - HTML код для отображения ошибки
 */
export function createErrorHTML(message) {
    return `
        <div class="fade-in" style="color: #dc3545; text-align: center; padding: 40px;">
            <h2>❌ Ошибка</h2>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Создает HTML для отображения контента с анимацией
 * @param {string} content - HTML контент
 * @returns {string} - HTML код с анимацией
 */
export function createContentHTML(content) {
    return `<div class="fade-in">${content}</div>`;
}

/**
 * Логирует ошибку в консоль
 * @param {string} context - Контекст ошибки
 * @param {Error} error - Объект ошибки
 */
export function logError(context, error) {
    console.error(`${context}:`, error);
}

/**
 * Логирует предупреждение в консоль
 * @param {string} message - Сообщение предупреждения
 */
export function logWarning(message) {
    console.warn(message);
}
