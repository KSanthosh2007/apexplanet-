
/* =================================
   1. TRAVEL DESTINATION CAROUSEL
================================= */

const destinations = [
    {
        name: "Amalfi Coast",
        country: "Italy",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
    },
    {
        name: "Tokyo",
        country: "Japan",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
    },
    {
        name: "Santorini",
        country: "Greece",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077"
    }
];

let currentDestination = 0;

function showDestination(index) {
    const destination = destinations[index];

    console.log(
        "Currently exploring:",
        destination.name,
        destination.country
    );
}


/* =================================
   2. TRAVEL PERSONALITY QUIZ
================================= */

const quizQuestions = [
    {
        question: "What kind of holiday do you prefer?",
        options: [
            "Mountain adventures",
            "Beach relaxation",
            "City exploration"
        ],
        answers: ["Switzerland", "Maldives", "Japan"]
    },
    {
        question: "What is your ideal travel activity?",
        options: [
            "Hiking and trekking",
            "Swimming and relaxing",
            "Shopping and sightseeing"
        ],
        answers: ["Switzerland", "Maldives", "Japan"]
    },
    {
        question: "Choose your dream destination.",
        options: [
            "Snow-covered mountains",
            "Beautiful tropical islands",
            "Modern city lights"
        ],
        answers: ["Switzerland", "Maldives", "Japan"]
    }
];

let currentQuestion = 0;
let quizScores = {
    Switzerland: 0,
    Maldives: 0,
    Japan: 0
};

const startQuiz = document.getElementById("startQuiz");
const quizContainer = document.getElementById("quizContainer");

function displayQuestion() {

    const question = quizQuestions[currentQuestion];

    quizContainer.innerHTML = `
        <h3>${question.question}</h3>

        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <button class="quiz-option" data-index="${index}">
                    ${option}
                </button>
            `).join("")}
        </div>

        <p>Question ${currentQuestion + 1} of ${quizQuestions.length}</p>
    `;

    quizContainer.querySelectorAll(".quiz-option").forEach(button => {
        button.addEventListener("click", () => {

            const selectedIndex = Number(button.dataset.index);
            const selectedDestination = question.answers[selectedIndex];

            quizScores[selectedDestination]++;

            currentQuestion++;

            if (currentQuestion < quizQuestions.length) {
                displayQuestion();
            } else {
                showQuizResult();
            }

        });
    });
}

function showQuizResult() {

    const recommendedDestination = Object.keys(quizScores)
        .reduce((a, b) =>
            quizScores[a] >= quizScores[b] ? a : b
        );

    quizContainer.innerHTML = `
        <h3>Your Travel Match!</h3>
        <h2>${recommendedDestination}</h2>
        <p>Based on your answers, this destination matches your travel preferences.</p>
        <button class="quiz-option" id="restartQuiz">
            Take Quiz Again
        </button>
    `;

    document.getElementById("restartQuiz")
        .addEventListener("click", resetQuiz);
}

function resetQuiz() {

    currentQuestion = 0;

    quizScores = {
        Switzerland: 0,
        Maldives: 0,
        Japan: 0
    };

    displayQuestion();
}

startQuiz.addEventListener("click", () => {

    currentQuestion = 0;

    quizScores = {
        Switzerland: 0,
        Maldives: 0,
        Japan: 0
    };

    startQuiz.style.display = "none";

    displayQuestion();
});


/* =================================
   3. LIVE WEATHER API
================================= */

const weatherBtn = document.getElementById("weatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }

    weatherBtn.disabled = true;
    weatherBtn.textContent = "Loading...";
    weatherResult.textContent = "Fetching weather information...";

    try {

        // Get city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find location.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Try another city.");
        }

        const location = geoData.results[0];

        // Get current weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather.");
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        weatherResult.innerHTML = `
            <h3>${location.name}, ${location.country}</h3>

            <h2>${current.temperature_2m}°C</h2>

            <p>Humidity: ${current.relative_humidity_2m}%</p>

            <p>Wind Speed: ${current.wind_speed_10m} km/h</p>

            <p>Local Time: ${current.time.replace("T", " ")}</p>
        `;

    } catch (error) {

        weatherResult.textContent = error.message;

    } finally {

        weatherBtn.disabled = false;
        weatherBtn.textContent = "Check Weather";

    }
}

weatherBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        getWeather();
    }
});


/* =================================
   4. INITIALIZATION
================================= */

showDestination(currentDestination);

console.log("Travel Explorer is ready!");
