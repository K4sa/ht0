$(".form_post").submit(function(e) {

    e.preventDefault();
    e.returnValue = false;

    $("#err_msg").remove();

    var form_content = {
    	name: this.name.value,
    	info: this.info.value,
    	op1_num: this.op1_num.value,
    	op1_user: this.op1_user.value,
    	op2_num: this.op2_num.value,
    	op2_user: this.op2_user.value
    };

    var error = validateData(form_content);

    if (error) {
    	drawError(error);
    	console.log("error");
    	return;
    }

    $.ajax({ type: "POST",
    		 url: "https://leikki-ilmo.appspot.com/ilmoittaudu",
    		 data: form_content,
    		 accept: "application/json",
    		 success: function(result) {
    		 	$(".jumbotron").after("<div class='alert alert-success' id='err_msg' role='alert'>" + result + "</div>");
    		 },
    		 error: function(status) {
    		 	console.log(status);
    		 	$(".jumbotron").after("<div class='alert alert-danger' id='err_msg' role='alert'>" + status.responseText + "</div>");
    		 }
    });
});

$(".form_get").submit(function(e) {

    e.preventDefault();
    e.returnValue = false;

    $("#err_msg").remove();

    $.ajax({type: "GET",
			url: "https://leikki-ilmo.appspot.com/tarkista",
			data: {num: this.num.value},
   	        success: function(result) {
    		 	$(".jumbotron").after("<div class='alert alert-success' id='err_msg' role='alert'>" + result + "</div>");
    		},
    		error: function(status) {
    		 	console.log(status);
    		 	$(".jumbotron").after("<div class='alert alert-danger' id='err_msg' role='alert'>" + status.responseText + "</div>");
    		}});
 });

function validateData(data) {
	if (data.name === null || data.name === "")
		return "Ryhmän nimi";
	else if (isNaN(data.op1_num) || data.op1_num > 999999 || data.op1_num < 100000)
		return "Opiskelijan 1 opiskelijanumero";
	else if (isNaN(data.op2_num) || data.op2_num > 999999 || data.op2_num < 100000)
		return "Opiskelijan 2 opiskelijanumero";
	else if (data.op1_user === null || data.op1_user === "")
		return "Opiskelijan 1 käyttäjätunnus";
	else if (data.op2_user === null || data.op2_user === "")
		return "Opiskelijan 2 käyttäjätunnus";
	else
		return false;
}

function drawError(cause) {
	$(".jumbotron").after("<div class='alert alert-danger' id='err_msg' role='alert'>Oho! " 
		+ cause + " taitaa olla virheellinen.</div>"); 
}

$('#info-btn').click(function () {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {
  		$("html, body").animate({ scrollTop: 0 }, 1000);
	}
	else {
  		$('body').animate({
        	scrollTop: $("#info").offset().top
    	}, 1000);
	}
})

$('#info-btn').hover(function () {
		$(this).stop().animate({
			'font-size': 34	
		}, 300)
	}, function () {
		$(this).stop().animate({
			'font-size': 20	
		}, 300)
});

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $("#info_text").show("slow");
       $("#inner_icon").replaceWith('<i class="fa fa-arrow-up fa-stack-1x" id="inner_icon"></i>');
   }
   else {
       $("#info_text").slideUp();
       $("#inner_icon").replaceWith('<i class="fa fa-info fa-stack-1x" id="inner_icon"></i>');
   }
});