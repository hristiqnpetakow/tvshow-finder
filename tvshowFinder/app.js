const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const titleElement = document.querySelector("#showTitle");
  const imgElement = document.querySelector("#showImg");
  const summaryElement = document.querySelector("#showSummary");
  const langElement = document.querySelector("#showLang");
  const ratingElement = document.querySelector("#showRating");
  const premieredElement = document.querySelector("#showPremiered");
  const durationElement = document.querySelector("#showDuration");
  const card = document.querySelector("#showCard");

  axios
    .get(`https://api.tvmaze.com/singlesearch/shows?q=${searchTerm}`)
    .then((res) => {
      const show = res.data;
      console.log(res.data);
      titleElement.textContent = `Show name: ${show.name.toUpperCase()}`;
      imgElement.src = show.image.medium;
      summaryElement.innerHTML =
        `Summary: ${show.summary}` || "No description available";
      langElement.textContent = `Language: ${show.language}`;
      ratingElement.textContent = `Rating: ${show.rating.average}`;
      premieredElement.textContent = `Premiered: ${show.premiered}`;
      durationElement.textContent = `Duration: ${show.runtime}min`;
      card.classList.remove("hidden");
      card.classList.add("block");
      form.elements.query.value = "";
    })
    .catch((err) => {
      console.error(err);
      titleElement.textContent = "Error loading data";
      card.classList.remove("hidden");
      card.classList.add("block");
      form.elements.query.value = "";
    });
});
