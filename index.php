<!DOCTYPE html>

<html>
	<head>
		<title>ClassHub - Lets study together.</title>
	
		<link rel="stylesheet" href="css/home.css">
		<!--<link href='http://fonts.googleapis.com/css?family=Oswald:700,300' rel='stylesheet' type='text/css'> -->
		<!-- Horizontal ScrollBar CSS -->
		<link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.css">
		<link rel="stylesheet" href="css/loginstyle.css">
		<link rel="stylesheet" href="css/header.css">
		<link rel="stylesheet" href="css/footer.css">
		<link rel="stylesheet" type="text/css" href="css/jcarousel.responsive.css">


		<script type="text/javascript" src="js/jquery-latest.js"></script>
		<script type="text/javascript" src="js/jquery.jcarousel.min.js"></script>
		<script type="text/javascript" src="js/jcarousel.responsive.js"></script>
		
		
		<!-- New Responsive Carousel  -->
		<script type="text/javascript" src="js/responsiveCarousel.js"></script>
		  <link rel="stylesheet" type="text/css" href="css/carouselCustomControls.css">
		 
		
		<!--  ************************************* -->
		<script src="js/jquery-ui-1.10.4.custom.js"></script>
        </head>

	<body>
		<div id="main">
			<div id="header"><h2>ClassHub</h2>
				<div id="headerlink" style="z-index:-99;">
					<div class="headerlinkactive"><a href="index.php" class="leftheader">Home</a></div>
					<div class="headerlinkactive"><a href="#" class="leftheader">About Us</a></div>
					<div class="headerlinkactive"><a href="#" class="leftheader">Contact </a></div>
					<div class="headerlinkactive"><a href="#" class="leftheader" id="clicklogin">Log In</a></div>
					
				</div>
			</div>
			
			<div id="content">
				<div id="subcontent1">
					<div id="firstblock">
							<table>
								<tr>
									<td id="successorfailure">Lets Make Notes Together</td>
								</tr>
							</table>
					</div>
					<div class="loginorsignup">
						<div class="txtlogin"><span>Log In</span></div>
						<a href = "register.html"><div class="txtsignup"><span>Sign Up</span></div></a>
					</div>
				</div>
			
			<footer>
			<div id="footerlink">
				<span>
						<a href="#"><div class="choice">Blog</div></a> 
						<a href="#"><div class="choice">Contact</div></a>
						<a href="#"><div class="choice">Copyright</div></a>
						<a href="#"><div class="choice">Privacy</div></a></span>
				</div>
			</footer>
		</div>
                </div>
	<!--   Login     -->
			<div id="loginform">
				<h2 style="font-family: 'Oswald-Light', sans-serif; color:white; font-size:24px;"><center>Login</center></h2>
								  <form method="post" action="login.php" class="login">
									<p>
									  <label for="login">UserName:</label>
									  <input type="text" name="username" id="login" placeholder="Username">
									</p>

									<p>
									  <label for="password">Password:</label>
									  <input type="password" name="password" id="password" placeholder="Password">
									</p>

									<p class="login-submit">
									  <button type="submit" class="login-button">Login</button>
									</p>
									<p class="forgot-password"><a href="register.html">Sign Up!</a></p>
								  </form>			
			</div>
 <script>
    $(function() {$( "#slider" ).slider();});
    function closelogin(){$('#loginform').fadeOut(200);}
            
    $(document).ready(function() {
                
                  console.log("status");
//                    if(status==1)
//                    {
//                        var dom=document.getElementById("successorfailure");
//                        dom.innerHTML="<img src='../resources/images/success.jpg'>You can now login";
//                        
//                    }
//                    else if(status==0)
//                    {
//                        var dom=document.getElementById("successorfailure");
//                        dom.innerHTML="<img src='../resources/images/error.jpg'>Oops, Something went wrong.";
//                    }
//                    else
//                    {
//                        var dom=document.getElementById("successorfailure");
//                        dom.innerHTML="Not ";
//                    }
                    
			$('#txtsearch').hide();	//initially hides the search bar	 
			$('#loginform').hide(); //initially hides the login form
			
			$('#clicklogin').on('click',function(){ //function to show login form
				$('#loginform').fadeIn(200); //login form appears with fadeIn animation
				$('#content').css({opacity:0.1}); //makes the background opacity to 0.1
			
			});	
			
			$('#btnsearch').click(function(){ //function to show search bar
				$('#txtsearch').show('slide',{direction:'left'},300);  //search bar appears with slide animation
			});
			
			
			$('body').keypress(function(e){ //function called when the content area is clicked
				if(e.keyCode == 27){
					$('#txtsearch').hide('slide',{direction:'left'},300); //hides the search bar with slide animation
					$('#loginform').fadeOut(200); // hides the login from with fadeOut animation
					$('#content').css({opacity:1}); //restores the opacity of content area(makes the content visible)
				}
			});
			
			
				$('.subcontent img').click(function(){
					initAudio($(this));
				});
	
			$('.txtlogin').click(function(){
				$('#clicklogin').click();
			});
		
		 
 });  
			  
		   </script>
  
		<script>
		jQuery(document).ready(function($){
                    
				//$('.gallery1').carousel({overflow: false, visible: 8, itemMinWidth: 200, itemMargin: 10,autoRotate:2000, speed:1000});
				$('.gallery1').carousel({overflow: false, visible: 6, itemMinWidth: 180, itemMargin: 10,speed:200});
				//$('.gallery2').carousel({overflow: false, visible: 7, itemMinWidth: 180, itemMargin: 10,speed:200});
				$('.gallery3').carousel({overflow: false, visible: 6, itemMinWidth: 180, itemMargin: 10,speed:200});
				//$('.textcontent').carousel({ visible: 3, itemMinWidth: 300, itemMargin: 20 });
				$('.crsl-items').on('initCarousel', function(event, defaults, obj){
					// Hide controls
					$('#'+defaults.navigation).find('.previous, .next').css({ opacity: 0 });
					// Show controls on gallery hover
					// #gallery-07 wraps .crsl-items and .crls-nav
					// .stop() prevent queue
					$('#subcontent3').hover( function(){
						$(this).find('.previous').css({ left: 0 }).stop(true, true).animate({ left: '20px', opacity: 1 });
						$(this).find('.next').css({ right: 0 }).stop(true, true).animate({ right: '20px', opacity: 1 });
					}, function(){
						$(this).find('.previous').animate({ left: 0, opacity: 0 });
						$(this).find('.next').animate({ right: 0, opacity: 0 });
					});
					
					
					$('#subcontent5').hover( function(){
						$(this).find('.previous').css({ left: 0 }).stop(true, true).animate({ left: '20px', opacity: 1 });
						$(this).find('.next').css({ right: 0 }).stop(true, true).animate({ right: '20px', opacity: 1 });
					}, function(){
						$(this).find('.previous').animate({ left: 0, opacity: 0 });
						$(this).find('.next').animate({ right: 0, opacity: 0 });
					});
					
				});
				
				$('.gallery2').carousel({carousel: false, overflow: false, visible: 3, itemMinWidth: 250, itemMargin: 10 });
		});
		</script>

	</body>

</html>

