import { readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'

/**
 * Плагин Vite для создания единого HTML файла
 * Инлайнит все CSS и JS ресурсы в HTML
 */
export function singleFilePlugin() {
  return {
    name: 'single-file-build',
    closeBundle() {
      const distDir = resolve(process.cwd(), 'dist')
      const htmlFile = join(distDir, 'index.html')
      
      try {
        // Читаем HTML файл
        let htmlContent = readFileSync(htmlFile, 'utf-8')
        
        console.log('Обрабатываем HTML файл для создания единого файла')

        // Находим все CSS файлы
        const cssRegex = /<link[^>]*href="([^"]*\.css)"[^>]*>/g
        const cssMatches = []
        let cssMatch
        
        while ((cssMatch = cssRegex.exec(htmlContent)) !== null) {
          cssMatches.push({
            fullMatch: [cssMatch.index, cssMatch[0].length], 
            path: cssMatch[1],
            index: cssMatch.index
          })
        }

        // Находим все JS файлы
        const jsRegex = /<script[^>]*src="([^"]*\.js)"[^>]*><\/script>/g
        const jsMatches = []
        let jsMatch
        
        while ((jsMatch = jsRegex.exec(htmlContent)) !== null) {
          jsMatches.push({
            fullMatch: [jsMatch.index, jsMatch[0].length], 
            path: jsMatch[1],
            index: jsMatch.index
          })
        }

        // Объединяем все замены и сортируем по индексу (с конца)
        const allReplacements = [...cssMatches, ...jsMatches]
          .sort((a, b) => b.index - a.index) // Сортируем по убыванию индекса

        // Выполняем замены с конца файла
        for (const replacement of allReplacements) {
          const fullPath = join(distDir, replacement.path)
          
          try {
            const content = readFileSync(fullPath, 'utf-8')
            console.log('replacement:', replacement)
            
            if (replacement.path.endsWith('.css')) {
              console.log('Инлайним CSS:', replacement.path)
              htmlContent = replaceTextAtPosition(htmlContent,
                replacement.fullMatch[0], replacement.fullMatch[1],
                `<style>\n${content}\n</style>`
              )
            } else if (replacement.path.endsWith('.js')) {
              console.log('Инлайним JS:', replacement.path)
              
              htmlContent = replaceTextAtPosition(htmlContent,
                replacement.fullMatch[0], replacement.fullMatch[1],
                `<script>\n${content}\n</script>`
              )
            }
          } catch (error) {
            console.warn('Не удалось прочитать файл:', replacement.path, error.message)
          }
        }
        // Создаем копию с другим именем
        const standaloneFile = join(distDir, 'index-standalone.html')
        writeFileSync(standaloneFile, htmlContent, 'utf-8')
        console.log('Создан standalone файл:', standaloneFile)
        
      } catch (error) {
        console.error('Ошибка при создании единого файла:', error.message)
      }
    }
  }
}

function replaceTextAtPosition(originalString, startIndex, endIndex, replacementText) {
  // Get the part of the string before the replacement area
  const before = originalString.substring(0, startIndex);

  // Get the part of the string after the replacement area
  const after = originalString.substring(startIndex + endIndex);

  // Concatenate the parts with the replacement text in between
  return before + replacementText + after;
}
