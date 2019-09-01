const server_url = "http://localhost:8000/"

function get_percentage(dist) {
    max_height = 60
    return 100 - ((max_height - (dist / 1000))/max_height) * 100
}

function update_ui(percentage1, percentage2) {
    var id = setInterval(frame, 10)
    var count = 0
    var frames = 100
    var percentage1interval = percentage1/frames
    var percentage2interval = percentage2/frames
    var currentpercent1 = 0
    var currentpercent2 = 0
    function frame() {
        if(count >= frames) {
            document.getElementById("bin-text1").textContent = percentage1.toString() + "%"
            document.getElementById("image-overlay1").style.clipPath = "inset(" + (100-percentage1).toString() + "% 0% 0% 0%)"
            document.getElementById("bin-text2").textContent = percentage2.toString() + "%"
            document.getElementById("image-overlay2").style.clipPath = "inset(" + (100-percentage2).toString() + "% 0% 0% 0%)"
            clearInterval(id);
        } else {
            count++
            currentpercent1 += percentage1interval
            currentpercent2 += percentage2interval
            document.getElementById("bin-text1").textContent = parseInt(currentpercent1, 10).toString() + "%"
            document.getElementById("image-overlay1").style.clipPath = "inset(" + (100-currentpercent1).toString() + "% 0% 0% 0%)"
            document.getElementById("bin-text2").textContent = parseInt(currentpercent2, 10).toString() + "%"
            document.getElementById("image-overlay2").style.clipPath = "inset(" + (100-currentpercent2).toString() + "% 0% 0% 0%)"
        }
    }
    // reduced = reduce(percentage1, percentage2)
    // document.getElementById("ratio").textContent = reduced[0].toString() + ":" + reduced[1].toString()
}

function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}



window.onload = function(){
    console.log(server_url)

    // cors issues!!!
    // get data
    fetch(server_url, {method: "GET"})
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
              console.log(response)
              update_ui(get_percentage(response), 50)
          });
        }
      )
      .catch(function(err) {
          console.log('Fetch Error :-S', err);
      });
    update_ui(20, 60)
}
