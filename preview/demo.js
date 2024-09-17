// 常量定义
const TODO_LIST_KEY = 'StageInfo';

// 读取 Todo List
function getStageInfo() {
    const StageInfo = localStorage.getItem(TODO_LIST_KEY);
    return StageInfo ? JSON.parse(StageInfo) : [];
}

// 写入 Todo List
function setStageInfo(StageInfo) {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(StageInfo));
}

// 添加 Todo
function addTodo(todo) {
    const StageInfo = getStageInfo();
    StageInfo.push(todo);
    setStageInfo(StageInfo);
}

// 更新 Todo
function updateTodo(index, updatedTodo) {
    const StageInfo = getStageInfo();
    StageInfo[index] = updatedTodo;
    setStageInfo(StageInfo);
}

// 删除 Todo
function deleteTodo(index) {
    const StageInfo = getStageInfo();
    StageInfo.splice(index, 1);
    setStageInfo(StageInfo);
}
