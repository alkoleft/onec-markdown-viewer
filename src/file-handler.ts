// Обработка файлов и загрузка контента
// Этот модуль содержит функции для работы с файлами и их загрузкой

import { isMarkdownFile, readFileContent, logError } from './utils.js';
import type { FileHandlerInterface } from './types.js';

/**
 * Класс для обработки файлов
 */
export class FileHandler implements FileHandlerInterface {
    private fileInput: HTMLInputElement;
    public onFileRead: (content: string) => void;
    public onError: (error: Error) => void;

    constructor(fileInput: HTMLInputElement, onFileLoad: (content: string) => void, onError: (error: Error) => void) {
        this.fileInput = fileInput;
        this.onFileRead = onFileLoad;
        this.onError = onError;
    }

    /**
     * Обрабатывает загрузку файла через input
     * @param event - Событие изменения input
     */
    async handleFileLoad(event: Event): Promise<void> {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        try {
            const content = await readFileContent(file);
            this.onFileRead(content);
        } catch (error) {
            logError('Ошибка загрузки файла', error as Error);
            this.onError(new Error('Ошибка загрузки файла: ' + (error as Error).message));
        }
    }

    /**
     * Обрабатывает перетаскивание файла
     * @param event - Событие drop
     */
    async handleDrop(event: DragEvent): Promise<void> {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        
        if (files && files.length > 0) {
            const file = files[0];
            if (isMarkdownFile(file)) {
                try {
                    const content = await readFileContent(file);
                    this.onFileRead(content);
                } catch (error) {
                    logError('Ошибка загрузки файла', error as Error);
                    this.onError(new Error('Ошибка загрузки файла: ' + (error as Error).message));
                }
            } else {
                this.onError(new Error('Пожалуйста, выберите markdown файл (.md, .markdown, .txt)'));
            }
        }
    }

    /**
     * Обрабатывает перетаскивание файла над областью
     * @param event - Событие dragover
     */
    handleDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    /**
     * Открывает диалог выбора файла
     */
    openFileDialog(): void {
        this.fileInput.click();
    }

    /**
     * Инициализация обработчика
     */
    init(): void {
        // Инициализация уже выполнена в конструкторе
    }
}

/**
 * Возвращает пример markdown контента
 * @returns Пример markdown контента
 */
export function getExampleMarkdown(): string {
    return `# 🚀 Markdown Viewer для 1С

## ✨ Возможности приложения

Это приложение предназначено для просмотра markdown файлов в полноэкранном режиме с поддержкой различных языков программирования.

### 📝 Поддерживаемые языки

- **JSON** - для конфигурационных файлов
- **BSL/1C** - язык программирования 1С:Предприятие (поддерживаются оба алиаса)  
- **Gherkin** - для описания тестов
- **JavaScript, Python, SQL** - и другие популярные языки

### 💻 Примеры кода

#### JSON конфигурация
\`\`\`json
{
    "name": "markdown-viewer",
    "version": "1.0.0",
    "dependencies": {
        "marked": "^12.0.0",
        "highlight.js": "^11.9.0"
    }
}
\`\`\`

#### BSL код (1С) - алиас bsl
\`\`\`bsl
Процедура ОбработатьДокумент(Документ)
    
    Если Документ.Проведен Тогда
        Сообщить("Документ уже проведен");
        Возврат;
    КонецЕсли;
    
    Попытка
        Документ.Записать(РежимЗаписиДокумента.Проведение);
        Сообщить("Документ успешно проведен");
    Исключение
        Сообщить("Ошибка проведения документа: " + ОписаниеОшибки());
    КонецПопытки;
    
КонецПроцедуры
\`\`\`

#### Альтернативный синтаксис (1c)
\`\`\`1c
Функция ПолучитьСуммуДокумента(Документ)
    
    Если Документ.Пустой() Тогда
        Возврат 0;
    КонецЕсли;
    
    СуммаДокумента = 0;
    Для Каждого СтрокаДокумента Из Документ.Товары Цикл
        СуммаДокумента = СуммаДокумента + СтрокаДокумента.Сумма;
    КонецЦикла;
    
    Возврат СуммаДокумента;
    
КонецФункции
\`\`\`

#### Gherkin тест
\`\`\`gherkin
Feature: Обработка документов
  Background:
    Given система настроена
    And пользователь авторизован

  Scenario: Успешное проведение документа
    Given документ создан
    When пользователь проводит документ
    Then документ должен быть проведен
    And статус должен быть "Проведен"

  Scenario: Ошибка при проведении документа
    Given документ создан
    And документ уже проведен
    When пользователь пытается провести документ
    Then должна быть показана ошибка
    And документ остается непроведенным
\`\`\`

### 📊 Таблицы

| Компонент | Описание | Статус |
|-----------|----------|--------|
| Парсер Markdown | marked.js | ✅ Готов |
| Подсветка синтаксиса | highlight.js | ✅ Готов |
| Поддержка BSL | Встроенный лексер highlight.js | ✅ Готов |
| Поддержка 1C | Встроенный лексер highlight.js | ✅ Готов |
| Поддержка Gherkin | Кастомный лексер | ✅ Готов |
| Полноэкранный режим | CSS + JS | ✅ Готов |

### 🔧 Технические детали

> **Важно:** Приложение собирается в один файл с помощью Vite для удобной интеграции в 1С.

#### Особенности реализации:
- Использует современный ES6+ синтаксис
- Поддерживает drag & drop загрузку файлов
- Адаптивный дизайн для разных экранов
- Оптимизированная производительность

### 🎯 Использование

1. **Загрузка файла** - нажмите кнопку "Загрузить файл" или перетащите файл в окно
2. **Полноэкранный режим** - нажмите F11 или кнопку "Полный экран"
3. **Горячие клавиши**:
   - \`Ctrl+O\` - открыть файл
   - \`F11\` - полноэкранный режим
   - \`Escape\` - выйти из полноэкранного режима

---

**Готово к использованию!** 🎉`;
}
