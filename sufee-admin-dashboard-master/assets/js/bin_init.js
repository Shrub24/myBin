const network_id = "70B3D54992251D6C"
const token = "5d514d9ab5ef9f3809541123"
const server_url = "http://alphax.cloud/conduit?id=" + network_id + "&limit=1&ch=1&token=" + token

function get_percentage(dist) {
    return dist / 1000
}

function update_ui(percentage1, percentage2) {
    document.getElementById("bin-text1").textContent = percentage1.toString() + "%"
    document.getElementById("image-overlay1").style.height = percentage1 + "%"
    document.getElementById("bin-text2").textContent = percentage2.toString() + "%"
    document.getElementById("image-overlay2").style.height = percentage2 + "%"
    reduced = reduce(percentage1, percentage2)
    document.getElementById("ratio").textContent = reduced[0].toString() + ":" + reduced[1].toString()
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
    // fetch(server_url, {method: "GET", mode: "cors"})
    //   .then(
    //     function(response) {
    //       if (response.status !== 200) {
    //         console.log('Looks like there was a problem. Status Code: ' +
    //           response.status);
    //         return;
    //       }
    //
    //       // Examine the text in the response
    //       response.json().then(function(data) {
    //           console.log(data);
    //       });
    //     }
    //   )
    //   .catch(function(err) {
    //       console.log('Fetch Error :-S', err);
    //   });
    update_ui(20, 60)
}
