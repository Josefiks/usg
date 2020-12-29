document.getElementById("copyTag").addEventListener("click", runTest);

function runTest() {
  var getTag = document.getElementById("tag").value;
  var splitTag = getTag.split("").join("؜");
  $("input#tag").val(splitTag).select();
  document.execCommand("copy");
  $("input#tag").val(getTag);
  document.getSelection().removeAllRanges();
}
/* by steamcommunity.com/id/cpt-jsph */
/* eslint-env jquery */
