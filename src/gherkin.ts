/*
Language: Gherkin (Turbo-Gherkin)
Author: Stanislav Belov <stbelov@gmail.com>
Description: Gherkin language for BDD scenarios with Russian support
Category: common
*/

import { HLJSApi, Language } from "highlight.js";

export default function (hljs: HLJSApi): Language {
    return {
        aliases: ['gherkin', 'turbo-gherkin'],
        keywords: {
            keyword: 'Feature Background Ability Business\\ Need Scenario Scenarios Scenario\\ Outline Scenario\\ Template Examples ' +
                'Функционал Контекст Сценарий Сценарии Шаблон\\ Сценария Примеры',
            $pattern: '^[A-Za-zА-Яа-яёЁ_][A-Za-zА-Яа-яёЁ_0-9]+',
        },
        contains: [
            {
                className: 'symbol',
                begin: '\\*',
                relevance: 0
            },
            {
                className: 'meta',
                begin: '@[^@\\s]+'
            },
            {
                begin: '\\|',
                end: '\\|\\w*$',
                contains: [
                    {
                        className: 'string',
                        begin: '[^|]+'
                    }
                ]
            },
            {
                className: 'variable',
                begin: '<',
                end: '>'
            },
            hljs.HASH_COMMENT_MODE,
            {
                className: 'string',
                begin: '"""',
                end: '"""'
            },
            hljs.QUOTE_STRING_MODE,
            // Строки в одинарных кавычках
            {
                className: 'string',
                begin: "'",
                end: "'",
                contains: [hljs.BACKSLASH_ESCAPE]
            },
            // Числа
            hljs.C_NUMBER_MODE,
            // Ключевые слова Gherkin (шаги)
            {
                className: 'type',
                begin: /(?:^|\n)\s*(Given|And|Then|But|When|Дано|Допустим|Пусть|Когда|Тогда|И|Но)(?=\s|:)/
            },
            // Комментарии начинаются с # до конца строки
            hljs.COMMENT('#', '$'),
            // Аннотации начинаются с @
            {
                className: 'meta',
                begin: /@[A-Za-z_][\w-]*/
            }
        ]
    };
}
