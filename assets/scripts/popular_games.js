document.addEventListener("DOMContentLoaded", () => {
  const cacheKey = "rawg_api_response";

  const loadingElement = document.getElementById("loading");

  async function fetchData() {
    const queryParams = new URLSearchParams({
      key: "1bf19b1764914c0b876d0bdde313a694",
      dates: "2022-04-01,2023-04-20",
      platforms: "18,1,7",
      page_size: "9",
      ordering: "-added",
      fields:
        "name,background_image,rating,released,metacritic,genres.name,publishers.name,description_raw",        
    });

    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener información de juegos de RAWG");
      }

      const data = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));

      // Devuelve la lista de juegos en lugar de llamar a renderCards()
      return data.results;
    } catch (error) {
      alert(error.message);
    }
  }

  async function fetchGameDetails(gameId) {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=1bf19b1764914c0b876d0bdde313a694`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener detalles del juego de RAWG");
      }

      const gameDetails = await response.json();
      return gameDetails;
    } catch (error) {
      console.error(error.message);
    }
  }

  function getStarsClass(metacriticScore) {
    if (!metacriticScore) {
      return "";
    }
    const starsCount = Math.round(metacriticScore / 20);
    return `stars-${starsCount}`;
  }

  function getStarsHtml(metacriticScore) {
    if (!metacriticScore) {
      return "";
    }
    const starsCount = Math.round(metacriticScore / 20);
    const fullStarHtml = "";
    const halfStarHtml = "";
    const emptyStarHtml = "";

    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      if (i < starsCount) {
        starsHtml += fullStarHtml;
      } else if (i === starsCount && metacriticScore % 20 >= 10) {
        starsHtml += halfStarHtml;
      } else {
        starsHtml += emptyStarHtml;
      }
    }
    return "<span class='stars'>" + starsHtml + "</span>";
  }

  function createCardHtml(game) {
    const {
      name,
      background_image,
      rating,
      released,
      metacritic,
      genres,
      publishers,
      description_raw,
    } = game;

    let genresHtml = `<p class="genres">Genres: ${
      genres && genres.length > 0
        ? genres
            .slice(0, 3)
            .map((g) => g.name)
            .join(", ")
        : "Genres not available"
    }</p>`;
    let publishersHtml = `<p>Publisher: ${
      publishers && publishers.length > 0
        ? publishers[0].name
        : "Publisher not available"
    }</p>`;

    let descriptionHtml = "<p>Description not available</p>";
    if (description_raw && description_raw.length > 0) {
      let words = description_raw.split(" ");
      let wordsToCheck = words.slice(0, 25);
      let description = wordsToCheck.join(" ");
      let dotIndex = description.indexOf(".");
      if (dotIndex >= 0) {
        description = description.slice(0, dotIndex + 1);
      } else {
        wordsToCheck[24] += "...";
        description = wordsToCheck.join(" ");
      }
      descriptionHtml = `<p class="game-description">${description}</p>`;
    }

    return `<div class="card">
                <img src="${background_image}" loading="lazy">
                <h3>${name}</h3>
                ${descriptionHtml}
                ${genresHtml}
                ${publishersHtml}      
                <p>Release date: ${released}</p>
                <p>Game rating: ${rating.toFixed(1)}/5</p>
                <p class="metacritic-score">${
                  metacritic
                    ? `Metacritic score: ${metacritic}`
                    : "Metacritic score not available"
                }/100</p>
              </div>`;
  }

  async function renderCards(results) {
    try {
      const gameCardContainer = document.getElementById("game-cards");
  
      // Mostrar el elemento "loading" antes de realizar las solicitudes
      loadingElement.style.display = "block";
  
      const sortedResults = results.sort((a, b) => b.metacritic - a.metacritic);
  
      // Obtener los detalles de todos los juegos en paralelo
      const gameDetailsPromises = sortedResults.map((game) =>
        fetchGameDetails(game.id)
      );
      const gameDetailsList = await Promise.all(gameDetailsPromises);
  
      // Renderizar las tarjetas de juegos con sus detalles
      for (let i = 0; i < gameDetailsList.length; i++) {
        const gameDetails = gameDetailsList[i];
        const cardHtml = createCardHtml(gameDetails);
        gameCardContainer.insertAdjacentHTML("beforeend", cardHtml);
      }
  
      updateMetacriticScores();
    } catch (error) {
      console.error("Error al renderizar las tarjetas: ", error.message);
    } finally {
      // Ocultar el elemento de "loading" independientemente de si hay un error o no
      loadingElement.style.display = "none";
    }
  }
  
  
  

  function updateMetacriticScores() {
    const metacriticScoreElements =
      document.querySelectorAll(".metacritic-score");
    metacriticScoreElements.forEach((element) => {
      const metacriticScore = parseInt(
        element.textContent.replace("Metacritic score: ", "")
      );
      element.classList.add(getStarsClass(metacriticScore));
      element.insertAdjacentHTML("beforeend", getStarsHtml(metacriticScore));
    });
  }

  const cachedResponse = localStorage.getItem(cacheKey);

  if (cachedResponse) {
    localStorage.removeItem(cacheKey);
    renderCards(JSON.parse(cachedResponse).results);
  } else {
    // Si no hay datos almacenados en caché, cargar los datos y luego renderizar las tarjetas.
    fetchData().then((results) => renderCards(results));
  }
});