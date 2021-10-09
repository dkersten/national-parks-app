// show loading text while waiting for data to download
const loadingEl = document.querySelector('.loading-notice')
loadingEl.classList.add('show')


// fetch data from API, only add data if status ok, catch errors
fetch('https://developer.nps.gov/api/v1/parks?stateCode=ca&limit=12&api_key=sotjXf7oezTKrhOJD6MFVL6IB0q67YFPYgFip3Co')
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
    .then(json => addParkData(json.data))
    .catch((error) => {
        console.log(error)
    });

//  function to add park data to DOM
const addParkData = (parkData) => {

    // Select card flex container to add cards as children
    const cardContainer = document.querySelector('.card-flex-container')

    // remove loading text after data loads
    loadingEl.classList.remove('show')
    loadingEl.classList.add('hide')

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

            // build up card structure and add dymanic data from api
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
                                    <li class="activity-item"><span class="activities-label">Activities:</span></li>
                                    <li><a target="_blank" aria-label="Learn more about ${parkName} (Opens in a new tab)" href="${parkURL}">Learn More</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
            `

            // append card to card container
            cardContainer.appendChild(cardEl)

            // select the activity list item and then add the activities list as the last child from ul created in formatActivities function below
            const activityEl = cardEl.querySelector('.activity-item')
            activityEl.insertAdjacentElement("beforeend", formatActivities(parkActivities))

        } // end for loop
}

// function to format activities (first 3 activities or less) --> creates a ul that will be appended to the card above
const formatActivities = (activities) => {
    const activityList = document.createElement('ul')
    activityList.classList.add('sub-menu')

    // make sure activities is not undefined
    if (activities) {

        // check to see if there are less than 3 activities. If so just add those to a list
        if (activities.length < 3) {
            for (let i = 0; i < activities.length; i++) {
                const listItem = document.createElement('li')
                listItem.innerHTML = activities[i]['name']
                activityList.appendChild(listItem)
            }
            
        // if there are 3 or more activites just grab the first 3 
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