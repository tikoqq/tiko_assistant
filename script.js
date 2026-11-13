
/* =========================================
   AI PERSONAL ASSISTANT
   Основные настройки
========================================= */

:root {
    --background: #f5f7fb;
    --surface: #ffffff;
    --primary: #635bdb;
    --primary-dark: #5149c5;
    --primary-light: #efedff;
    --text: #20243a;
    --text-secondary: #85899b;
    --border: #e9ebf2;
    --success: #20a779;
    --success-light: #e6f7f0;
    --danger: #e45c69;
    --danger-light: #fff0f1;
    --shadow: 0 8px 30px rgba(35, 42, 75, 0.045);
    --radius: 18px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    background: var(--background);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                 Roboto, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
}

body.modal-open {
    overflow: hidden;
}

button,
input,
textarea {
    font: inherit;
}

button {
    cursor: pointer;
}

/* =========================================
   Основной контейнер
========================================= */

.app-container {
    width: min(100% - 48px, 1060px);
    margin: 0 auto;
}

/* =========================================
   Шапка
========================================= */

.header {
    min-height: 92px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid var(--border);
}

.brand {
    display: flex;
    align-items: center;
    gap: 13px;
}

.brand-icon {
    width: 45px;
    height: 45px;
    border-radius: 14px;
    background: var(--primary);
    color: white;
    display: grid;
    place-items: center;
}

.brand-icon svg {
    width: 25px;
    height: 25px;
}

.brand h1 {
    font-size: 17px;
    font-weight: 750;
    letter-spacing: -0.5px;
}

.brand-subtitle {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 4px;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--text-secondary);
    background: white;
    border: 1px solid var(--border);
    border-radius: 30px;
    padding: 9px 13px;
}

.status-dot {
    width: 7px;
    height: 7px;
    background: var(--success);
    border-radius: 50%;
}

/* =========================================
   Приветственный блок
========================================= */

.welcome-section {
    position: relative;
    overflow: hidden;
    margin-top: 35px;
    padding: 37px 40px;
    min-height: 195px;
    border-radius: 22px;
    background: linear-gradient(115deg, #242744, #4846a0);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.eyebrow {
    font-size: 10px;
    letter-spacing: 2px;
    color: #c1bfff;
    font-weight: 700;
}

.welcome-section h2 {
    font-size: clamp(24px, 4vw, 33px);
    letter-spacing: -1.2px;
    margin-top: 14px;
}

.welcome-section p {
    color: #c5c7df;
    font-size: 14px;
    margin-top: 10px;
}

.welcome-decoration {
    width: 160px;
    height: 150px;
    position: relative;
    flex-shrink: 0;
    display: grid;
    place-items: center;
}

.welcome-decoration > span {
    position: relative;
    z-index: 2;
    font-size: 67px;
    color: #d6d2ff;
}

.decoration-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.circle-one {
    width: 125px;
    height: 125px;
}

.circle-two {
    width: 95px;
    height: 95px;
    background: rgba(255, 255, 255, 0.07);
}

/* =========================================
   Карточки статистики
========================================= */

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 17px;
    margin-top: 23px;
}

.stat-card {
    background: var(--surface);
    padding: 21px 23px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.stat-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 13px;
}

.stat-icon {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    font-size: 17px;
    font-weight: 700;
}

.total-icon {
    color: var(--primary);
    background: var(--primary-light);
}

.completed-icon {
    color: var(--success);
    background: var(--success-light);
}

.active-icon {
    color: #d69a37;
    background: #fff5df;
}

.stat-number {
    font-size: 30px;
    font-weight: 750;
    letter-spacing: -1px;
    margin-top: 15px;
}

.stat-description {
    font-size: 11px;
    color: var(--text-secondary);
    margin-top: 5px;
}

/* =========================================
   Секция задач
========================================= */

.tasks-section {
    margin-top: 39px;
}

.section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 21px;
}

.section-heading h2 {
    font-size: 21px;
    letter-spacing: -0.5px;
}

.section-heading p {
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 6px;
}

/* =========================================
   Форма добавления
========================================= */

.task-form {
    display: flex;
    gap: 11px;
    padding: 15px;
    border: 1px solid var(--border);
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.input-wrapper {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 13px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: #fafbfe;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrapper:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 91, 219, 0.09);
}

.input-plus {
    color: var(--primary);
    font-size: 24px;
    font-weight: 300;
}

.input-wrapper input {
    width: 100%;
    min-width: 0;
    height: 45px;
    border: none;
    outline: none;
    background: transparent;
    color: var(--text);
    font-size: 13px;
}

.input-wrapper input::placeholder {
    color: #a6a9b7;
}

.add-button {
    min-height: 45px;
    padding: 0 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border: none;
    border-radius: 11px;
    background: var(--primary);
    color: white;
    font-size: 13px;
    font-weight: 600;
    transition: background 0.2s, transform 0.2s;
}

.add-button:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.add-button:active {
    transform: scale(0.98);
}

.button-plus {
    font-size: 18px;
}

/* =========================================
   Фильтры
========================================= */

.filter-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 26px;
    margin-bottom: 15px;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #eaeaf2;
    padding: 4px;
    border-radius: 11px;
}

.filter-button {
    padding: 8px 13px;
    border: none;
    border-radius: 8px;
    color: #777b90;
    background: transparent;
    font-size: 12px;
    transition: all 0.2s;
}

.filter-button:hover {
    color: var(--text);
}

.filter-button.active {
    color: var(--primary);
    background: white;
    font-weight: 650;
    box-shadow: 0 2px 6px rgba(35, 42, 75, 0.07);
}

.task-counter {
    font-size: 11px;
    color: var(--text-secondary);
    white-space: nowrap;
}

/* =========================================
   Список задач
========================================= */

.task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.task-item {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 16px 17px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow);
    animation: appear 0.2s ease;
    transition: border-color 0.2s;
}

.task-item:hover {
    border-color: #d6d2fa;
}

@keyframes appear {
    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.task-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 21px;
    height: 21px;
    flex-shrink: 0;
    border: 1.7px solid #d4d6e1;
    border-radius: 7px;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.2s;
}

.task-checkbox:hover {
    border-color: var(--primary);
}

.task-checkbox:checked {
    background: var(--success);
    border-color: var(--success);
}

.task-checkbox:checked::after {
    content: "✓";
    color: white;
    font-size: 13px;
    font-weight: 700;
}

.task-text {
    flex: 1;
    min-width: 0;
    font-size: 13px;
    line-height: 1.5;
    overflow-wrap: anywhere;
    transition: color 0.2s;
}

.task-item.completed .task-text {
    color: #a2a5b2;
    text-decoration: line-through;
}

.task-status {
    color: var(--success);
    background: var(--success-light);
    border-radius: 6px;
    padding: 5px 8px;
    font-size: 10px;
    white-space: nowrap;
}

.delete-button {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border: none;
    border-radius: 9px;
    background: transparent;
    color: #a5a8b5;
    font-size: 19px;
    transition: all 0.2s;
}

.delete-button:hover {
    color: var(--danger);
    background: var(--danger-light);
}

/* =========================================
   Кнопка разбора задачи
========================================= */

.ai-task-button {
    min-height: 34px;
    padding: 0 11px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 1px solid #e0ddff;
    border-radius: 9px;
    background: var(--primary-light);
    color: var(--primary);
    font-size: 11px;
    font-weight: 650;
    transition: all 0.2s;
}

.ai-task-button:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    transform: translateY(-1px);
}

.ai-task-button.has-plan {
    background: var(--success-light);
    border-color: #c9eedf;
    color: var(--success);
}

.ai-task-button.has-plan:hover {
    background: var(--success);
    border-color: var(--success);
    color: white;
}

/* =========================================
   Пустой список
========================================= */

.empty-state {
    padding: 42px 20px;
    background: white;
    border: 1px dashed #dfe1eb;
    border-radius: 16px;
    text-align: center;
}

.empty-icon {
    width: 55px;
    height: 55px;
    display: grid;
    place-items: center;
    margin: 0 auto 15px;
    border-radius: 17px;
    background: var(--primary-light);
    color: var(--primary);
    font-size: 25px;
}

.empty-state h3 {
    font-size: 15px;
    margin-bottom: 7px;
}

.empty-state p {
    font-size: 12px;
    line-height: 1.6;
    color: var(--text-secondary);
}

/* =========================================
   Подвал
========================================= */

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 28px 0;
    margin-top: 30px;
    border-top: 1px solid var(--border);
    color: var(--text-secondary);
    font-size: 11px;
}

/* =========================================
   МОДАЛЬНОЕ ОКНО ИИ
========================================= */

.ai-modal[hidden] {
    display: none !important;
}

.ai-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.ai-modal-overlay {
    position: absolute;
    inset: 0;
    background: rgba(25, 27, 49, 0.62);
    backdrop-filter: blur(5px);
    animation: fadeIn 0.2s ease;
}

.ai-modal-content {
    position: relative;
    z-index: 1;
    width: min(100%, 690px);
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    padding: 27px;
    background: white;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 21px;
    box-shadow: 0 20px 70px rgba(20, 24, 55, 0.22);
    animation: modalAppear 0.22s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes modalAppear {
    from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.ai-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 22px;
}

.ai-eyebrow {
    display: block;
    margin-bottom: 8px;
    color: var(--primary);
    font-size: 10px;
    font-weight: 750;
    letter-spacing: 1.8px;
}

.ai-modal-header h2 {
    font-size: 23px;
    letter-spacing: -0.6px;
}

.ai-modal-header p {
    margin-top: 7px;
    color: var(--text-secondary);
    font-size: 12px;
    line-height: 1.5;
}

.modal-close {
    width: 35px;
    height: 35px;
    flex-shrink: 0;
    border: none;
    border-radius: 10px;
    background: #f1f2f7;
    color: #74788a;
    font-size: 23px;
    transition: all 0.2s;
}

.modal-close:hover {
    background: var(--danger-light);
    color: var(--danger);
}

.selected-task-box {
    padding: 15px 17px;
    background: var(--primary-light);
    border: 1px solid #e4e0ff;
    border-radius: 12px;
    margin-bottom: 23px;
}

.selected-task-label {
    color: var(--primary);
    font-size: 9px;
    font-weight: 750;
    letter-spacing: 1.4px;
}

.selected-task-box p {
    margin-top: 7px;
    color: var(--text);
    font-size: 14px;
    font-weight: 650;
    line-height: 1.5;
    overflow-wrap: anywhere;
}

.ai-block {
    min-width: 0;
}

.ai-block-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.ai-block-heading h3 {
    font-size: 15px;
}

.ai-step {
    padding: 5px 8px;
    border-radius: 6px;
    background: #f0efff;
    color: var(--primary);
    font-size: 9px;
    font-weight: 750;
    letter-spacing: 0.7px;
}

.ai-help-text {
    margin: 8px 0 12px;
    color: var(--text-secondary);
    font-size: 11px;
    line-height: 1.6;
}

.ai-textarea {
    display: block;
    width: 100%;
    resize: vertical;
    padding: 14px;
    border: 1px solid var(--border);
    border-radius: 11px;
    outline: none;
    background: #fafbfe;
    color: var(--text);
    font-size: 12px;
    line-height: 1.7;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.ai-textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 91, 219, 0.09);
}

.ai-textarea::placeholder {
    color: #a6a9b7;
}

.prompt-textarea {
    min-height: 165px;
}

.answer-textarea {
    min-height: 180px;
}

.ai-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 12px;
}

.primary-button,
.secondary-button,
.save-plan-button,
.cancel-button,
.delete-plan-button {
    min-height: 42px;
    padding: 0 15px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 650;
    transition: all 0.2s;
}

.primary-button {
    border: 1px solid var(--primary);
    background: var(--primary);
    color: white;
}

.primary-button:hover {
    background: var(--primary-dark);
}

.secondary-button {
    border: 1px solid var(--border);
    background: white;
    color: var(--text);
}

.secondary-button:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: var(--primary-light);
}

.copy-hint {
    min-height: 16px;
    margin-top: 8px;
    color: var(--success);
    font-size: 11px;
}

.ai-divider {
    height: 1px;
    margin: 17px 0 21px;
    background: var(--border);
}

.answer-hint {
    margin-top: 8px;
    color: var(--text-secondary);
    font-size: 10px;
}

.saved-plan-indicator {
    margin-top: 11px;
    padding: 10px 12px;
    border-radius: 9px;
    background: var(--success-light);
    color: var(--success);
    font-size: 11px;
    line-height: 1.5;
}

.saved-plan-indicator span {
    margin-right: 5px;
    font-weight: 800;
}

.ai-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 21px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
}

.modal-footer-actions {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-left: auto;
}

.cancel-button {
    border: 1px solid var(--border);
    background: white;
    color: var(--text-secondary);
}

.cancel-button:hover {
    background: #f4f5f9;
}

.save-plan-button {
    border: 1px solid var(--primary);
    background: var(--primary);
    color: white;
}

.save-plan-button:hover {
    background: var(--primary-dark);
}

.delete-plan-button {
    border: 1px solid #ffdce0;
    background: var(--danger-light);
    color: var(--danger);
}

.delete-plan-button:hover {
    background: var(--danger);
    color: white;
}

.modal-message {
    min-height: 17px;
    margin-top: 10px;
    font-size: 11px;
    color: var(--success);
    text-align: right;
}

.modal-message.error {
    color: var(--danger);
}

/* =========================================
   Доступность
========================================= */

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

button:focus-visible,
input:focus-visible,
textarea:focus-visible {
    outline: 3px solid rgba(99, 91, 219, 0.35);
    outline-offset: 3px;
}

/* =========================================
   Адаптация для планшетов
========================================= */

@media (max-width: 700px) {

    .app-container {
        width: min(100% - 30px, 560px);
    }

    .welcome-section {
        padding: 29px 25px;
        min-height: 175px;
    }

    .welcome-decoration {
        width: 110px;
    }

    .welcome-decoration > span {
        font-size: 52px;
    }

    .circle-one {
        width: 95px;
        height: 95px;
    }

    .circle-two {
        width: 72px;
        height: 72px;
    }

    .stats-grid {
        gap: 10px;
    }

    .stat-card {
        padding: 16px 13px;
    }

    .stat-number {
        font-size: 26px;
    }

    .stat-label {
        font-size: 11px;
    }
}

/* =========================================
   Адаптация для телефонов
========================================= */

@media (max-width: 480px) {

    .app-container {
        width: calc(100% - 28px);
    }

    .header {
        min-height: 77px;
    }

    .brand {
        gap: 9px;
    }

    .brand-icon {
        width: 39px;
        height: 39px;
    }

    .brand h1 {
        font-size: 14px;
    }

    .brand-subtitle {
        font-size: 10px;
    }

    .status-indicator {
        font-size: 0;
        padding: 10px;
    }

    .welcome-section {
        margin-top: 22px;
        padding: 25px 19px;
        min-height: 155px;
    }

    .welcome-section h2 {
        font-size: 23px;
    }

    .welcome-section p {
        max-width: 230px;
        font-size: 12px;
        line-height: 1.5;
    }

    .welcome-decoration {
        position: absolute;
        right: -25px;
        opacity: 0.45;
    }

    .eyebrow {
        font-size: 8px;
    }

    .stats-grid {
        gap: 8px;
        margin-top: 15px;
    }

    .stat-card {
        padding: 13px 10px;
        border-radius: 13px;
    }

    .stat-label {
        font-size: 10px;
    }

    .stat-icon {
        width: 25px;
        height: 25px;
        font-size: 13px;
    }

    .stat-number {
        font-size: 23px;
        margin-top: 11px;
    }

    .stat-description {
        font-size: 9px;
    }

    .tasks-section {
        margin-top: 30px;
    }

    .section-heading h2 {
        font-size: 19px;
    }

    .section-heading p {
        font-size: 11px;
    }

    .task-form {
        flex-direction: column;
        padding: 11px;
        gap: 9px;
    }

    .add-button {
        width: 100%;
    }

    .filter-row {
        align-items: flex-start;
        flex-direction: column;
        gap: 10px;
    }

    .filter-group {
        width: 100%;
        justify-content: space-between;
    }

    .filter-button {
        flex: 1;
        padding: 9px 5px;
        font-size: 11px;
    }

    .task-item {
        gap: 9px;
        padding: 13px 10px;
        flex-wrap: wrap;
    }

    .task-text {
        font-size: 12px;
    }

    .task-status {
        font-size: 9px;
        padding: 4px 6px;
    }

    .ai-task-button {
        min-height: 31px;
        font-size: 10px;
        padding: 0 8px;
    }

    .delete-button {
        width: 29px;
        height: 29px;
    }

    .footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 7px;
        font-size: 10px;
    }

    .ai-modal {
        padding: 10px;
    }

    .ai-modal-content {
        max-height: calc(100vh - 20px);
        padding: 19px 15px;
        border-radius: 17px;
    }

    .ai-modal-header h2 {
        font-size: 20px;
    }

    .prompt-textarea {
        min-height: 180px;
    }

    .answer-textarea {
        min-height: 160px;
    }

    .ai-actions {
        flex-direction: column;
    }

    .ai-actions button {
        width: 100%;
    }

    .ai-modal-footer {
        align-items: stretch;
        flex-direction: column;
    }

    .modal-footer-actions {
        width: 100%;
        margin-left: 0;
    }

    .modal-footer-actions button {
        flex: 1;
    }

    .delete-plan-button {
        width: 100%;
    }

    .modal-message {
        text-align: left;
    }
}

/* =========================================
   Уважение системных настроек анимации
========================================= */

@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
