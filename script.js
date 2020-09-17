var is_debug = true;

function load_module(url)
{    
    var body = $("body")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
	script.src = url;
    body.insertBefore(script, body.childNodes[0]);
}

load_module("./modules/window.js");

var time_vue = new Vue({
	el: "#time",
	data: {
		time: "09:12:32",
	},
	methods: {
		get_time: function () {
			var now = new Date();
			var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
			return time;
		}
	}
});

function menu_hide() {
	$("#menu").css("display", "none");
}

function menu_show() {
	$("#menu").css("display", "flex");
}

var update_clock = setInterval(function () {
	time_vue.$forceUpdate();
}, 1000);

$("#about-menu-item").click(function () {
	menu_hide();
	var onload = function (app) {
		$(`#about${app.identifer}-ok-btn`).click(function () {
			window_close(app.window_id);
		});
	};
	window_create_from_url("desktop",
		"about",
		"information",
		"dialogue",
		"About",
		"250px",
		"245px",
		undefined,
		undefined,
		"apps/about.html",
		onload,
		{ custom_data: "hello" }
	);
});

$("#settings-menu-item").click(function () {
	menu_hide();
	window_create("desktop", "settings", "cog", "dialogue", "Settings", "700px", "500px", undefined, undefined, "<center>Work in progress</center>");
});

$("#calc-menu-item").click(function () {
	menu_hide();
	window_create_from_url("desktop", "calc", "calculator-variant", "standard", "Calculator", "260px", "323px", undefined, undefined, "apps/calc.html");
});

$("#applications_btn").click(function () {
	menu_show();
});

if (!is_debug) {
	// Extra spice
	$(window).contextmenu(function () {
		return false;
	});
	$("body").css("overflow", "hidden");
}

$(window).click(function () {
	menu_hide();
});

$('#applications_btn').click(function (event) {
	event.stopPropagation();
});

$('#menu').click(function (event) {
	event.stopPropagation();
});
