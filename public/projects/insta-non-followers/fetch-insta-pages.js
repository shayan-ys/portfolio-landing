var getHTML = function (url, callback) {
  // Feature detection
  if (!window.XMLHttpRequest) return

  // Create new request
  var xhr = new XMLHttpRequest()

  // Setup callback
  xhr.onload = function () {
    if (callback && typeof callback === "function") {
      callback(this.responseXML)
    }
  }

  // Get the HTML
  xhr.open("GET", url)
  xhr.responseType = "document"
  xhr.send()
}

function getMeta(username, filter_above) {
  let url = "https://www.instagram.com/" + username + "/"
  getHTML(url, function (response) {
    let desc = response.querySelector('meta[name="description"]').content
    let desc_short = desc.substring(0, desc.indexOf("-")).trim()
    var followers_raw = desc.substring(0, desc.indexOf("Followers")).trim()
    let followers_raw_last = followers_raw[followers_raw.length - 1]
    let followers_raw_first = followers_raw.substring(0, followers_raw.length - 1).trim()
    followers_raw_first = followers_raw_first.replace(",", "")
    var followers = 0

    switch (followers_raw_last) {
      case "m":
        followers = parseInt(parseFloat(followers_raw_first) * 1000000)
        break
      case "k":
        followers = parseInt(parseFloat(followers_raw_first) * 1000)
        break
      default:
        followers = parseInt(followers_raw_first)
    }

    if (filter_above > 0 && followers > filter_above) {
      console.log(followers)
      document.getElementById("wrap-" + username).style.display = "none"
      let current_count = document.getElementById("count-holder").innerText
      document.getElementById("count-holder").innerText = current_count - 1
    } else {
      if (desc_short.length > 0) {
        document.getElementById("meta-" + username).innerText = " - ( " + desc_short + " )"
      } else {
        document.getElementById("meta-" + username).innerText = ""
      }
    }
  })
}
