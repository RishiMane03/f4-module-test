// Getting IP address
    let IP;
    const right = document.getElementById('right')
    const spanIP = document.getElementById('spanIP')


    $.getJSON("https://api.ipify.org?format=json", function(data) {
		console.log(data);
        IP = data.ip
        
        spanIP.textContent = IP;
        // const ipAddress = document.createElement('div')
        // ipAddress.className = 'ipAddress';
        // ipAddress.innerHTML = `
        //     <h3>Your Current IP Address is <span class="spanIP"> ${IP}</span></h3>
        // `
        // right.appendChild(ipAddress)

        sessionStorage.setItem("IPaddress", data.ip);
        apiRequest(data.ip)
	})


    

    
        
    // const getStart = document.createElement('button')
    // getStart.className = 'getStart'
    // getStart.textContent = 'Get Started'
    // right.appendChild(getStart)

    function nextPage(){
        console.log('rishi');
        window.location.href = 'index2.html'
    }

