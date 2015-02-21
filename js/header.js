

	function addMenuListenerAndHide(){
	$notificationnumber = $('#notification td');
	var menutrack=0;
	var notiftrack=0;
	
	$DropDownMenu = $('#dropdownsubmenu');
	$DropDownFullNotif = $('#fullnotification');
	
		$DropDownMenuRef = document.getElementById('dropdownmenu');
		$DropDownFulNotifRef = document.getElementById('notification'); 
		
		$DropDownMenuRef.addEventListener('click', ShowOrHideDropDownBox($DropDownMenu,menutrack), false);
		$DropDownFulNotifRef.addEventListener('click', ShowOrHideDropDownBox($DropDownFullNotif,notiftrack), false);
		
		$DropDownMenu.hide();
		$DropDownFullNotif.hide();
	}
	
	
	
	function ShowOrHideDropDownBox($ref,track){
		return function(){
			if(track==0){
				$ref.slideDown(200);
				track=1;
			}else{
				$ref.slideUp(200);
				track=0;
			}
		}
	}
	
	function getNotification(username){
		$.post('GetNotification.php',{
			'user' : username
		},function(data){
			var obj = JSON.parse(data);
			console.log(obj);
			refreshNotificationNumber(obj.total);
			var notif ='';
			//var test = obj.notification[0];
		//	console.log("This is -> " + test.postid);
				
			var notification = obj.notification[i];
			var count;
			if(obj.total > 6){
				count = 7;
			}else{
				count = obj.total;
			}
			for(var i=0; i<count;i++){
				var notification = obj.notification[i];
				console.log(notification.id);
				if(notification.postid != ''){
					// Someone liked or commented on your song! Smile :D
					notif += "<div class='usernotifications' notifid='"+notification.id+"' postid='"+notification.postid+"'><img src='"+ notification.picurl +"'><span class='notifuser'>"+ notification.fullname +"</span><br><span class='notiftype'>"+ notification.notifmsg +"</span></div>";
				}else{
					//Someone followed you! Be happy :)
				}
			}
		
			notif +="<span id='morenotification'>View All Notification</span>";
			$('#mainnotification').html(notif);
		}).done(function(){
			$('.usernotifications').click(function(){
				var postid = $(this).attr('postid');
				var notifid = $(this).attr('notifid');
				$.post('readnotification.php',{
					'id' : notifid 
				},function(data){
					//Notification Read :)
				}).done(function(){
					window.location="song.php?id="+postid;
				});	
			});
		});	
	}
	

	
	function refreshNotificationNumber(total){
		if(total>0){
			$notificationnumber.addClass('notifactive');
			$notificationnumber.html(total);
		}
	}