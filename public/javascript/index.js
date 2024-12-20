// const axios = require('axios');

window.addEventListener("load", () => {
  const searchInput = document.querySelector('input[name="search"]');
  const studentsList = document.querySelector('.students');

  searchInput.addEventListener("input", async () => {
    try {
      const search = searchInput.value;
      const response = await axios.get(`/api/students/search?search=${search}`);
      studentsList.innerHTML = response.data;
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
    }
  });
});
