// Утилиты для работы с файлами и общие функции
// Этот модуль содержит вспомогательные функции для работы с файлами и общие утилиты

/**
 * Проверяет, является ли файл markdown файлом
 * @param file - Файл для проверки
 * @returns true, если файл является markdown файлом
 */
export function isMarkdownFile(file: File): boolean {
    const extensions = ['.md', '.markdown', '.txt'];
    const fileName = file.name.toLowerCase();
    return extensions.some(ext => fileName.endsWith(ext));
}

/**
 * Читает содержимое файла как текст
 * @param file - Файл для чтения
 * @returns Promise с содержимым файла
 */
export function readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string || '');
        reader.onerror = (_e) => reject(new Error('Не удалось прочитать файл'));
        reader.readAsText(file, 'UTF-8');
    });
}

/**
 * Переключает полноэкранный режим
 */
export function toggleFullscreen(): void {
    if (!document.fullscreenElement) {
        // Проверяем поддержку различных префиксов для совместимости
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('Не удалось войти в полноэкранный режим:', err);
            });
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
            (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).mozRequestFullScreen) {
            (document.documentElement as any).mozRequestFullScreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
            (document.documentElement as any).msRequestFullscreen();
        }
    } else {
        // Выходим из полноэкранного режима
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
    }
}

/**
 * Проверяет, находится ли браузер в полноэкранном режиме
 * @returns true, если браузер в полноэкранном режиме
 */
export function isFullscreen(): boolean {
    return !!(document.fullscreenElement || 
              (document as any).webkitFullscreenElement || 
              (document as any).mozFullScreenElement || 
              (document as any).msFullscreenElement);
}

/**
 * Выходит из полноэкранного режима
 */
export function exitFullscreen(): void {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
    }
}

/**
 * Создает HTML для отображения ошибки
 * @param message - Сообщение об ошибке
 * @returns HTML код для отображения ошибки
 */
export function createErrorHTML(message: string): string {
    return `
        <div class="fade-in" style="color: #dc3545; text-align: center; padding: 40px;">
            <h2>❌ Ошибка</h2>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Создает HTML для отображения контента с анимацией
 * @param content - HTML контент
 * @returns HTML код с анимацией
 */
export function createContentHTML(content: string): string {
    return `<div class="fade-in">${content}</div>`;
}

/**
 * Логирует ошибку в консоль
 * @param context - Контекст ошибки
 * @param error - Объект ошибки
 */
export function logError(context: string, error: Error): void {
    console.error(`${context}:`, error);
}

/**
 * Логирует предупреждение в консоль
 * @param message - Сообщение предупреждения
 */
export function logWarning(message: string): void {
    console.warn(message);
}
