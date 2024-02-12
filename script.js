// Fetch data from the RestCountries API
fetch("https://restcountries.com/v2/all")
  .then((res) => res.json())
  .then((data) => {
    // Initialize an array to store country objects
    let restCountries = [];

    // Loop through the data to extract relevant information for each country
    for (var key in data) {
      let countryObj = {
        countryName: data[key].name,
        countryFlag: data[key].flags.svg,
        countryNativeName: data[key].nativeName,
        countryCapital: data[key].capital,
        countryRegion: data[key].region,
        countryPopulation: data[key].population,
        countryCode: data[key].alpha3Code,
        countryLatlng: data[key].latlng,
      };

      // Push each country object to the array
      restCountries.push(countryObj);
    }

    // Return the array of country objects to the next 'then' block
    return restCountries;
  })
  .then((data) => {
    // Get the total number of countries
    let countryCount = data.length;

    // Create HTML elements dynamically
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    const heading1 = document.createElement("h1");
    heading1.setAttribute("class", "text-center");
    heading1.setAttribute("id", "title");
    heading1.innerText = "Rest Countries";
    const row = document.createElement("div");
    row.setAttribute("class", "row");

    // Loop through each country and create card elements
    for (let i = 0; i < countryCount; i++) {
      let col = document.createElement("div");
      col.setAttribute(
        "class",
        "col-sm-6 col-md-4 col-lg-4 col-xl-4 col-div"
      );
      let card = document.createElement("div");
      card.setAttribute("class", "card h-100");
      card.setAttribute("id", data[i].countryName);
      let cardHeader = document.createElement("div");
      cardHeader.setAttribute("class", "card-header");
      let cardTitle = document.createElement("h5");
      cardTitle.setAttribute(
        "class",
        "card-title w-100 text-center bg-dark text-white"
      );
      cardTitle.innerText = data[i].countryName;
      let cardBody = document.createElement("div");
      cardBody.setAttribute(
        "class",
        "card-body d-flex flex-column justify-content-center align-items-center text-center"
      );
      let cardImg = document.createElement("img");
      cardImg.setAttribute("class", "card-img-top");
      cardImg.setAttribute(
        "alt",
        `${data[i].countryName} flag`
      );
      cardImg.setAttribute("src", `${data[i].countryFlag}`);
      let countryDetailsDiv = document.createElement("div");
      countryDetailsDiv.setAttribute("class", "card-text");

      // Populate the card details with country information
      countryDetailsDiv.innerHTML = `<p>Native Name : ${data[i].countryNativeName}</p>
        <p>Capital : ${data[i].countryCapital}</p>
        <p>Region : ${data[i].countryRegion}</p>
        <p>Latlng: ${data[i].countryLatlng}</p>
        <p>Population : ${data[i].countryPopulation}</p>
        <p>Country Code : ${data[i].countryCode}</p>`;

      // Append elements to create the card structure
      cardBody.append(cardImg, countryDetailsDiv);
      cardHeader.appendChild(cardTitle);
      card.append(cardHeader, cardBody);
      col.appendChild(card);
      row.appendChild(col);
    }

    // Append the dynamically created elements to the document
    container.append(heading1, row);
    document.body.append(container);
  })
  .catch((error) => console.error("Error fetching or processing data:", error));
