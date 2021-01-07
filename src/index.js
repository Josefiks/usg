document.getElementById("copyName").addEventListener("click", copyName);
document.getElementById("copyTag").addEventListener("click", copyTag);

/* max lenght */
var $inputName = $("input#name");
var $inputTag = $("input#tag");

$inputName.keyup(function (e) {
    var max = 32;
    if ($inputName.val().length > max) {
        var audio = new Audio("src/sound/hit.mp3");
        audio.volume = 0.1;
        audio.play();
        $inputName.val($inputName.val().substr(0, max));
    }
});
$inputTag.keyup(function (e) {
    var max = 6;
    if ($inputTag.val().length > max) {
        var audio = new Audio("src/sound/hit.mp3");
        audio.volume = 0.1;
        audio.play();
        $inputTag.val($inputTag.val().substr(0, max));
    }
});

/* copy functions */
function copyName() {
  var getName = document.getElementById("name").value;
  var splitName = getName.split("").join("؜");
  $("input#name").val(splitName).select();
  document.execCommand("copy");

  var audio = new Audio("src/sound/buttonclickrelease.ogg");
  audio.volume = 0.3;
  audio.play();

  $("input#name").val(getName);
  document.getSelection().removeAllRanges();
}

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
