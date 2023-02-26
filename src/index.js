window.onload = function () {
  const submit = document.getElementById("calculation");
  const result_area = document.getElementById("result_area");
  const start_date = document.getElementById("start_date");
  const end_date = document.getElementById("end_date");
  const day_of_week = document.getElementsByName("day_of_week");

  submit.onclick = function () {
    const day_of_week_arr = new Array();

    while (result_area.firstChild) {
      result_area.removeChild(result_area.firstChild);
    }

    day_of_week.forEach(function (element) {
      if (element.checked) {
        day_of_week_arr.push(parseInt(element.value));
      }
    });

    const result = calc(start_date.value, end_date.value, day_of_week_arr);

    result.forEach(function (element) {
      const day_html = document.createElement("li");
      //getMonth()は+1しないと指定の月の前の月がでてしまう
      //   day_html.textContent =
      //     element.getFullYear().toString().slice(-2) +
      //     "年" +
      //     "<span>" +
      //     (element.getMonth() + 1).toString() +
      //     "/" +
      //     element.getDate().toString() +
      //     "</span>" +
      //     "(" +
      //     ["日", "月", "火", "水", "木", "金", "土"][element.getDay()] +
      //       ")";
      day_html.innerHTML =
        element.getFullYear().toString().slice(-2) +
        "年" +
        "<span class='red-text bold'>" +
        (element.getMonth() + 1).toString() +
        "/" +
        element.getDate().toString() +
        "</span>" +
        "(" +
        ["日", "月", "火", "水", "木", "金", "土"][element.getDay()] +
        ")";

      day_html.classList.add("collection-item");

      day_html.onclick = function () {
        day_html.classList.toggle("teal");
        day_html.classList.toggle("lighten-4");
      };

      result_area.appendChild(day_html);
    });
  };
};

function calc(start, end, day_of_week) {
  const target_date = new Date(start);
  const ret = new Array();

  while (target_date.getTime() <= new Date(end).getTime()) {
    if (check_day_of_week(target_date, day_of_week)) {
      ret.push(new Date(target_date.getTime()));
    }

    target_date.setDate(target_date.getDate() + 1);
  }

  return ret;
}

function check_day_of_week(date, day_of_week) {
  return day_of_week.includes(date.getDay());
}
