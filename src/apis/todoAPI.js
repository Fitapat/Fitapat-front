export default {
  getTodo(date, reqType) {
    return fetch(
      `/api/todo?date=${date.format('YYYY-MM-DD')}&reqType=${reqType}`,
    );
  },

  createTodo(data) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return fetch(`/api/todo`, requestOptions);
  },

  updateTodo(data) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return fetch(`/api/todo?id=${data.id}`, requestOptions).then(() => {
      console.log('updateTodo success!');
    });
  },

  deleteTodo(id) {
    const requestOptions = {
      method: 'DELETE',
    };
    return fetch(`/api/todo?id=${id}`, requestOptions).then(() => {
      console.log('deleteTodo success!');
    });
  },
};
