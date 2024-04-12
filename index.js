fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=flowers")
    .then(res => res.json())
    .then(data => {
        console.log(data.urls.regular);
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1553379762-ff913d5513b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTI5MjM4ODJ8&ixlib=rb-4.0.3&q=80&w=1080)`;
    });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong");
        }
        console.log(res.status);
        return res.json();
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} /> 
            <span>${data.name}</span>
        `;
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    })
    .catch(err => console.error(err));
    
    function getCurrentTime() {
    const date = new Date();
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    document.getElementById("time").textContent = date.toLocaleTimeString("en-ZA", options);
}

setInterval(getCurrentTime, 1000);


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p>${Math.round(data.main.temp)}°C</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});
