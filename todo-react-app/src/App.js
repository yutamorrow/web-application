import React, { useState, useEffect } from 'react';

const App = () => {
    // ステートの定義
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // ToDo一覧を取得する関数
    const fetchTodos = async () => {
        try {
            const response = await fetch('https://zh78uve1o7.execute-api.us-west-1.amazonaws.com/prod/todo', {
                method: 'GET',
                mode: 'cors',
            });
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // ToDoを追加する関数
    const addTodo = async () => {
        try {
            // API Gatewayに対してPOSTリクエストを送信
            await fetch('https://zh78uve1o7.execute-api.us-west-1.amazonaws.com/prod/todo', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: Date.now().toString(), text: newTodo }),
            });
            setNewTodo('');  // 入力欄をクリア
            fetchTodos();    // 最新のToDo一覧を取得
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // 初回レンダリング時にToDo一覧を取得
    useEffect(() => {
        fetchTodos();
    }, []);

    // JSXを返す
    return (
        <div>
            <h1>ToDo App</h1>
            <ul>
                {/* ToDo一覧を表示 */}
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
            {/* 新しいToDoを入力するフォーム */}
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            {/* ToDoを追加するボタン */}
            <button onClick={addTodo}>Add ToDo</button>
        </div>
    );
};

export default App;
