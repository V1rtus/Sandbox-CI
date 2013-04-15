/* created by nilyusmedia */

function simple_tooltip(target_items, name){
 jQuery(target_items).each(function(i){
		jQuery("body").append("<div class='"+name+"' id='"+name+i+"'><p>"+jQuery(this).attr('title')+"</p></div>");
		var my_tooltip = jQuery("#"+name+i);

		jQuery(this).removeAttr("title").mouseover(function(){
				my_tooltip.css({opacity:0.8, display:"none"}).fadeIn(100);
		}).mousemove(function(kmouse){
				//my_tooltip.css({left:kmouse.pageX+15, top:kmouse.pageY+15});
				my_tooltip.css({left:kmouse.pageX-(my_tooltip.width() / 2), top:kmouse.pageY-my_tooltip.height()-30});
		}).mouseout(function(){
				my_tooltip.fadeOut(100);
		});
	});
} 
 

$(document).ready(function(){

	simple_tooltip("a.tiz","tooltip");

//	$("#articles").css({display:"none"});
	
	//alert(	$("#articles").width() );
	
	$(".artpix").animate({ opacity: 0.3 }, "slow");	

	$(".artpix").hover(function() {
		$(this).animate({ opacity: 1, left: '+=50'}, "slow");	
		//$(this).animate({top:'182px'},{queue:false,duration:500});
		//$(this).attr("src","button-hover.png");
		//$("img", this).stop().animate({top:"-130px"},{queue:false,duration:200});
			}, function() {
		$(this).animate({ opacity: 0.3 }, "slow");	
		//$(this).attr("src","button.png");
	});
});