document.forms["non-followers"].addEventListener("submit", function (e) {
  e.preventDefault()
  let limit_popular = document.forms["non-followers"]["filter-popular-pages"].checked
  let popular_count = document.forms["non-followers"]["popular-pages-limit"].value
  if (!limit_popular) {
    popular_count = -1
  }

  var doc = document.createElement("html")
  doc.innerHTML = document.forms["non-followers"]["followers"].value
  var elems = doc.getElementsByClassName("notranslate")

  followers = {}
  for (var i = 0; i < Math.min(elems.length, 30); i++) {
    let el = elems.item(i).title
    followers[el] = 1
  }

  doc.innerHTML = document.forms["non-followers"]["following"].value
  elems = doc.getElementsByClassName("notranslate")

  non_followers = "<ul>"
  var count = 0
  for (var i = 0; i < Math.min(elems.length, 30); i++) {
    let following = elems.item(i).title
    if (!(following in followers)) {
      count += 1
      non_followers +=
        '<li id="wrap-' +
        following +
        '"><a href="https://www.instagram.com/' +
        following +
        '/" target="_blank" onclick="parentNode.remove()">' +
        following +
        "</a>" +
        ' <span class="meta" id="meta-' +
        following +
        '">(loading..)</span>' +
        "</li>"

      getMeta(following, parseInt(popular_count))
    }
  }
  non_followers += "</ul>"

  document.getElementById("results-box").style.display = "block"
  document.getElementById("count-holder").innerHTML = count
  document.getElementById("list-holder").innerHTML = non_followers
})
