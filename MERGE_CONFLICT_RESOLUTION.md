# Как разрешить merge conflict в main.tsx

## Что за конфликт

- **Ветка bot-announcement-2 (Current):** исправление ошибки "Cannot access '$t' before initialization" — i18n инициализируется первым, App и react-i18next подгружаются после `initPromise`.
- **Ветка master (Incoming):** старый вариант с обычным импортом `App` и без отложенной загрузки.

## Что оставить

Нужно **оставить логику из bot-announcement-2 (Current change)** в обоих местах конфликта, чтобы сайт не падал с ошибкой `$t`.

### 1. Блок импортов (в начале файла)

**Оставить (Current):**
```ts
// Только i18n — без react-i18next до готовности (устраняет "Cannot access $t before initialization")
import i18n, { initPromise } from './i18n/i18n'
```

**Не добавлять** импорт `App` здесь — он подгружается динамически после инициализации i18n.

### 2. Блок с return и рендером

**Оставить (Current):** весь код с `initPromise.then(...)`, динамическими `import('react-i18next')` и `import('./App.tsx')`, компонентом `ThemeApp` и `root.render(...)` внутри `.then()`.

## В редакторе

- Для **первого** конфликта: **Accept current change**.
- Для **второго** конфликта: **Accept current change**.

Либо удалите вручную маркеры `<<<<<<<`, `=======`, `>>>>>>>` и весь вариант "Incoming change", оставив только код из "Current change".

## На GitHub

Если конфликт в Pull Request:

1. Нажмите "Resolve conflicts".
2. В открывшемся редакторе в обоих конфликтах оставьте код ветки **bot-announcement-2** (тот, что между `<<<<<<< bot-announcement-2` и `=======`).
3. Удалите код между `=======` и `>>>>>>> master` и сами маркеры.
4. Нажмите "Mark as resolved" и "Commit merge".

После разрешения файл `main.tsx` должен выглядеть как в ветке bot-announcement-2 (с initPromise и отложенным рендером).
