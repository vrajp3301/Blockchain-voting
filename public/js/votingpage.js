$(document).ready(() => {
  $.get("http://localhost:8501/pp/party", (data) => {
    data.data.forEach((item, index) => {
      var tbl = document.getElementById("vote_table");
      var tr = document.createElement("tr");
      tr.className = "table__row";
      var party = document.createElement("td");
      var votebtn = document.createElement("td");
      party.className = "row__cell";
      votebtn.className = "row__cell";
      party.innerHTML = item.name;
      var btn = document.createElement("button");
      btn.className = "vote_btn";
      btn.id = "id";
      btn.type="submit"
      btn.innerHTML = "Vote";
      votebtn.appendChild(btn);
      tr.appendChild(party);
      tr.appendChild(votebtn);
      tbl.appendChild(tr);
    });
  });
  
  $('#id').on('click', () => {
      alert("fdg");
  })
});
