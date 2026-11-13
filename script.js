
"use strict";

/* =========================================
   AI PERSONAL ASSISTANT
   Управление задачами и планами ИИ
========================================= */

// Ключ localStorage оставляем прежним!
const STORAGE_KEY = "ai_personal_assistant_tasks";

// Элементы приложения
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const activeCount = document.getElementById("activeCount");
const visibleCount = document.getElementById("visibleCount");

const filterButtons = document.querySelectorAll(".filter-button");

// Элементы модального окна
const aiModal = document.getElementById("aiModal");
const closeAiModalButton = document.getElementById("closeAiModal");
const cancelAiModalButton = document.getElementById("cancelAiModal");

const selectedTaskTitle = document.getElementById("selectedTaskTitle");
const aiPrompt = document.getElementById("aiPrompt");
const aiAnswer = document.getElementById("aiAnswer");

const copyPromptButton = document.getElementById("copyPromptButton");
const openChatGPTButton = document.getElementById("openChatGPTButton");
const savePlanButton = document.getElementById("savePlanButton");
const deletePlanButton = document.getElementById("deletePlanButton");

const copyHint = document.getElementById("copyHint");
const modalMessage = document.getElementById("modalMessage");
const savedPlanIndicator = document.getElementById("savedPlanIndicator");

// Состояние приложения
let tasks = loadTasks();
let currentFilter = "all";

// ID задачи, с которой сейчас работаем
let currentTaskId = null;


/* =========================================
   Загрузка задач
========================================= */

function loadTasks() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
            return [];
        }

        const parsedData = JSON.parse(savedData);

        if (!Array.isArray(parsedData)) {
            return [];
        }

        return parsedData.filter(task => {
            return (
                task &&
                typeof task.id === "string" &&
                typeof task.title === "string" &&
                task.title.trim().length > 0 &&
                typeof task.completed === "boolean"
            );
        }).map(task => {

            // Совместимость со старыми задачами.
            // Если плана раньше не было, добавляем пустое значение.
            return {
                ...task,
                plan: typeof task.plan === "string"
                    ? task.plan
                    : ""
            };

        });

    } catch (error) {
        console.error("Ошибка загрузки задач:", error);
        return [];
    }
}


/* =========================================
   Сохранение задач
========================================= */

function saveTasks() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        );

        return true;

    } catch (error) {
        console.error("Ошибка сохранения задач:", error);
        return false;
    }
}


/* =========================================
   Создание уникального ID
========================================= */

function createTaskId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return Date.now().toString(36) +
        Math.random().toString(36).slice(2);
}


/* =========================================
   Добавление задачи
========================================= */

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {
        taskInput.value = "";
        taskInput.focus();
        return;
    }

    const newTask = {
        id: createTaskId(),
        title: title,
        completed: false,
        plan: ""
    };

    tasks.unshift(newTask);

    const saved = saveTasks();

    if (!saved) {
        tasks.shift();

        alert(
            "Не удалось сохранить задачу. " +
            "Проверьте настройки браузера."
        );

        return;
    }

    taskInput.value = "";

    currentFilter = "all";

    updateFilterButtons();
    renderTasks();

    taskInput.focus();

});


/* =========================================
   Изменение статуса задачи
========================================= */

function toggleTask(taskId) {

    const task = tasks.find(item => item.id === taskId);

    if (!task) {
        return;
    }

    task.completed = !task.completed;

    if (!saveTasks()) {

        task.completed = !task.completed;

        alert("Не удалось сохранить изменения.");
    }

    renderTasks();
}


/* =========================================
   Удаление задачи
========================================= */

function deleteTask(taskId) {

    const taskIndex = tasks.findIndex(
        item => item.id === taskId
    );

    if (taskIndex === -1) {
        return;
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    if (!saveTasks()) {

        tasks.splice(taskIndex, 0, deletedTask);

        alert("Не удалось сохранить изменения.");
    }

    // Если удаляем текущую задачу, закрываем окно.
    if (currentTaskId === taskId) {
        closeAiModal();
    }

    renderTasks();
}


/* =========================================
   Фильтрация задач
========================================= */

function getFilteredTasks() {

    switch (currentFilter) {

        case "active":
            return tasks.filter(task => !task.completed);

        case "completed":
            return tasks.filter(task => task.completed);

        default:
            return tasks;
    }
}


/* =========================================
   Смена фильтра
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        updateFilterButtons();
        renderTasks();

    });

});


function updateFilterButtons() {

    filterButtons.forEach(button => {

        const isActive =
            button.dataset.filter === currentFilter;

        button.classList.toggle("active", isActive);

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );

    });

}


/* =========================================
   Статистика
========================================= */

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const active = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    activeCount.textContent = active;

    const visible = getFilteredTasks().length;

    visibleCount.textContent =
        visible + " " + getTaskWord(visible);

}


/* =========================================
   Склонение слова "задача"
========================================= */

function getTaskWord(number) {

    const lastTwoDigits = number % 100;
    const lastDigit = number % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "задач";
    }

    if (lastDigit === 1) {
        return "задача";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return "задачи";
    }

    return "задач";
}


/* =========================================
   Отрисовка списка задач
========================================= */

function renderTasks() {

    taskList.replaceChildren();

    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {

        renderEmptyState();
        updateStatistics();

        return;
    }

    filteredTasks.forEach(task => {

        const taskElement = createTaskElement(task);

        taskList.appendChild(taskElement);

    });

    updateStatistics();
}


/* =========================================
   Создание элемента задачи
========================================= */

function createTaskElement(task) {

    const article = document.createElement("article");

    article.className = "task-item";

    if (task.completed) {
        article.classList.add("completed");
    }

    // Чекбокс
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;

    checkbox.dataset.action = "toggle";
    checkbox.dataset.taskId = task.id;

    checkbox.setAttribute(
        "aria-label",
        "Отметить задачу как выполненную"
    );

    // Название
    const title = document.createElement("span");

    title.className = "task-text";
    title.textContent = task.title;

    // Статус
    const status = document.createElement("span");

    status.className = "task-status";

    status.textContent = task.completed
        ? "Готово"
        : "В работе";

    // Кнопка разбора с ИИ
    // Для выполненной задачи показываем её,
    // только если у неё уже существует план.

    if (!task.completed || task.plan) {

        const aiButton = document.createElement("button");

        aiButton.type = "button";
        aiButton.className = "ai-task-button";

        aiButton.dataset.action = "open-ai";
        aiButton.dataset.taskId = task.id;

        if (task.plan) {

            aiButton.classList.add("has-plan");

            aiButton.textContent = "✓ Посмотреть план";

        } else {

            aiButton.textContent = "✦ Разобрать с ИИ";

        }

        aiButton.setAttribute(
            "aria-label",
            task.plan
                ? "Открыть план задачи"
                : "Разобрать задачу с помощью ИИ"
        );

        article.appendChild(checkbox);
        article.appendChild(title);
        article.appendChild(status);
        article.appendChild(aiButton);

    } else {

        article.append(
            checkbox,
            title,
            status
        );

    }

    // Кнопка удаления
    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "×";

    deleteButton.dataset.action = "delete";
    deleteButton.dataset.taskId = task.id;

    deleteButton.setAttribute(
        "aria-label",
        "Удалить задачу: " + task.title
    );

    deleteButton.title = "Удалить задачу";

    article.appendChild(deleteButton);

    return article;
}


/* =========================================
   Обработка действий в списке задач
========================================= */

// Используем делегирование событий.
// Обработчик создаётся только один раз.

taskList.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button || !taskList.contains(button)) {
        return;
    }

    const action = button.dataset.action;
    const taskId = button.dataset.taskId;

    if (action === "open-ai") {
        openAiModal(taskId);
    }

    if (action === "delete") {
        deleteTask(taskId);
    }

});


taskList.addEventListener("change", function(event) {

    const checkbox = event.target;

    if (
        checkbox.matches(
            'input[data-action="toggle"]'
        )
    ) {
        toggleTask(checkbox.dataset.taskId);
    }

});


/* =========================================
   Генерация промпта для ChatGPT
========================================= */

function generatePrompt(taskTitle) {

    return `Ты мой помощник по планированию и организации задач.

Моя задача: "${taskTitle}"

Помоги мне превратить эту задачу в понятный, реалистичный и последовательный план действий.

ТВОЯ ЦЕЛЬ:

Разбить мою задачу на небольшие шаги, которые я смогу выполнять постепенно.

ПРАВИЛА РАБОТЫ:

1. Сначала проанализируй мою задачу и определи, достаточно ли информации для составления качественного плана.

2. Не придумывай факты, обстоятельства, требования и детали, о которых я не сообщал.

3. Если для составления плана не хватает важной информации, сначала задай мне несколько конкретных уточняющих вопросов.

4. Если информации достаточно, сразу приступай к составлению плана.

5. Разбей задачу на небольшие последовательные действия.

6. Для каждого шага укажи:
   - Название действия.
   - Подробное, но понятное описание.
   - Какой результат должен получиться после выполнения.
   - Примерную продолжительность, если её можно обоснованно оценить.

7. Расположи шаги в логической последовательности.

8. Сделай план реалистичным. Не перегружай его большим количеством действий за один день.

9. Если задача большая, раздели её на несколько этапов.

10. Добавь короткий итоговый список действий, с которого я могу начать прямо сейчас.

ФОРМАТ ОТВЕТА:

# План выполнения задачи

## Цель
Кратко объясни, к какому результату нужно прийти.

## Этапы выполнения
Для каждого этапа укажи последовательные шаги и их описание.

## Что понадобится
Перечисли необходимые материалы, знания или инструменты, если они известны.

## Первый шаг
Объясни, что мне лучше сделать в первую очередь.

## Проверка результата
Объясни, как понять, что задача действительно выполнена.

ВАЖНО:

Пиши понятно, структурированно и без лишней воды.

Не усложняй простые задачи.

Учитывай, что я могу быть новичком в этой теме.

Если задача связана с учёбой, объясняй действия так, чтобы я действительно разобрался в материале, а не просто получил готовый результат.

Не выдавай предположения за факты.

Начни с уточняющих вопросов, если они действительно необходимы.`;

}


/* =========================================
   Открытие окна ИИ
========================================= */

function openAiModal(taskId) {

    const task = tasks.find(item => item.id === taskId);

    if (!task) {
        return;
    }

    currentTaskId = taskId;

    // Название задачи
    selectedTaskTitle.textContent = task.title;

    // Создаём запрос
    aiPrompt.value = generatePrompt(task.title);

    // Загружаем существующий план
    aiAnswer.value = task.plan || "";

    // Отображаем состояние сохранённого плана
    const hasPlan = Boolean(task.plan);

    savedPlanIndicator.hidden = !hasPlan;
    deletePlanButton.hidden = !hasPlan;

    // Очищаем сообщения
    copyHint.textContent = "";
    modalMessage.textContent = "";

    modalMessage.classList.remove("error");

    // Открываем окно
    aiModal.hidden = false;
    aiModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    closeAiModalButton.focus();

}


/* =========================================
   Закрытие окна ИИ
========================================= */

function closeAiModal() {

    aiModal.hidden = true;

    aiModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    currentTaskId = null;

    // Возвращаем фокус в приложение
    taskInput.focus();

}


closeAiModalButton.addEventListener(
    "click",
    closeAiModal
);


cancelAiModalButton.addEventListener(
    "click",
    closeAiModal
);


// Закрытие при нажатии на затемнённую область
aiModal.addEventListener("click", function(event) {

    if (event.target.hasAttribute("data-close-modal")) {
        closeAiModal();
    }

});


// Закрытие клавишей Escape
document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        !aiModal.hidden
    ) {
        closeAiModal();
    }

});


/* =========================================
   Копирование промпта
========================================= */

async function copyPrompt() {

    const promptText = aiPrompt.value;

    if (!promptText.trim()) {

        showModalMessage(
            "Запрос пуст. Нечего копировать.",
            true
        );

        return;
    }

    try {

        // Современный способ копирования
        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(promptText);

        } else {

            // Резервный способ для локального режима
            const temporaryTextarea =
                document.createElement("textarea");

            temporaryTextarea.value = promptText;

            temporaryTextarea.style.position = "fixed";
            temporaryTextarea.style.opacity = "0";
            temporaryTextarea.style.pointerEvents = "none";

            document.body.appendChild(temporaryTextarea);

            temporaryTextarea.focus();
            temporaryTextarea.select();

            const copied = document.execCommand("copy");

            temporaryTextarea.remove();

            if (!copied) {
                throw new Error("Копирование не выполнено");
            }

        }

        copyHint.textContent = "✓ Запрос успешно скопирован!";
        copyHint.style.color = "var(--success)";

    } catch (error) {

        console.error("Ошибка копирования:", error);

        copyHint.textContent =
            "Не удалось скопировать. Выдели запрос и скопируй его вручную.";

        copyHint.style.color = "var(--danger)";

    }

}


copyPromptButton.addEventListener(
    "click",
    copyPrompt
);


/* =========================================
   Открытие ChatGPT
========================================= */

openChatGPTButton.addEventListener("click", function() {

    // Открываем ChatGPT в новой вкладке.
    // Сначала желательно скопировать запрос.

    window.open(
        "https://chatgpt.com/",
        "_blank",
        "noopener,noreferrer"
    );

});


/* =========================================
   Сохранение плана
========================================= */

function savePlan() {

    if (!currentTaskId) {
        return;
    }

    const task = tasks.find(
        item => item.id === currentTaskId
    );

    if (!task) {

        showModalMessage(
            "Задача не найдена.",
            true
        );

        return;
    }

    const answer = aiAnswer.value.trim();

    // Проверка пустого ответа
    if (!answer) {

        showModalMessage(
            "Сначала вставь ответ ChatGPT.",
            true
        );

        aiAnswer.focus();

        return;
    }

    // Сохраняем старое значение на случай ошибки
    const previousPlan = task.plan || "";

    // Записываем новый план
    task.plan = answer;

    if (!saveTasks()) {

        // Возвращаем предыдущие данные
        task.plan = previousPlan;

        showModalMessage(
            "Не удалось сохранить план. Проверь доступ к localStorage.",
            true
        );

        return;
    }

    // Обновляем интерфейс
    savedPlanIndicator.hidden = false;
    deletePlanButton.hidden = false;

    renderTasks();

    showModalMessage(
        "✓ План успешно сохранён!",
        false
    );

}


/* =========================================
   Обработчик сохранения
========================================= */

savePlanButton.addEventListener(
    "click",
    savePlan
);


/* =========================================
   Удаление сохранённого плана
========================================= */

function deletePlan() {

    if (!currentTaskId) {
        return;
    }

    const task = tasks.find(
        item => item.id === currentTaskId
    );

    if (!task || !task.plan) {
        return;
    }

    const confirmed = confirm(
        "Ты действительно хочешь удалить сохранённый план?"
    );

    if (!confirmed) {
        return;
    }

    const previousPlan = task.plan;

    task.plan = "";

    if (!saveTasks()) {

        // Восстанавливаем план при ошибке
        task.plan = previousPlan;

        showModalMessage(
            "Не удалось удалить план.",
            true
        );

        return;
    }

    // Очищаем поле
    aiAnswer.value = "";

    savedPlanIndicator.hidden = true;
    deletePlanButton.hidden = true;

    renderTasks();

    showModalMessage(
        "План удалён.",
        false
    );

}


deletePlanButton.addEventListener(
    "click",
    deletePlan
);


/* =========================================
   Сообщения модального окна
========================================= */

function showModalMessage(message, isError) {

    modalMessage.textContent = message;

    modalMessage.classList.toggle(
        "error",
        isError
    );

}


/* =========================================
   Сообщение при пустом списке
========================================= */

function renderEmptyState() {

    const emptyState = document.createElement("div");

    emptyState.className = "empty-state";

    const icon = document.createElement("div");

    icon.className = "empty-icon";
    icon.textContent = "✦";

    const title = document.createElement("h3");

    const description = document.createElement("p");

    if (tasks.length === 0) {

        title.textContent = "Пока нет задач";

        description.textContent =
            "Добавь своё первое дело, чтобы начать продуктивный день.";

    } else if (currentFilter === "active") {

        title.textContent = "Активных задач нет";

        description.textContent =
            "Отлично! Все задачи выполнены.";

    } else if (currentFilter === "completed") {

        title.textContent = "Выполненных задач пока нет";

        description.textContent =
            "Завершённые задачи появятся здесь.";

    } else {

        title.textContent = "Задач нет";

        description.textContent =
            "Добавь новую задачу, чтобы продолжить.";

    }

    emptyState.append(
        icon,
        title,
        description
    );

    taskList.appendChild(emptyState);

}


/* =========================================
   Инициализация приложения
========================================= */

function initApp() {

    updateFilterButtons();

    renderTasks();

    console.log(
        "AI Personal Assistant успешно запущен."
    );

}


// Запускаем приложение
initApp();
