/* get my data */
url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=486F5359317236891FF4CB8DB158C49C&steamids=76561198107529407?method=getQuote&lang=en&format=jsonp&jsonp=?"

$(window).load(function(){
    $(document).ready(function(){
        $.ajax({
            type: 'GET',
            url: url,
            dataType:'jsonp',
            headers: {
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET',
                'Access-Control-Allow-Headers':'application/json',
            },
        }).done(function(data){
            var name = data["response"]["players"][0]["personaname"]
            var avatar = data["response"]["players"][0]["avatarfull"]

            $("#profileName").append(name);
            $("#profileAvatar").css({
                "background": "url("+avatar+") center / cover, no-repeat",
            });
        });
    });

    document.getElementById("copyName").addEventListener("click", copyName);
    document.getElementById("copyTag").addEventListener("click", copyTag);
    document.getElementById("donate").addEventListener("click", donate);

    /* max lenght */
    var $inputName = $("input#name");
    var $inputTag = $("input#tag");

    $inputName.keyup(function (e) {
        var max = 63;
        if ($inputName.val().length > max) {
            var audio = new Audio("src/sound/hit.mp3");
            audio.volume = 0.1;
            audio.play();
            $inputName.val($inputName.val().substr(0, max));
        }
    });
    $inputTag.keyup(function (e) {
        var max = 11;
        if ($inputTag.val().length > max) {
            var audio = new Audio("src/sound/hit.mp3");
            audio.volume = 0.1;
            audio.play();
            $inputTag.val($inputTag.val().substr(0, max));
        }
    });
    function donate() {
        window.open('https://donate.stripe.com/7sIdRFaP37tzdJm5kk', '_blank');
    }
    function copyName() {
        var getName = document.getElementById("name").value;
        var splitName = getName.split("");

        if(splitName.length <= 2) {
            var splitName = splitName.join("‍");
        } else {
            var randomArrayElement = Math.floor(Math.random() * splitName.length);
            var getValue = splitName[randomArrayElement];
            var updateArrayElement = splitName[randomArrayElement] = getValue + "‍";
            var splitName = splitName.join("");
        }

        console.log(splitName);

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
        var splitTag = getTag.split("");

        if(splitTag.length <= 2) {
            var splitTag = splitTag.join("‍");
        } else {
            var randomArrayElement = Math.floor(Math.random() * splitTag.length);
            var getValue = splitTag[randomArrayElement];
            var updateArrayElement = splitTag[randomArrayElement] = getValue + "‍";
            var splitTag = splitTag.join("");
        }

        console.log(splitTag)

        $("input#tag").val(splitTag).select();
        document.execCommand("copy");

        var audio = new Audio("src/sound/buttonclickrelease.ogg");
        audio.volume = 0.3;
        audio.play();

        $("input#tag").val(getTag);
        document.getSelection().removeAllRanges();
    }

    $('#overlay').fadeOut();
});
/* eslint-env jquery */
