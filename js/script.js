/*=======================GLOBAL_VARIABLES======================*/
var card_id_ok=false;
var emp_nm_ok=false;
var date_of_bh_ok=false;
var salary_ok = false;
var st_date_ok=false;
var exp_ok=false;
var city_ok = false;
var street_ok = false;
var stt_num_ok = false;
var add_info_ok = true;
var phone_num_ok = false;

var crt_exp_ok=false;
var edt_exp_ok=true;
var edt_atd_ok=false;

var exp_lt_dpd=false;
var exp_mn_dpd=false;
var edt_exp_dpd=false;
var edt_atd_dpd=false;

var emp_card_id="";

$(document).ready(function(){

	$("#app").load("php/crt_emp.php");

	/*=========================MAIN_MENU=========================*/

	$(document).on("mousedown","#lgn_mn_btn",function(){
		$("#lgn_mn_btn").animate({left:"+=1000px"},600);
		$("#usr_mn_btn").animate({left:"-=1000px"},600);
		setTimeout(function(){
			$("#app").load("php/lgn_mn.php");
		},400);
	});

	$(document).on("mousedown","#usr_mn_btn",function(){
		$("#usr_mn_btn").animate({left:"-=1000px"},600);
		$("#lgn_mn_btn").animate({left:"+=1000px"},600);
		setTimeout(function(){
			$("#app").load("php/usr_mn.php");
		},400);
	});

	/*=========================LOGIN_MENU========================*/

	$(document).on("mousedown","#lgn_btn",function(){
		var name = $("#name").val();
		var password = $("#password").val();
		if (name=="admin" && password=="12345"){
			anim_log_in_e();	
			setTimeout(function(){
				$("#app").load("php/admin_mn.php");
			},600);
		}
		else{	
			$("#sentence").hide();
			$("#sentence").text("Nesprávne meno alebo heslo !");
			$("#sentence").fadeIn(300);
			$("#sentence").delay(1000).fadeOut();
			clear_inputs();
		}
	});

	$(document).on("mousedown","#bk_lgn_mn",function(){
		anim_log_in_e();
		setTimeout(function(){
			$("#app").load("php/app_mn.php");
		},600);	
	});

	/*========================USER_MENU=========================*/

	$(document).on("mousedown","#bk_usr_mn",function(){	
		$(".usr_mn_btns").delay(100).animate({bottom:"-=700px"},600);
		$("#usr_nm").delay(200).animate({bottom:"+=700px"},600);
		$("#time").delay(100).animate({bottom:"+=700px"},600);
		$("#date").animate({bottom:"+=700px"},600);

		setTimeout(function(){
			$("#app").load("php/app_mn.php");
		},700);	
	});

	$(document).on("mousedown","#check_in",function(){
		if (emp_card_id==""){
			show_info("Priložte kartu!");
		}
		else{
			$.ajax({
				method: "post",
				dataType: "json",
				url: "php/emp_check_in.php",
				data: {emp_card_id: emp_card_id},
				success: function(data){
					if (data.state=="check_in_error"){
						show_info("Najprv zaregistrujte odchod!");
					}else if (data.state=="employee_checked_in"){
						show_info("Príchod zaregistrovaný!");
						$('.check_in_pn').text("Príchod: " + get_curr_time());
					}
				}
			});
		}
	});

	$(document).on("mousedown","#check_out",function(){
		if (emp_card_id==""){
			show_info("Priložte kartu!");
		}
		else{
			$.ajax({
				method: "post",
				dataType: "json",
				url: "php/emp_check_out.php",
				data: {emp_card_id: emp_card_id},
				success: function(data){
					if (data.state=="check_out_error"){
						show_info("Najprv zaregistrujte príchod!");
					}else if (data.state=="employee_checked_out"){
						show_info("Odchod zaregistrovaný!");
						$('.check_in_pn').text("Príchod: nezaregistrovaný");
					}
				}
			});
		}
	});

	/*=========================ADMIN_MENU=========================*/

	$(document).on("mousedown","#add_emp",function(){
		anim_adm_mn();
		setTimeout(function(){
			$("#app").load("php/crt_emp.php",function(){
				ld_exp();
			});
		},600);
	});

	$(document).on("mousedown","#emp_vw_mn",function(){
		anim_adm_mn();
		setTimeout(function(){
			$("#app").load("php/emp_vw_mn.php",function(){
				//loading employee data from database
				ld_emp();
			});
		},600);
	});

	$(document).on("mousedown","#emp_atd_mn",function(){
		anim_adm_mn();	
		setTimeout(function(){
			$("#app").load("php/emp_atd_mn.php",function(){
				ld_atd();
			});
		},600);
	});


	/*=======================CREATE_EMPLOYEE======================*/

	$(document).on("mousedown","#home",function(){
		setTimeout(function(){
			$("#app").load("php/app_mn.php");
		},300);
	});	

	$(document).on("mousedown","#bk_crt_emp",function(){
		$(".crt_emp_btns").delay(200).animate({bottom:"-=700px"},600);
		$("#select").animate({bottom:"+=800px"},600);
		$("#card_id").animate({bottom:"+=800px"},600);
		$("#emp_nm").delay(70).animate({bottom:"+=800px"},600);
		$("#date_of_bh").delay(140).animate({bottom:"+=800px"},600);
		$("#salary").delay(210).animate({bottom:"+=800px"},600);
		$("#st_date").delay(280).animate({bottom:"+=800px"},600);



		setTimeout(function(){
			$("#app").load("php/admin_mn.php",function(){
			});
		},600);
	});

	$(document).on("mousedown","#crt_emp",function(){	
		if (chk_crt_emp_ipts()){	
			var card_id = $("#card_id").val();
			var emp_nm = $("#emp_nm").val();
			var date_of_bh = $("#date_of_bh").val();
			var salary = parseInt($("#salary").val());
			var st_date = $("#st_date").val();
			var exp_id = $("#sh_exp_lt").val();
			var city = $("#city").val();
			var street = $("#street").val();
			var stt_num = $("#stt_num").val();
			var phone_num = $("#phone_num").val();
			var add_info = $("#add_info").val();

			$.ajax({
				method: "post",
				dataType: "json",
				url: "php/ins_new_emp.php",
				data: {card_id:card_id, emp_nm:emp_nm, 
					date_of_bh:date_of_bh, salary:salary, 
					st_date:st_date,exp_id:exp_id, city:city, 
					street:street, stt_num:stt_num, add_info:add_info,phone_num:phone_num},
				success: function(data){
					if (data.state==false){
						show_info("Karta sa v systéme už nachádza!");
					}else{
						show_info("Zamestnanec vytvorený!");
					}
				}
			});
		}
		else{
			show_info("Vyplňte správne všetky údaje!");
		}
	});

	$(document).on("mousedown","#sh_exp_lt",function(){
		if ($(".exp_scr_lt").find(".exp_lt_ele").length > 0){
			if (exp_lt_dpd==false){
				show_exp_lt();
			}else if(exp_lt_dpd==true){	
				hide_exp_lt();	
			}
		}
		else{
			show_info("Nič nu nieje!");
		}
	});

	//hide expertise_list and expertise_menu, when clicked elswhere	
	$("main").on("mousedown",function(e){
		bind_crt_emp(e);
	});

	$(document).on("mousedown",".exp_lt_btn",function(){
		$("#sh_exp_lt").text($(this).text());
		$("#sh_exp_lt").val($(this).val());
	});

	$(document).on("mousedown","#sh_exp_mn",function(){
		if (exp_mn_dpd==false){
			$('#new_exp').val("");
			show_exp_mn();
			exp_mn_dpd = true;
		}else if(exp_mn_dpd==true){
			hide_exp_mn();
			exp_mn_dpd=false;
			$("#new_exp").val("");	
		}
	});

	$(document).on("mousedown","#crt_exp",function(){
		if(crt_exp_ok==true){
			var expertise = $("#new_exp").val();
			$.ajax({
				method: "post",
				dataType: "json",
				url: "php/ins_new_exp.php",
				data: {expertise:expertise},
				success: function(data){
					if (data.state==false){
						show_info("Pozícia sa v systéme už nacádza!");
					}else{
						ld_exp();
						$("#new_exp").val("");
						show_info("Pozícia vyrvorená!");
					}
				}
			});
		}
		else{
			show_info("Zadajte správny formát pozície!");
		}
	});

	$(document).on("mousedown",".rem_exp",function(){
		var exp_id = $(this).val();
		show_question("Naozaj chcete pozíciu odstŕaniť?");
		$(document).on("mousedown",".con_pp",function(){
			hide_question();
			
			if (exp_id== $("#sh_exp_lt").val()){
				$("#sh_exp_lt").val(-1);
				$("#sh_exp_lt").html("Pozícia");
			}

			$.ajax({
				method: "post",
				dataType: "json",
				url: "php/del_exp.php",
				data: {exp_id:exp_id},
				success: function(data){
						if (data.state == "error"){
							show_info("Pozícia sa nedá odstrániť!");
						}else{
							ld_exp();
							show_info("Pozícia odstránená!");
						}
					},
				complete: function(){
						var lt_height = ($(".exp_scr_lt").find(".exp_lt_ele").length * 52) - 52;
						if (lt_height < 156){
							$(".exp_lt").css("height","" + lt_height + "px");
							if (lt_height==52){
								show_st_date();
							}else if(lt_height==0){
								show_salary();
							}
						}
				}
			});
		});	

	});

	$(document).on("mousedown",".edt_exp",function(){
		var par_ele = $(this).parent();
		if (edt_exp_dpd==false){
			hide_exp_info(par_ele);
			show_edit_exp(par_ele);
			edt_exp_dpd=true
		}else if (edt_exp_dpd==true){
			hide_edit_exp();
			show_exp_info();

			hide_exp_info(par_ele);

			show_edit_exp(par_ele);
		}
	});

	$(document).on("mousedown",".cfm_edt_exp",function(){	
		if (edt_exp_ok==true){
		var exp_id = $(this).val();
		var exp_chg = $(this).parent().find(".exp_chg").val();

		$.ajax({
			method: "post",
			url: "php/ud_exp.php",
			data: {exp_id:exp_id, exp_chg:exp_chg},
			success: function(){
				ld_exp();
				show_info("Pozícia premenovaná!");

				if(exp_id==$("#sh_exp_lt").val()){
					$("#sh_exp_lt").html(exp_chg);
				}
			}

		});
			}else{
			show_info("Zadajte správny formát!");
		}
	});

	/*=========================POP_UP_CONFIRM=========================*/

	$(document).on("mousedown",".cfm_pp",function(){
		hide_info();
		$(".mn_ctn").css("background","rgba(0,0,0,0)");
		$("main").on("mousedown",function(e){
			bind_crt_emp(e);
		});
		$(".ctd *").css("pointer-events", "auto");
	});

	$(document).on("mousedown",".can_pp",function(){
		hide_question();
		$(".mn_ctn").css("background","rgba(0,0,0,0)");
		$("main").on("mousedown",function(e){
			bind_crt_emp(e);
		});
		$(".ctd *").css("pointer-events", "auto");
	});

	/*=======================EMPLOYEE_VIEW_MENU==========================*/

	$(document).on("mousedown","#bk_emp_vw",function(){
		$(".sch_panel").animate({bottom:"+=800px"},600);
		$(".des_panel").delay(100).animate({bottom:"+=800px"},600);
		$(".emp_scr_lt").delay(100).fadeOut();
		$(".emp_vw_btns").animate({bottom:"-=800px"},600);

		setTimeout(function(){
			$("#app").load("php/admin_mn.php");
		},500);
	});

	$(document).on("mousedown","#sch_emp",function(){
		sch_emp();
		$("#emp_data").val("");
	});

	$(document).on("mousedown",".rem_emp",function(){
		var emp_id = $(this).val();
		show_question("Odstrániť zamestnanca?");
		$(document).on("mousedown",".con_pp",function(){
			hide_question();
			$.ajax({
				method:"post",
				url: "php/del_emp.php",
				data: {emp_id:emp_id},
				success: function(){
					ld_emp();
					show_info("Zamestnanec ostránený!");
				}
			});
		});
	});

	$(document).on("mousedown",".sh_emp_add_inf",function(){
		var emp_id = $(this).val();
		$(".emp_add_inf_mn").load("php/ld_emp_inf.php",{emp_id:emp_id},function(){
		show_emp_add_inf();
		});
	});

	$(document).on("mousedown",".can_add_inf",function(){
		hide_emp_add_inf();
	});


	/*=========================ATTENDANCE_VIEW_MENU==========================*/

	$(document).on("mousedown",".edit_atd",function(){

		var parent_item = $(this).parent().parent();

		if (edt_atd_dpd==false){
			hide_atd_lt_item(parent_item);
			show_edit_atd(parent_item);
		}else if (edt_atd_dpd==true){
			hide_edit_atd();
			show_atd_lt_item();
			hide_atd_lt_item(parent_item);
			show_edit_atd(parent_item);
		}
	});

	$(document).on("mousedown",".cfm_edit_atd",function(){
		if (edt_atd_ok==false){
			show_info("Zadajte správny formát!");			
		}else{
			var atd_id = $(this).val();
			var parent_item = $(this).parent();
			var check_in = parent_item.find(".check_in_ipt").val();
			var check_out = parent_item.find(".check_out_ipt").val();

			$.ajax({
				method: "post",
				url: "php/ud_atd.php",
				data: {atd_id:atd_id, check_in:check_in, check_out:check_out},
				success: function(){
					hide_edit_atd();
					show_atd_lt_item();

					show_info("Dochádzka upravená!");
				}
			});


			setTimeout(function(){
				ld_atd();
			},300);
		}
	});

	$(document).on("mousedown","#sch_atd",function(){
		sch_atd();
		$("#atd_data").val("");
	});


	$(document).on("mousedown",".rem_atd",function(){
		var atd_id = $(this).val();
		show_question("Naozaj chcete položku ostrániť?");
		$(document).on("mousedown",".con_pp",function(){
			$.ajax({
				method: "post",
				url: "php/del_atd.php",
				data: {atd_id:atd_id},
				success: function(){
					ld_atd();
					hide_question();
					show_info("Položka vymazaná!");
				}
			});
		});
	});





	$(document).on("mousedown","#bk_atd_mn",function(){
		$(".sch_panel").animate({bottom:"+=800px"},600);
		$(".des_panel").delay(100).animate({bottom:"+=800px"},600);
		$(".atd_scr_lt").delay(100).fadeOut();
		$(".emp_atd_btns").animate({bottom:"-=800px"},600);

		setTimeout(function(){
			$("#app").load("php/admin_mn.php");
		},500);
	});



});

/*=======================FUNCTIONS=========================*/

/*=========================ANIMATION=========================*/
function anim_log_in_e(){
	$('#name').animate({bottom:"+=700px"},600);
	$('#password').delay(100).animate({bottom:"+=700px"},600);
	$('.lgn_mn_btns').delay(100).animate({bottom:"-=700px"},600);
}

function anim_adm_mn(){
	$('#add_emp').animate({left:"-=1000px"},600);
	$('#emp_vw_mn').delay(200).animate({left:"-=1000px"},600);
	$('#emp_atd_mn').delay(200).animate({left:"+=1000px"},600);
	$('#calc').animate({left:"+=1000px"},600);
}

/*=======================POP_UP_FUNCTIONS=========================*/

//when pop up is visible ,all events are off !!!
function bind_crt_emp(e){
	var $target = $(e.target);

	if (exp_lt_dpd==true){
		if (!$target.is("#sh_exp_lt")){
			if (!$target.is(".exp_scr_lt")){
				/*	if (!$target.is(".list_button")){ */
				if (!$target.is(".rem_exp")){
					if (!$target.is(".edt_exp")){
						if (!$target.is(".exp_chg")){
							if (!$target.is(".cfm_edt_exp")){
								hide_exp_lt();
							}
						}
					}
				}
				/*	}*/
			}
		}
	}

	if (exp_mn_dpd==true){
		if (!$target.is("#sh_exp_mn")){
			if (!$target.is("#new_exp")){
				if (!$target.is("#crt_exp")){
					hide_exp_mn();
					exp_mn_dpd=false;
					$("#new_exp").val("");
				}
			}
		}
	}

	if (edt_exp_dpd==true){
		if(!$target.is(".exp_chg")){
			if(!$target.is(".cfm_pp")){
				if(!$target.is(".cfm_edt_exp")){
				hide_edit_exp();
				show_exp_info();
				edt_exp_dpd=false;
				}
			}
		}
	}

	if (edt_atd_dpd==true){
		if (!$target.is(".edt_atd")){
			if (!$target.is(".check_in_ipt")){
				if (!$target.is(".check_out_ipt")){
					hide_edit_atd();
					show_atd_lt_item();
				}
			}
		}
	}
}

function show_info(message){
	$(".pop_up").css('display','block');
	$(".info").css('display','block');
	$(".pp_msg").text(message);
	$(".mn_ctn").css("background","rgba(0,0,0,0.5)");
	$("main").off();
	$(".ctd *").css("pointer-events", "none");
}

function show_question(message){
	$(".pop_up").css('display','block');
	$(".question").css('display','block');
	$(".pp_msg").text(message);
	$(".mn_ctn").css("background","rgba(0,0,0,0.5)");
	$("main").off();
	$(".ctd *").css("pointer-events", "none");
}

function hide_info(){
	$(".pop_up").css('display','none');
	$(".info").css('display','none');
}

function hide_question(){
	$(".pop_up").css('display','none');
	$(".question").css('display','none');
}

/*=========================CREATE_EMPLOYEE_ELEMENTS_FUNCTIONS=========================*/

function show_exp_mn(){
	$(".exp_sli_mn").animate({top:"+=52px"},200);
	$(".exp_mn").css("z-index","1");
	hide_salary();
}

function hide_exp_mn(){
	$(".exp_sli_mn").animate({top:"-=52px"},200);
	$(".exp_mn").css("z-index","0");
	show_salary();
}

function show_exp_info(){
	$(".exp_info").css("z-index","1");
	$(".exp_info").animate({opacity:1},200);
}

function hide_edit_exp(){
	$(".edit_exp").css("z-index","0");
	$(".edit_exp").animate({opacity:0},{queue:false, duration:300});
}

function hide_exp_info(par){
	par.css("z-index","0");
	par.animate({opacity:0},200);
}

function show_edit_exp(par){
	par.parent().find(".edit_exp").animate({opacity:1},{queue:false, duration:300});
	par.parent().find(".edit_exp").css("z-index","1");
}

function show_edit_atd(parent_item){
	parent_item.find(".edit_atd_mn").css("z-index",0);
	parent_item.find(".edit_atd_mn").animate({opacity:1},{duration:300, queue:false});
	edt_atd_dpd=true;
}

function hide_edit_atd(){
	$(".edit_atd_mn").css("z-index",-1);
	$(".edit_atd_mn").animate({opacity:0},{duration:300, queue:false});
	edt_atd_dpd=false;
}

function show_atd_lt_item(){
	$(".atd_info").css("z-index",0);			
	$(".atd_info").animate({opacity:1},{duration:300, queue:false});	
}

function hide_atd_lt_item(parent_item){
	parent_item.find(".atd_info").css("z-index",-1);
	parent_item.find(".atd_info").animate({opacity:0},{duration:300, queue:false});	
}

function show_exp_lt(){
	var list_height = exp_scr_lt_height();
	$(".exp_lt").css("height","" + list_height + "px");
	$(".exp_lt").css("z-index","1");
	$(".exp_scr_lt").css("top","-" + list_height + "px");
	$(".exp_scr_lt").css("height","" + list_height + "px");
	$(".exp_scr_lt").animate({
		top: "+=" + list_height + "px"	
	},200);
	
	if (list_height==52){
		hide_salary();
	}else if (list_height >52){
		hide_salary();
		hide_st_date();
	}

	exp_lt_dpd=true;
}

function show_salary(){
	$("#salary").animate({opacity:1},{queue:false, duration:200});
	$("#salary").css("z-index","0");
}

function hide_salary(){
	$("#salary").animate({opacity:0},{queue:false, duration:200});
	$("#salary").css("z-index","-1");
}

function show_st_date(){
	$("#st_date").animate({opacity:1},200);
	$("#st_date").css("z-index","0");
}

function hide_st_date(){
	$("#st_date").animate({opacity:0},200);
	$("#st_date").css("z-index","-1");
}

function hide_exp_lt(){
	var lt_height = exp_scr_lt_height();
	$(".exp_lt").css("z-index","-1");
	$(".exp_scr_lt").animate({
		top: "-=" + lt_height + "px"
	},200);
	show_salary();
	show_st_date();
	exp_lt_dpd=false;
}

function exp_scr_lt_height(){
	var num_of_exp = $(".exp_scr_lt").find(".exp_lt_ele").length;
	var item_height = 52;
	var max_lt_height = 156;
	var lt_height = num_of_exp * item_height;
	if (lt_height > max_lt_height){
		lt_height=max_lt_height;
	}
	return lt_height;
}

function check_emp_num(){
	var max_emp_vis = 6;
	var new_width = "386px";
	var new_margin = "14px";
	num_of_emp=$(".emp_scr_lt").find('.emp_lt_item').length;
	if(num_of_emp> max_emp_vis){
		$('.emp_lt_name').css("width",new_width);
		$('.emp_lt_name').css("margin-left",new_margin);
	}
}

function check_exp_num(){
	var max_exp_vis = 3;
	var new_width = "232px";
	var new_widthi = "284px"
	var new_margin = "14px";
	var num_of_exp = $(".exp_scr_lt").find(".exp_lt_ele").length;
	if(num_of_exp > max_exp_vis){
		$('.exp_lt_btn').css("width",new_width);
		$('.exp_lt_btn').css("margin-left",new_margin);
		$('.exp_chg').css("width",new_widthi);
		$('.exp_chg').css("margin-left",new_margin);
	}
}

function check_atd_num(){
	var max_attendance_visible = 6;
	var new_width = "336px";
	var new_margin = "14px";
	num_of_attendance=$(".attendance_scroll_list").find('.attendance_list_item').length;
	if(num_of_attendance> max_attendance_visible){
		$('.attendance_list_name').css("width",new_width);
		$('.attendance_list_name').css("margin-left",new_margin);
	}
}

function remove_edit_expertise_value(){
	$('#edited_expertise').val("");
}

function set_shadow(ele){
	ele.css('-moz-box-shadow', 'inset 0 0 2px 1px red');
	ele.css('-webkit-box-shadow', 'inset 0 0 2px 1px red');
	ele.css('box-shadow', 'inset 0 0 2px 1px red');
}

function remove_shadow(ele){$("#show_hide_expertise_list").val(-1);
	$("#show_hide_expertise_list").text("Pozícia");
	ele.css('-moz-box-shadow', 'none');
	ele.css('-webkit-box-shadow', 'none');
	ele.css('box-shadow', 'none');
}

function res_sh_exp_lt(){
	$("#sh_exp_lt").val(-1);
	$("#sh_exp_lt").text("Pozícia");
}

/*=========================EMPLOYEE_VIEW============================*/

function show_emp_add_inf(){
	$(".emp_add_inf_mn").animate({opacity:1},200);
	$(".emp_add_inf_mn").css("z-index",1);
	$(".sch_panel").css("opacity",0);
	$(".des_panel").css("opacity",0);
	$(".emp_scr_lt").css("opacity",0);
	$(".emp_vw_btns").css("opacity",0);


}

function hide_emp_add_inf(){
	$(".emp_add_inf_mn").animate({opacity:0},200);
	$(".emp_add_inf_mn").css("z-index",-1);
	$(".sch_panel").css("opacity",1);
	$(".des_panel").css("opacity",1);
	$(".emp_scr_lt").css("opacity",1);
	$(".emp_vw_btns").css("opacity",1);



}

/*==========REAL_TIME_INPUT_VALUE_CHECKING==========*/

function chk_timestamp(ele){
	var ess = /^(([1-9]|1[0-9]|2[0-9]|30|31).([1-9]|1[0-2]).\d{4}) ((0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]))$/;
	var val = ele.val();
	var date = val.split(" ");
	if (val.match(ess)){
		if (chk_date_num(date[0])==true){				
			edt_atd_ok=true;
			return true;
		}else{
			edt_atd_ok=false;
			return false;
		}
	}else {
		edt_atd_ok = false;
		return false;
	}
}

function chk_date_num(date_str){
	var par = date_str.split(".");
	if ((par[0] == "30" || par[0]=="31") && par[1]=="2"){
		return false;
	}else if (par[0] == "31" && (par[1]=="4" || par[1]=="6" || par[1]=="8" || par[1]=="10")){
		return false;
	}
	else return true;
}

function chk_crt_emp_ipts(){
	if (card_id_ok && emp_nm_ok && date_of_bh_ok && salary_ok && st_date_ok && exp_ok && city_ok && street_ok && stt_num_ok && add_info_ok,phone_num_ok){
		return true;
	}
	return false;
}

function chk_exp(){

	if ($("#sh_exp_lt").val()!=-1){
		exp_ok=true;
		return true; 
	}else{
		exp_ok=false;
	}
	return false;
}

function chk_edt_exp(){
	var ess=/^[a-z0-9]{1,20}$/;
	var val=$(".exp_chg").val();

	if (val.match(ess)){
		if (val[0]!=' '){
			edt_exp_ok=true;
			return true;
		}
	}else{
		edt_exp_ok=false;
	}
	return false;
}

function chk_new_exp(){
	var ess=/^[a-z0-9]{1,20}$/;
	var val=$("#new_exp").val();

	if (val.match(ess)){
		if (val[0]!=' '){
			crt_exp_ok=true;
			return true;
		}
	}else{
		crt_exp_ok=false;
	}
	return false;
}

function chk_card_id(){
	var ess=/^\d{10}$/;
	var val=$("#card_id").val();
	if (val.match(ess)){
		card_id_ok=true;
		return true;
	}else{
		card_id_ok=false;
	}
	return false;
}

function chk_emp_nm(){
	var ess=/^[a-zA-ZÀ-Ž\s]{1,30}$/;
	var val=$("#emp_nm").val();
	if (val.match(ess)){
		//checking for name starting with space
		if (val[0]!=' '){
			emp_nm_ok=true;
			return true;
		}
	}
	else {
		emp_nm_ok=false;
	}
	return false;
}

function chk_date_of_bh(){
	var age = 16;
	var date = new Date();
	var year = date.getFullYear() - age;
	var ess = /^([1-9]|1[0-9]|2[0-9]|30|31).([1-9]|1[0-2]).\d{4}$/;
	var val = $("#date_of_bh").val();
	var int_year = parseInt(val.slice(-4));

	if (val.match(ess)){
		if (int_year <= 2003 && int_year >=1900 ){
			if(chk_date_num(val)==true){
				date_of_bh_ok=true;
				return true;
			}
		}
	}
	else {
		date_of_bh_ok=false;
	}
	return false;
}

function chk_salary(){
	var ess=/^\d{1,5}$/;
	var val=$("#salary").val();
	if (val.match(ess)){
		salary_ok=true;
		return true;
	}
	else {
		salary_ok=false;
	}
	return false;
}

function chk_st_date(){
	var date = new Date();
	var year= date.getFullYear();
	var str= "^([1-9]|1[0-9]|2[0-9]|30|31).([1-9]|1[0-2]).(" + year + ")$";
	var ess=new RegExp(str);
	var val=$("#st_date").val();
	if (val.match(ess)){
		if (chk_date_num(val)==true){
			st_date_ok=true;
			return true;
		}
	}
	else {
		st_date_ok=false;
	}
	return false;
}

function chk_city(){
	var ess=/^[a-zA-ZÀ-Ž\s]{1,30}$/;
	var val=$("#city").val();
	if (val.match(ess)){
		//checking for city starting with space
		if (val[0]!=' '){
			city_ok=true;
			return true;
		}
	}
	else {
		city_ok=false;
	}
	return false;	
}

function chk_street(){
	var ess=/^[0-9a-zA-ZÀ-Ž\s\.\/\\\-\,]{1,30}$/;
	var val=$("#street").val();
	if (val.match(ess)){
		//checking for street starting with space
		if (val[0]!=' '){
			street_ok=true;
			return true;
		}
	}
	else {
		street_ok=false;
	}
	return false;	
}

function chk_stt_num(){
	var ess=/^\d{5}$/;
	var val=$("#stt_num").val();
	if (val.match(ess)){
		stt_num_ok=true;
		return true;
	}
	else {
		stt_num_ok=false;
	}
	return false;	
}

function chk_add_info(){
	var ess=/^[.\S\s]{1,255}$/;
	var val=$("#add_info").val();
	if (val.match(ess)){
		add_info_ok=true;
		return true;
	}
	else {
		add_info_ok=false;
	}
	return false;	
}

function chk_phone_num(){
	var ess=/^\+[0-9]{12}$/;
	var val=$("#phone_num").val();
	if (val.match(ess)){
		if (val[0]!=' '){
		phone_num_ok=true;
		return true;
	}
	
	}
	else {
		phone_num_ok=false;
	}
	return false;	
}




/*=========================CRUD_FUNCTIONS_DATABASE=======================*/

function ld_emp_nm(){
	var usr_id = $("#usr_id").val();
	$('#usr_nm').load("php/ld_emp_nm.php",{usr_id:usr_id});
}

function ld_emp(){
	$(".emp_scr_lt").load("php/ld_emp.php",function(){
		check_emp_num();
	});
}

function ld_atd(){
	$(".atd_scr_lt").load("php/ld_atd.php",function(){
		check_atd_num();
	});
}

function ld_exp(){
	//loading expertise data from database
	$(".exp_scr_lt").load("php/ld_exp.php",function(){
		check_exp_num();
		
	});
}

function sch_emp(){
	var sch_data = $("#emp_data").val();
	$(".emp_scr_lt").load("php/sch_emp.php",{sch_data:sch_data},function(){
		check_emp_num();
	});
}

function sch_atd(){
	var sch_data = $("#atd_data").val();
	$(".atd_scr_lt").load("php/sch_atd.php",{sch_data:sch_data},function(){
		check_atd_num();
	});
}


function clear_inputs(){
	$("#name").val("");
	$("#password").val("");
}

/*=========================DATE_AND_TIME_FUNCTIONS=========================*/

function get_curr_time(){
	var now = new Date();
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	hh = hh < 10 ? '0' + hh : hh; 
	mm = mm < 10 ? '0' + mm : mm;
	ss = ss < 10 ? '0' + ss : ss;
	return hh + ":" + mm + ":"+ ss;
}

function get_curr_date(){
	var date = new Date();
	var day_name = get_curr_day(date);
	var month_name = get_curr_month(date);
	var day_number = date.getDate();
	return day_name + " " + day_number + "." + month_name; 
}

function get_curr_month(date){		
	var month=date.getMonth();
	var month_name="";
	if (month==0){
		month_name="januára";
	}else if (month==1){
		month_name="februára";
	}else if (month==2){
		month_name="marca";
	}else if (month==3){
		month_name="apríla";
	}else if (month==4){
		month_name="mája";
	}else if (month==5){
		month_name="júna";
	}else if (month==6){
		month_name="júla";
	}else if (month==7){
		month_name="augusta";
	}else if (month==8){
		month_name="septembra";
	}else if (month==9){
		month_name="októbra";
	}else if (month==10){
		month_name="novembra";
	}else if (month==11){
		month_name="decembra";
	}
	return month_name;
}

function get_curr_day(date){
	var day=date.getDay();
	var day_name="";
	if (day==0){
		day_name="nedeľa";
	}else if (day==1){
		day_name="pondelok";
	}else if (day==2){
		day_name="utorok";
	}else if (day==3){
		day_name="streda";
	}else if (day==4){
		day_name="štvrtok";
	}else if (day==5){
		day_name="piatok";
	}else if (day==6){
		day_name="sobota";
	}
	return day_name;
}
