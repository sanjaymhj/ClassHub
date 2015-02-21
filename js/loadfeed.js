function loadfeed(set,view,profileuser,userpicurl,userfullname,loggedinuser){
					var feed="";
					$.get('getfeed.php',{
						"set" : set,
						"user" : profileuser,
						"view" : view
					},function(data){
						var obj = JSON.parse(data);
						//console.log(obj);
						if(obj.totalpost == 0){
							$('#morefeed span').html('No More Feed...');
						}
						
						$.each(obj.postdetail,function(item,postdetail){
							var like = postdetail.likestatus?"Unlike":"Like";
							var enabledelete=false;
							var deletepostbtn = '';
							if(postdetail.username === loggedinuser){
								enabledelete=true;
							}
							if(postdetail.username === loggedinuser){
								deletepostbtn = "<div class='deletepost' style='cursor:pointer;'><img src='resources/buttons/close.png'></img></div>";
							}
							feed +="<div class='feedcontainer' id='"+postdetail.id+"'><div class='feedtop'><a href='profilev3.php?user="+postdetail.username+"'><img src = '" + postdetail.picurl + "' height='48' width='50' style='float:left;'></img></a><ul><li>" + postdetail.fname + " " + postdetail.lname + "</li><li>"+ postdetail.date +"</li></ul></div><br><div class='feedcaption'><p>" + postdetail.caption +"</p></div><div class='feedcontent'><img src ='"+postdetail.coverurl+"' postid='"+postdetail.id+"' cover='"+postdetail.coverurl+"' id='music'"+postdetail.songid+"' artist='"+postdetail.fname + " " + postdetail.lname +"' audiourl='"+postdetail.songurl+"' songname='"+postdetail.songname+"' height='50' width='50' style='float:left;'></img><ul><li>"+postdetail.songname+"</li><li>"+postdetail.fname +" "+ postdetail.lname +"</li></ul></div><div class='feedinteraction'><span class='like' id='like"+postdetail.id+"' postid='"+postdetail.id+"'>"+ like +"</span><div id='totalinteraction'><span id='totallike"+postdetail.id+"'>"+ postdetail.totallikes +" likes</span><a href='' id=''>"+postdetail.totalcomments+" comments</a></div></div><div class='feedcomment' id='feedcomment"+postdetail.id+"'>";
							
							$.each(postdetail.comments,function(item,comments){
								feed += "<div class='feedsubcomment'><table><tr><td rowspan='2'><img src ='" + comments.picurl + "' height='40' width='42' style=''></img></td><td><span id='' class='commentuser'>" + comments.fname + " " + comments.lname + "</span><span id='date'>" + comments.date +"</span></td></tr><tr><td><span>" + comments.msg + "</span></td></tr></table>";
								if((loggedinuser === comments.username) || enabledelete){
									feed+="<div class='deletecomment' id='"+comments.id+"' style='cursor:pointer;'><img src='resources/buttons/close.png'></img></div>";
								}
								feed+="</div>";
							});
							
							feed += "</div><div class='feedaddcomment'><textarea placeholder='Leave a Comment...' class='txtcomment' postid='"+ postdetail.id +"' id='txt"+ postdetail.id +"'></textarea></div>";
							
							feed += deletepostbtn; 
							
							feed += "</div>";
							enabledelete=false;	
						});
							
							
						
						if(view == 0){
							$('#morefeed').before(feed);
						}else{
							$('#center').html(feed);
						}
						feed='';
						$(".btnbody").hide();
					}).done(function(){
						
						initializecomponent(userpicurl,userfullname);
							
					});
}

function initializecomponent(userpicurl,userfullname){
					
					$('.deletepost').unbind('click');
					$('.deletepost').click(function(){
						var ref = $(this);
						var postid = ref.parents('.feedcontainer').attr('id');
							
							$.post('deletepost.php',{
								'postid' : postid,
							},function(data){
								ref.parents('.feedcontainer').remove();
							});
					});

					$('.deletecomment').unbind('click');
					$('.deletecomment').click(function(data){
							var ref = $(this);
							var postid =ref.parents('.feedcontainer').attr('id');
							var commentid = ref.attr('id');
							
							$.post('deletecomment.php',{
								'postid' : postid,
								'commentid' :commentid
							},function(data){
								ref.parent('.feedsubcomment').remove();
							});
						});
					
						//called when play button is clicked (to play the song)
						$('.feedcontent img').unbind('click');
						$('.feedcontent img').click(function(){
							var ref = $(this);
							$.post('settrending.php',{
								'postid' : ref.attr('postid')
							},function(data){
								console.log(data);
							});
							initAudio(ref);
						});
						
						$('.txtcomment').unbind('keypress');
						$('.txtcomment').keypress(function(e){
							var ref = $(this);
								if(e.keyCode == 13){
									e.preventDefault();
									var postid = ref.attr('postid');
									addComment(ref,postid,userpicurl,userfullname);
								}else if(e.keyCode == 27){
									ref.val('');
								}
								
						});
						
						//called when like or unlike is clicked
						$('.like').unbind('click');
						$('.like').click(function(){
							var postid = $(this).attr('postid');
							$.post('like.php',{
								postid : postid
							},function(data){
								var data = JSON.parse(data);
								if(data.result == 1){
									$('#like'+postid).html("Like");
									$('#totallike'+postid).html(data.likes + " likes");
								}else if(data.result == 2){
									$('#like'+postid).html("Unlike");
									$('#totallike'+postid).html(data.likes + " likes");
								}else{
									alert(data);
								}
							});
						});
}


function addComment(ref,postid,userpicurl,userfullname){
							var comment = ref.val();
							comment = comment.replace(/'/g,"\\'");
							if(comment == ""){
								alert("Cannot post empty comment...");
							}else{
								$.post('comments.php',{
									"text" : comment,
									"id" : postid
								},function(data){
									var obj = JSON.parse(data);
									console.log(obj);
									if(obj.result == "success"){
										$('#feedcomment'+postid).append("<div class='feedsubcomment'><table><tr><td rowspan='2'><img src ='"+userpicurl+"' height='40' width='42' style=''></img></td><td><span id='' class='commentuser'>"+ userfullname +"</span><span id='date'>"+ obj.dateadded +"</span></td></tr><tr><td><span>"+obj.comment+"</span></td></tr></table><div class='deletecomment' id='"+obj.id+"' style='cursor:pointer;'><img src='resources/buttons/close.png'></img></div></div>");
										ref.val(''); //empty the text from textarea
									}
								}).done(function(){
									initializecomponent(userpicurl,userfullname);
								});
							}
}