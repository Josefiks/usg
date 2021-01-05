document.getElementById("copyTag").addEventListener("click", copyTag);
var $input = $("input#tag");

/* max lenght */
$input.keyup(function (e) {
  var max = 6;
  if ($input.val().length > max) {
    var audio = new Audio("src/sound/hit.mp3");
    audio.volume = 0.1;
    audio.play();
    $input.val($input.val().substr(0, max));
  }
});

/* copy function */
function copyTag() {
  var getTag = document.getElementById("tag").value;
  var splitTag = getTag.split("").join("؜");
  $("input#tag").val(splitTag).select();
  document.execCommand("copy");

  var audio = new Audio("src/sound/buttonclickrelease.ogg");
  audio.volume = 0.3;
  audio.play();

  $("input#tag").val(getTag);
  document.getSelection().removeAllRanges();
}

/* eslint-env jquery */
