<!DOCTYPE html>
<?php
/* Template Name: Game Page */
?>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="shortcut icon" href="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/styles.css">
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"
        integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous"></script>
	<meta property="og:url" content="http://irinavale.com/artistslifegame" />
	<meta property="og:type" content="game" />
	<meta property="og:title" content="Artists Life Game by Ira Vale" />
	<meta property="og:description" content="How much does culture influence creative thinking?" />
	<meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
</head>

<body>

    <div id="bg" class="bg">
        <img src="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/imgs/field.png" id="field" class="field" />
        <img src="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/imgs/chip.png" id="chip" class="chip" />
    </div>

    <button onclick="next()" id="btn_next" class="btn_next"></button>
	<div style="position: absolute; top: 10px; right: 10px; background: orangered; padding: 5px;">
        <label>FOR TEST:</label>
        <button onclick="toWaitForTest()">STEP TO WAIT</button>
        <button onclick="toDeadForTest()">STEP TO DEAD</button>
        <button onclick="toFinishForTest()">STEP TO FINISH</button>
    </div>
    
    <div id="modalbg" class="modalbg">
        <div id="modal" class="modal">
            <span></span>
            <button id="modalbtn" onclick="modalBtnClick()">Вперед</button>
        </div>
    </div>

    <div id="modalendbg" class="modalendbg">
        <div id="modalend" class="modalend">
            <div class="links">
                <a href="https://www.facebook.com/vale.illustration" target="_blank">нарисовала Ира Вале</a><br/>
                <a href="https://www.facebook.com/anastasiia.ivanchenko.2" target="_blank">оживила Настя Иванченко</a>
            </div>
            <div>Поздравляю, ты стал художником <br/> за <span class="text"></span>!</div>
            <div id="fbbtn" class="fb-share-button" data-href="http://irinavale.com/" data-layout="button"
                data-size="large"><a target="_blank"
                    href="https://www.facebook.com/sharer/sharer.php?u=http://irinavale.com/artistslifegame&src=sdkpreparse"
                    class="fb-xfbml-parse-ignore">Поделиться</a></div>
        </div>
    </div>

    <div id="modaldiebg" class="modaldiebg">
        <div id="modaldie" class="modaldie">
            <img src="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/imgs/die.png" />
            <button id="tryagain" class="tryagain" onclick="tryAgain()">попробовать еще раз</button>
        </div>
    </div>

    <div id="tutorial" class="tutorial">
        <h3>Инструкция:</h3>
        <p id="tutor1" class="tutor1"><span><i>1</i> кидай кубик</span><button
                onclick="tutor2()">понятно</button><b></b></p>
        <p id="tutor2" class="tutor2"><b></b><span><i>2</i> следи за фишкой</span><button
                onclick="start()">играть</button></p>
    </div>

    <div id="screen" class="screen">
        <div>
            <a href="https://www.facebook.com/vale.illustration">придумала и нарисовала Ира Вале</a>
            <img src="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/imgs/screen.png" />
        </div>
        <button onclick="opentutor()">начать игру</button>
    </div>
	
	<script>
		var path = "<?php echo get_bloginfo('template_url') ?>" + "/ArtistsLifeGame/";
	</script>

    <script src="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/data.js"></script>
    <script src="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/script.js"></script>
    <script src="<?php echo get_bloginfo('template_url') ?>/ArtistsLifeGame/tests.js"></script>
	
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v3.3&appId=431650237635112&autoLogAppEvents=1"></script>

</body>

</html>