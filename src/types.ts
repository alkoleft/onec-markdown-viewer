// Типы для проекта Markdown Viewer

/**
 * Интерфейс для обработчика файлов
 */
export interface FileHandlerInterface {
  /**
   * Обработчик успешного чтения файла
   */
  onFileRead: (content: string) => void;
  
  /**
   * Обработчик ошибки чтения файла
   */
  onError: (error: Error) => void;
  
  /**
   * Инициализация обработчика
   */
  init(): void;
  
  /**
   * Обрабатывает загрузку файла через input
   */
  handleFileLoad(event: Event): Promise<void>;
  
  /**
   * Открывает диалог выбора файла
   */
  openFileDialog(): void;
}

/**
 * Интерфейс для рендерера
 */
export interface RendererInterface {
  /**
   * Рендерит markdown контент
   */
  renderMarkdown(content: string): void;
  
  /**
   * Показывает состояние загрузки
   */
  showLoading(): void;
  
  /**
   * Скрывает состояние загрузки
   */
  hideLoading(): void;
  
  /**
   * Показывает ошибку
   */
  showError(message: string): void;
  
  /**
   * Показывает пустое состояние
   */
  showEmptyState(): void;
  
  /**
   * Скрывает пустое состояние
   */
  hideEmptyState(): void;
  
  /**
   * Очищает контент
   */
  clearContent(): void;
}

/**
 * Интерфейс для обработчика событий
 */
export interface EventHandlerInterface {
  /**
   * Инициализирует обработчики событий
   */
  initEventListeners(): void;
}

/**
 * Интерфейс для конфигурации подсветки синтаксиса
 */
export interface HighlightConfig {
  /**
   * Регистрирует языки для подсветки
   */
  registerLanguages(): void;
  
  /**
   * Настраивает marked для работы с highlight.js
   */
  configureMarked(marked: any): void;
  
  /**
   * Применяет подсветку к блокам кода
   */
  highlightCodeBlocks(html: string): string;
}

/**
 * Интерфейс для утилит
 */
export interface UtilsInterface {
  /**
   * Создает HTML для ошибки
   */
  createErrorHTML(message: string): string;
  
  /**
   * Создает HTML для контента
   */
  createContentHTML(content: string): string;
  
  /**
   * Логирует ошибку
   */
  logError(message: string, error: Error): void;
}

/**
 * Тип для функции создания обработчика событий
 */
export type CreateEventHandlerFunction = (
  fileHandler: FileHandlerInterface,
  onLoadExample: () => void
) => EventHandlerInterface;

/**
 * Тип для функции создания рендерера
 */
export type CreateRendererFunction = () => RendererInterface;

/**
 * Тип для функции получения примера markdown
 */
export type GetExampleMarkdownFunction = () => string;

/**
 * Интерфейс для главного класса приложения
 */
export interface MarkdownViewerInterface {
  /**
   * Инициализирует компоненты приложения
   */
  initComponents(): void;
  
  /**
   * Настраивает библиотеки
   */
  setupLibraries(): void;
  
  /**
   * Инициализирует обработчики событий
   */
  initEventHandlers(): void;
  
  /**
   * Загружает пример markdown контента
   */
  loadExample(): Promise<void>;
}
