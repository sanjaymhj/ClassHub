
var coverfile = null;
function uploadpichover(element){
		element.setAttribute('src','resources/buttons/uploadbtnselc.png');
	}
	
		function uploadpicout(element){
		element.setAttribute('src','resources/buttons/uploadbtn.png');
	}
	
	function openFile(){
		var	fileselect = $id('fileselect');
		fileselect.click();
	}

	function selectCover(){
		var coverselect = $id('coverselect')
		coverselect.click();
	}
	
	function initPublishButton(){
		$('#notice').before("<div class='uploaddesc'><div id='acceptPost' class='uploaddescinner'><span>publish</span></div><div id='cancelPost' class='uploaddescinner'><span>cancel</span></div></div>");
		$id('acceptPost').addEventListener('click',PostSong,false);
		$id('cancelPost').addEventListener('click',CancelPost,false);
	}


	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}
	
	//Event Fired when cancel button is clicked
	function CancelPost(){
		alert('Post Canceled');
	}
	
	//Event Fired when publish button is clicked
	function PostSong(e){
		var message = $id('postmessage').value;
		var songname = $id('songname').value;
		var formdata = new FormData();
		if(coverfile!==null){
			formdata.append('cover',coverfile[0]);
		}
		formdata.append('songmsg',message);
		formdata.append('songname',songname);
		
		if(message!="" && songname !=""){
			$.ajax({
				url:'addpost.php',
				type:'POST',
				data: formdata,
				success:function(data){
					alert(data);
					window.location = "uploadtype.php";
				},
				cache: false,
				contentType: false,
				processData: false
			});
		}else{
			alert('Some details are missing');
		}
	}
	
	function showCover(e){
		coverfile = e.target.files || e.dataTransfer.files;
		 var reader = new FileReader();

            reader.onload = function (e) {
				  $('#blah')
                    .attr('src', e.target.result).css('opacity',1);
            };
		reader.readAsDataURL(coverfile[0]);
	}
	
	function initCover(){
		var coverpreview = $id('coverpreview');
		var coverselect = $id('coverselect');
		coverpreview.addEventListener('click',selectCover,false);
		coverselect.addEventListener('change',showCover,false);
	}

	//initialize
	function Init(){
		var fileselect = $id('fileselect');
		var	filedrag = $id('uploadbody');
		var uploadImg = $id('uploadimg');
		
		
		fileselect.addEventListener('change',FileSelectHandler,false);
		uploadImg.addEventListener('click',openFile,false);
		
		
		//is XHR2 availabe(Not Available = No Drag and Drop Support)
		var xhr = new XMLHttpRequest();
		if(xhr.upload){
			//file drop
			filedrag.addEventListener('dragover',FileDragHover,false);
			filedrag.addEventListener('dragleave',FileDragHover,false);
			filedrag.addEventListener('drop',FileSelectHandler,false);
			filedrag.style.display = "block";
		}
	}
	
	//file drag hover
	function FileDragHover(e){
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover"?"hover":""); 
	}
	
	function FileSelectHandler(e){
		$("#progressbar").progressbar('value', 0);
		//cancel event and hover styling
		FileDragHover(e);
		var files = e.target.files || e.dataTransfer.files;
		$('#uploadbody').html("<div class='songinfoheader'>fill up some detail</div><div class='songinfo' style='position:relative;'><div id='infolist1' class='infolist'><span>1</span></div><textarea id='postmessage' placeholder='Say something about your Song?'></textarea><div id='infolist2' class='infolist'><span>2</span></div><input type='text' id='songname' placeholder='Give your song a name...'></input><div id='infolist3' class='infolist'><span>3</span></div><span class='covertitle'>Choose a Cover</span><div id='coverpreview'><img id='blah' src=''></img><span>NO COVER<br>(click to select a cover)</span></div><form enctype='multipart/form-data' id='coverform'><input type='file' id='coverselect' name='cover' hidden></input></form></div>");
		initCover();
		
		
		sendFileToServer(files);
		//var files = e.target.files || e.dataTransfer.files;
		//alert(files[0].name);
	}
(function() {	
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}
})();