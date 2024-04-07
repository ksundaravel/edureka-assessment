var btn = document.getElementById("country");
var cList = document.getElementById("listItems");

btn.addEventListener("click", function () {
  $.get("data/country.json", function (data, status) {
    if (status === "success") {
      data.forEach((element) => {
        console.log(element.name);
        var li = $("<li>" + element.name + "</li>")
          .addClass("list-group-item")
          .appendTo(cList);
      });
    } else {
      alert("Invalid API call");
    }
  });
});
