var musicItem = [{
	name:"让我留在你身边",
	src:"http://ac-iiyq8wju.clouddn.com/a925aa3979ea1adaba48.mp3"
	},{
	name:"陪你度过漫长岁月",
	src:"http://ac-iiyq8wju.clouddn.com/bde491cb6f56cbd654fb.mp3"
	}
];
//console.log(musicItem[1].src);
var musicTitle = document.getElementById("musicTitle");
var musicFlag = document.getElementsByClassName("music_info")[0].dataset;
//console.log(musicFlag.flag);
var playPer = document.getElementById("playPer");
var playNext = document.getElementById("playNext");
var audio = document.querySelector('audio');
var disc = document.querySelector('.one');
var play = document.getElementById('playPause');
var mvbtn = document.getElementById('MV');
var ctime = document.querySelector('.ctime');
var atime = document.querySelector('.atime');
var cover = document.querySelector('.cover');
var div1 = document.getElementById('div1');
var img = document.querySelector('img');
var deg = 100;
playPer.addEventListener("tap",function(){
	if(0==musicFlag.flag){
		mui.toast("这已经是第一首歌了");
	}else{
		playPerMusic();
		audioPause();
	}
})
playNext.addEventListener("tap",function(){
	if(1==musicFlag.flag){
		mui.toast("这已经是最后一首歌了");
	}else{
		playNextMusic();
		audioPause();
	}
})
function playPerMusic(){
		musicTitle.innerText=musicItem[0].name;
		audio.src=musicItem[0].src;
		musicFlag.flag = 0;
}
function playNextMusic(){
	    musicTitle.innerText=musicItem[1].name;
		audio.src=musicItem[1].src;
		musicFlag.flag = 1;
}
play.onclick = function() {
	if(audio.paused) {
		audioPlay();
	} else {
		audioPause();
	}
}
function audioPlay(){
	audio.play();
	play.setAttribute("data-flg", "play");
	play.style.backgroundImage = "url(../../img/playcp.fw.png)";
	disc.classList.add("rotated");
}
function audioPause(){
	audio.pause();
	play.removeAttribute("data-flg", "play");
	play.style.backgroundImage = "url(../../img/playc.fw.png)";
	disc.classList.remove("rotated");
}
audio.oncanplay = function() {
	tTime = audio.duration;
	//			console.log(atime);
	var m = Math.floor(tTime / 60);
	var s = Math.floor(tTime % 60);
	s = s >= 10 ? s : "0" + s;
	atime.innerHTML = m + ":" + s;
}
audio.ontimeupdate = function() {
	curTime = audio.currentTime;
	var m = Math.floor(curTime / 60);
	var s = Math.floor(curTime % 60);
	s = s >= 10 ? s : "0" + s;
	ctime.innerHTML = m + ":" + s;
	var value = curTime / tTime;
	cover.style.width = value * 16 + "em";
	div1.style.webkitTransform = "translateX(" + value * 15 + "em)";
}
audio.onended = function(){
		play.removeAttribute("data-flg", "play");
		play.style.backgroundImage = "url(../../img/playc.fw.png)";
		disc.classList.remove("rotated");
		if(0==musicFlag.flag){
			playNextMusic();
			audioPlay();
		}
}
