

//This is the Audio part
			song= new Audio('');
			var shuffleTrigger=0;
			var playlistTrigger = 0;
			var totaltime='';
			
						function initAudio(elem){
							
							song.pause();
							song = null;
							$('.playlist li').removeClass('active');
							
							var url = elem.attr('audiourl');
							var imagesource= elem.attr('cover');
							var songartist = elem.attr('artist');
							var songname = elem.attr('songname');
							
							document.getElementById('playercover').src =  imagesource;
							document.getElementById('artistname').innerHTML =  songartist;
							document.getElementById('musicname').innerHTML =  songname;
							
							$('#border').delay(300).slideDown();  // shows the music player with slidedown animation
							
							//$( "#slider" ).slider({ value: 0 }); // initialization of Jquery slider value
							//$( "#slider" ).slider({ max: 50 }); //initialization of jquery slider max 
							
							song = new Audio(url);
							song.load();
							
							song.addEventListener("loadedmetadata", function loadedMetadata(){
								var curtime = parseInt(song.duration, 10);
								$( "#slider" ).slider( "option", "max", curtime );
								totaltime=calcTimeRemaining(curtime);
								
							});
							
							
							song.addEventListener("loadeddata", function loadeddata(){
								playsong();
							});

							 song.addEventListener('timeupdate',function (){
								var curtime = parseInt(song.currentTime, 10);
								$( "#slider" ).slider( "option", "value", curtime);
								//$('#time').html(calcTimeRemaining(curtime)+"/"+totaltime);
								$('#currenttime span').html(calcTimeRemaining(curtime));
								$('#totaltime span').html(totaltime);
							});
							
							song.addEventListener('ended', function(){ //  Check whether the audio is ended and play next song:
								if(shuffleTrigger){
									shuffleSong();
								}else{
									nextsong();
								}
							});
						
							
							$('.playlist li').removeClass('current');
							elem.addClass('current')
							elem.addClass('active');
						}
						
						
						
						function playsong(){
							document.getElementById('playpause').src = 'resources/buttons/gpause.png';
							//$('#border').delay(300).slideDown();  // shows the music player with slidedown animation
							song.play(); //plays the music
						}

						function pausesong(){
							document.getElementById('playpause').src = 'resources/buttons/gplay.png';
							song.pause(); //pause the music
						}
						
						function playorpause(){
							if(song.paused){
								playsong();
							}else{
								pausesong();
							}
						}
						
						function shuffleSong(){
								var playListLength = $('.playlist li').length;
									var nextSong = Math.ceil(Math.random()*playListLength);	
									var nextSongId ="#music"+nextSong;
									 var nextSongRefrence = $('.playlist ' + nextSongId);
									 //console.log(nextSongRefrence);
									 //alert(nextSongRefrence.attr('audiourl'));
									//var nextSongObject = '.playlist li ' + '#music'+nextSong;
									//var nextSongRefrence = $(nextSongObject);
									//var start = $('.playlist li:first-child');
									//alert(start);
									//var i;
								//	for(i=1; i<nextSong; i++){									
								//		start = start.next();
								//	}
								//	console.log(start);
									//alert();
									initAudio(nextSongRefrence);
									//playsong();
						}
							
					

						function nextsong(){
							if(shuffleTrigger){
									shuffleSong();
								}else{
									pausesong();
									var next = $('.playlist li.current').next();
									if(next.length == 0){
										next = $('.playlist li:first-child');
									}
									initAudio(next);
									//playsong();
								}
						}

						function prevsong(){
							if(shuffleTrigger){
									shuffleSong();
								}else{
									pausesong();
									var prev = $('.playlist li.current').prev();
									if(prev.length == 0){
										prev = $('.playlist li:last-child');
									}
									initAudio(prev);
									//playsong();
								}
						}
						
						function shuffle(){
							if(shuffleTrigger){
								shuffleTrigger = 0;
								document.getElementById('shufflepic').src = 'resources/buttons/gshuffle.png';
							}else{
								shuffleTrigger = 1;
								document.getElementById('shufflepic').src = 'resources/buttons/gshuffleselc.png';
							}
						}
						
						function playlist(){
								if(playlistTrigger){
								playlistTrigger = 0;
								document.getElementById('playlistpic').src = 'resources/buttons/gplaylist.png';
								$('#musicplaylist').hide('slide',{direction:'right'},250);
							}else{
								playlistTrigger = 1;
								document.getElementById('playlistpic').src = 'resources/buttons/gplaylistselc.png';
								$('#musicplaylist').show('slide',{direction:'right'},250);
							}
						}
						
						function calcTimeRemaining(time){
							var min = Math.floor(time/60);
							var sec = time - (min*60); 
							if(min<10){min = "0"+min;}
							if(sec<10){sec = "0"+sec;}
							result = min+":"+sec;
							return result;
						}
						
					
						
						$(document).ready(function(){
						
						var volume = document.getElementById('volume');
					
						//Music Progress Bar
							$( "#slider" ).slider({ value: 0, range: "min", min: 1,max: 50}); // initialization of Jquery slider value
						
						//Volume Bar
							$( "#volslider" ).slider({value: 10, range: "min", min:0, max: 10});

							
							$( "#slider" ).on( "slide", function( event, ui ) {
								song.currentTime = parseInt(ui.value, 10);
							});
							
							$( "#volslider" ).on( "slide", function( event, ui ) {
								if(ui.value == 10){
									volume.src = "resources/buttons/volfull.png";
								}else if(ui.value==0){
									volume.src = "resources/buttons/volmute.png";
								}else if(ui.value>0 && ui.value<5){
									volume.src = "resources/buttons/vollow.png";
								}else{
									volume.src = "resources/buttons/volmid.png";	
								}
								song.volume = ui.value/10;
							});
							
							
							
							$('#musicplaylist').hide(); //Initially hides the playlist
							
							
							$('#border').hide();  // Initially hides the music player
							
				
							$('.playlist li').click(function(){
									initAudio($(this));
									//playsong();
							});
							//initAudio($('.playlist li:first-child'));	//initializes the audio object and creates necessary event handler
						
							$('.playlist li').removeClass('active');
									
							
						});
