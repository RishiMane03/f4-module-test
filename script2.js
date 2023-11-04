const ipAddressKey = sessionStorage.getItem("IPaddress");
console.log(ipAddressKey);



async function apiRequest(url) {
    try {
        const data = await fetch(`https://ipapi.co/${url}/json/`);
        
        if (!data.ok) {
            throw new Error(`Request failed with status ${data.status}`);
        }
        
        const response = await data.json();
        console.log(response);
        
        // IP information
        const ipInfo = document.getElementById('ipInfo')
        const main1 = document.createElement('div')
        main1.className = 'main1'
    
        main1.innerHTML = `
        <p>IP Address : <span id="ipId">${ipAddressKey}</span></p>
        <div class="information">
            <div>
                <p>Lat: ${response.latitude}</p>
                <p>Long: ${response.longitude}</p>
            </div>
    
            <div>
                <p>City: ${response.city}</p>
                <p>Region: ${response.region}</p>
            </div>
    
            <div>
                <p>Organisation: ${response.org}</p>
                <p>Host: ${response.network}</p>
            </div>
        </div>
        `
        ipInfo.appendChild(main1)


        // Map
        const map = document.getElementById('map')
        const main2 = document.createElement('div')
        main2.className = 'main2'

        main2.innerHTML = `
            <h2>Your Current Location</h2>
            <iframe src="https://maps.google.com/maps?q=${response.latitude}, ${response.longitude}&output=embed" width="1200" height="600" frameborder="0" style="border:0"></iframe>
        `
        map.appendChild(main2)


        // timeZone
        const repo2 = await pinCodeRequest(`${response.postal}`)
        console.log(repo2);

        let Asia_datetime_str = new Date().toLocaleString("en-US", { timeZone:`${response.timezone}` });


        const search = document.getElementById('search')
        const main3 = document.createElement('div')
        main3.className = 'main3'
        main3.innerHTML = `
            <h3>More Information About You</h3>

            <div id="detail">
                <p>Time Zone: ${response.timezone}</p>
                <p>Date And Time: ${Asia_datetime_str}</p>
                <p>Pincode: ${response.postal}</p>
                <p>Message: ${repo2[0].Message}</p>
            </div>
        `
        search.appendChild(main3)

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

}

async function pinCodeRequest(pincode) {
    try {
        const data = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

        if (!data.ok) {
            throw new Error(`Request failed with status ${data.status}`);
        }

        const response2 = await data.json();

        if (Array.isArray(response2) && response2.length > 0 && response2[0].Status === "Error") {
            throw new Error(`Error: ${response2[0].Message}`);
        }


        // creating card
        const allCards = document.getElementById('allCards')
        let postOffice = response2[0].PostOffice;

        postOffice.forEach(element => {
            const card  = document.createElement('div')
            card.className = 'card'
    
            card.innerHTML = `
                <p>Name: ${element.Name}</p>
                <p>Branch Type: ${element.BranchType}</p>
                <p>Delivery Status: ${element.DeliveryStatus}</p>
                <p>District: ${element.District}</p>
                <p>Division: ${element.Division}</p>
            `
            allCards.appendChild(card)
        });

        // Search func
        const searchInput = document.getElementById('searchInput')

        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredData = postOffice.filter((item) => {
                const nameMatches = item.Name.toLowerCase().includes(searchTerm);
                const branchMatches = item.BranchType.toLowerCase().includes(searchTerm);
                return nameMatches || branchMatches;
            });
  
            displaySearchResults(filteredData);
        });

        function displaySearchResults(results) {
            allCards.innerHTML = ""; // Clear previous results
            
            if (results.length === 0) {
              allCards.innerHTML = "<p>No results found.</p>";
              return;
            }
          
            results.forEach((result) => {
              const card = document.createElement("div");
              card.className = "card";
              card.innerHTML = `
                <p>Name: ${result.Name}</p>
                <p>Branch Type: ${result.BranchType}</p>
                <p>Delivery Status: ${result.DeliveryStatus}</p>
                <p>District: ${result.District}</p>
                <p>Division: ${result.Division}</p>
              `;
              allCards.appendChild(card);
            });
          }

        // console.log(response2);
        return response2

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}




apiRequest(ipAddressKey)