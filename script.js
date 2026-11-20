const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");

// 전체 할 일 개수와 완료된 할 일 개수를 계산해 화면에 표시하는 함수
function updateCount() {
  const allItems = todoList.querySelectorAll("li");
  const completedItems = todoList.querySelectorAll("li .completed");

  const totalCount = allItems.length;
  const doneCount = completedItems.length;

  todoCount.textContent = "전체 " + totalCount + "개 / 완료 " + doneCount + "개";
}

// 할 일 항목(li)에 완료 토글 기능과 삭제 버튼을 연결하는 함수
function setupTodoItem(li, text) {
  li.textContent = "";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;

  // 할 일 텍스트 클릭 시 완료 상태 토글
  span.addEventListener("click", function () {
    span.classList.toggle("completed");
    updateCount();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "삭제";

  // 삭제 버튼 클릭 시 해당 할 일 제거
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateCount();
  });

  li.append(span, deleteBtn);
}

// 새 할 일을 추가하는 함수
function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    alert("할 일을 입력하세요.");
    todoInput.focus();
    return;
  }

  const li = document.createElement("li");
  setupTodoItem(li, text);
  todoList.append(li);

  todoInput.value = "";
  todoInput.focus();

  updateCount();
}

// 처음 HTML에 있던 기존 할 일 항목들 초기화
const initialItems = todoList.querySelectorAll("li");
for (let i = 0; i < initialItems.length; i++) {
  const item = initialItems[i];
  const currentText = item.textContent.replace("삭제", "").trim();
  setupTodoItem(item, currentText);
}

// 엔터 키로도 할 일 추가 가능하게 설정
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

// 초기 개수 표시 실행
updateCount();