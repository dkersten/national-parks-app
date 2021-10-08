// import .env to hide sensitive variables (API key)
// require('dotenv').config();


// fetch data from API
fetch('https://developer.nps.gov/api/v1/parks?stateCode=ca&limit=12&api_key=')
  .then(response => response.json())
  .then(json => addParkData((json.data)))


//   add park data to DOM
const addParkData = (parkData) => {

    // Select card flex container to add cards as children
    const cardContainer = document.querySelector('.card-flex-container')

    // loop through each park in array and build up card element
        for (let i = 0; i < parkData.length; i++) {

            // create card element
            const cardEl = document.createElement('article')
            cardEl.classList.add('card')

            // get basic park information
            const parkName = parkData[i]['fullName']
            const parkDescription = parkData[i]['description']
            const parkImg = parkData[i]['images'][0]['url']
            const parkURL = parkData[i]['url']

            // get lat./long.
            let parkLatitude = parkData[i]['latitude']
            let parkLongitude = parkData[i]['longitude']
            
            // format latitude/logitude
            parkLatitude = parkLatitude.substring(0,6)
            parkLongitude = parkLongitude.substring(1,7)

            // get activities
            const parkActivities = parkData[i]['activities']

            cardEl

            cardEl.innerHTML = `
                    <div class="inner-card-container">
                        <div class="left" style="background: url(${parkImg}); background-position: center; background-size: cover">
                            <h2>${parkName}</h2>
                        </div>
                        <div class="right">
                            <div class="text-container">
                                <p class="park-description">${parkDescription}</p>
                                <ul class="park-info">
                                    <li>Location: ${parkLatitude} N ${parkLongitude} W</li>

                                    <li><span class="activities-label">Activities:</span>
                                        <ul class="sub-menu">
                                            ${parkActivities[0]['name'] ? `<li>${parkActivities[0]['name']}</li>` : ''}

                                            ${parkActivities[1]['name'] ? `<li>${parkActivities[1]['name']}</li>` : ''}

                                            
                                        </ul>
                                    </li>

                                    <li><a target="_blank" aria-label="Learn more about ${parkName} (Opens in a new tab)" href="${parkURL}">Learn More</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
            `

            cardContainer.appendChild(cardEl)
        }
}

// function to format activities (first 3 activities or less)
const formatActivities = (activities) => {
    // console.log(activities)
    const activityList = document.createElement('ul')
    activityList.classList.add('sub-menu')

    // const activityArray = []
    if (activities) {

        if (activities.length < 3) {
            for (let i = 0; i < activities.length; i++) {
                const listItem = document.createElement('li')
                listItem.innerHTML = activities[i]['name']
                activityList.appendChild(listItem)
            }
            
        } else {
            for (let i = 0; i < 3; i++) {
                const listItem = document.createElement('li')
                listItem.innerHTML = activities[i]['name']
                activityList.appendChild(listItem)
            }
        }
        return activityList
    }

}

// dynamic copyright in footer
const copyrightEl = document.querySelector('#copyright-year')
copyrightEl.innerHTML= `${new Date().getFullYear()}`