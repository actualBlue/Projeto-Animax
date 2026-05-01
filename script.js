const trendingList = document.querySelector("#trending-list");
const launchList = document.querySelector("#launch-list");
const ratedList = document.querySelector("#rate-list")
const parecidosList = document.querySelector("#parecidos-list")

for (let i = 1; i <= 5; i++) {
    trendingList.innerHTML += `
        <div class="anime-card-trending"></div>
    `;
}

for (let i = 1; i <= 5; i++) {
    launchList.innerHTML += `
        <div class="anime-card-launch"></div>
    `;
}

for (let i = 1; i <= 4; i++) {
    ratedList.innerHTML += `
        <div class="anime-card-rated"></div>
    `;
}

for (let i = 1; i <=4; i++) {
    parecidosList.innerHTML += `
        <div class="anime-card-simi"></div>
    `;
}

