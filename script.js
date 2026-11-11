
"use strict";

/* =========================================
   AI PERSONAL ASSISTANT
   Логика управления задачами
========================================= */

// Ключ для хранения данных в localStorage
const STORAGE_KEY = "ai_personal_assistant_tasks";

// Элементы HTML
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const activeCount = document.getElementById("activeCount");
const visibleCount = document.getElementById("visibleCount");

const filterButtons = document.querySelectorAll(".filter-button");

// Текущее состояние приложения
let tasks = loadTasks();
let currentFilter = "all";

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

        // Проверяем корректность сохранённых данных
        return parsedData.filter(task => {
            return (
                task &&
                typeof task.id === "string" &&
                typeof task.title === "string" &&
                task.title.trim().length > 0 &&
                typeof task.completed === "boolean"
            );
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
   Добавление задачи
========================================= */

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskInput.value.trim();

    // Запрещаем пустые задачи
    if (!title) {
        taskInput.value = "";
        taskInput.focus();
        return;
    }

    const newTask = {
        id: createTaskId(),
        title: title,
        completed: false
    };

    tasks.unshift(newTask);

    const saved = saveTasks();

    if (!saved) {
        tasks.shift();
        renderTasks();
        alert("Не удалось сохранить задачу. Проверьте настройки браузера.");
        return;
    }

    taskInput.value = "";

    currentFilter = "all";
    updateFilterButtons();

    renderTasks();

    taskInput.focus();
});

/* =========================================
   Создание уникального ID
========================================= */

function createTaskId() {
    if (typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return Date.now().toString(36) +
        Math.random().toString(36).slice(2);
}

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
        const isActive = button.dataset.filter === currentFilter;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

/* =========================================
   Обновление статистики
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
   Правильное склонение слова "задача"
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
   Создание HTML-элемента задачи
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
    checkbox.setAttribute(
        "aria-label",
        "Отметить задачу как выполненную"
    );

    checkbox.addEventListener("change", function() {
        toggleTask(task.id);
    });

    // Название задачи
    const title = document.createElement("span");

    title.className = "task-text";
    title.textContent = task.title;

    // Статус
    const status = document.createElement("span");

    status.className = "task-status";

    if (task.completed) {
        status.textContent = "Готово";
    } else {
        status.textContent = "В работе";
    }

    // Кнопка удаления
    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute(
        "aria-label",
        "Удалить задачу: " + task.title
    );
    deleteButton.title = "Удалить задачу";

    deleteButton.addEventListener("click", function() {
        deleteTask(task.id);
    });

    article.append(
        checkbox,
        title,
        status,
        deleteButton
    );

    return article;
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

    emptyState.append(icon, title, description);
    taskList.appendChild(emptyState);
}

/* =========================================
   Инициализация приложения
========================================= */

function initApp() {
    updateFilterButtons();
    renderTasks();

    console.log("AI Personal Assistant успешно запущен.");
}

// Запускаем приложение
initApp();
