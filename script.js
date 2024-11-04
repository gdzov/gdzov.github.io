function toggleList(id) {
    const list = document.getElementById(id);
    if (list.style.maxHeight) {
        list.style.maxHeight = null; // Скрываем список
    } else {
        list.style.maxHeight = list.scrollHeight + "px"; // Раскрываем список до его полной высоты
    }
}

async function loadSolutions() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Kittyvit/gdz/refs/heads/main/solutions.json');
        
        // Проверяем, что ответ получен
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        Object.keys(data).forEach(subject => {
            const list = document.getElementById(`${subject}-list`);
            list.innerHTML = ""; // Очищаем список перед добавлением новых элементов
            data[subject].forEach(solution => {
                const link = document.createElement('a');
                link.href = solution.url;
                link.textContent = `Решение на ${solution.date}`;
                link.target = "_blank";
                list.appendChild(link);
            });
        });
    } catch (error) {
        console.error("Не удалось загрузить данные:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadSolutions);
