export default {
  getTodo(date, reqType) {
    return fetch(
      `http://localhost:3000/api/todo?date=${date.format(
        'YYYY-MM-DD',
      )}&reqType=${reqType}`,
    );
  },
};
