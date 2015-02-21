function sendFileToServer(files){
	var formdata = new FormData();
	formdata.append('file',files[0]);
			//NProgress.set(0.0);     // Sorta same as .start()
			console.log(formdata);
			$.ajax({
				xhr : function(){
					var xhr = new window.XMLHttpRequest();
					
					//upload progress
					xhr.upload.addEventListener("progress",function(evt){
						if(evt.lengthComputable){
							var percentComplete = evt.loaded/evt.total;
							$('#uploadstatus').html("UPLOADING " + Math.round(percentComplete*100) + "%");
							$("#progressbar").progressbar('value', percentComplete*100);
							//var newwidth=percentComplete*100+"%";
							//$("#progressbar .ui-progressbar-value").animate({width: newwidth}, 'slow');
							//NProgress.set(percentComplete);

							//Do something with upload progresws
							console.log(percentComplete*100 + "% complete...");
						}
					},false);

					return xhr;
				},
			
				url:'data.php',
				 type : 'POST',
				 data : formdata,
				success : function(data){
							if(data === "uploaded file is not a song"){
								$('#mainbody').css({'opacity': 0.1});
								alert('Please upload a song file');
								window.location="upload.php";
							}else{
								initPublishButton();
							}
							
				 },
			  //Options to tell jQuery not to process data or worry about content-type.
				cache: false,
				contentType: false,
				processData: false
	});
}