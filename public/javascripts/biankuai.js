 
$(function(){
 
	$(".ipva").bind("keypress",function(){
	if(window.event){
		oEvent = window.event;		//处理兼容性，获得事件对象
		//设置IE的charCode值
		oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
	}
	if( oEvent.keyCode == 13){
		var rds = $(this).val();
		var parten = /^\s*$/ ; 
       if(parten.test(rds)){
	     }else{
		 var sortable = $(".ui-sortable");
		 $(this).parent().find(".disp").append('<span id="dc" class="sort"  style=" background:#CCC;   white-space:nowrap; float:left; display:block;   margin:5px;   height:22px; font-size:12px; "><div  id="dart"  style="padding:0px 6px; cursor:move; height:22px; display:block; float:left;   line-height:22px;">'+ rds +'</div><img onclick=" $(this).parent().remove();" src="images/sfwrg.jpg" style="float:left; display:block; cursor:pointer; " /></span>').sortable("refresh");
     	$(this).attr("value","")
     }
     }
  
});
	
 
	 $(".ipva").blur(function(){
/*		$(".did:eq(2)").fadeOut();*/
	  var rds = $(this).val();
	  if(rds !=""){
	  var sortable = $(".ui-sortable");
	 $(this).parent().find(".disp").append('<span id="dc" class="sort"  style=" 	  background:#CCC;   white-space:nowrap; float:left; display:block;   margin:5px;   height:22px; font-size:12px; "><div  id="dart"  style="padding:0px 6px; cursor:move; height:22px; display:block; float:left;   line-height:22px;">'+ rds +'</div><img onclick=" $(this).parent().remove();" src="images/sfwrg.jpg" style="float:left; display:block; cursor:pointer; " /></span>').sortable("refresh");
     	$(this).attr("value","");
		 }
		 $(this).css("display","none"); 
	  })
}) 

  $(".i_inp").bind("click",function(){
	   $(this).find(".ipva").css("display","block"); 
	   $(this).find(".ipva").focus();
	 
	  })
 