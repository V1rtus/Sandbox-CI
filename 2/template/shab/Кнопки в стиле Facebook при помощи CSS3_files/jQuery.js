teasernet_time_start2 = new Date().getTime();
var cur_cnt = window.location.href.match(/r_c=(\d+)/i);
reload_count = (cur_cnt != null ? parseInt(cur_cnt[1]) + 1 : 0);
if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (re.test(prop)) {
				prop = prop.replace(re, function() {
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		};
		return this;
	}
}
function setBlock(d) {
	if (typeof d != 'object') {
		document.getElementById('tblock').innerHTML = d;
		return;
	}
	if (!d['t'].length) {
		document.getElementById('tblock').innerHTML = '';
		return;
	}
	var v = getVars();
	if(typeof alt_t=='undefined' || alt_t==0)
		d['alt']=0;
	if(typeof link_t=='undefined' || link_t==0)
		d['lt'] = '';
	var h = v['h'] ? escape(v['h']) : 'echo.teasernet.com';
	var a = 0;
	var x = parseInt(v['x']);
	var y = parseInt(v['y']);
	var w = Math.floor(100 / x);
	var s = '<table class="block"><tr id="tr0">';
	var k = 0;
	var div_h = 0;
	var alt_h = 0;
	if(d['t'].length<x * y)
	{
		var delta = x * y - d['t'].length;
		var true_length = d['t'].length;
		for(var o=0;o<delta;o++)
		{
			d['t'][d['t'].length] = d['t'][Math.floor(true_length * Math.random())];
		}
	}
	for ( var i = 0; i < x * y; i++, k++) {
		if(d['alt']>0)
		{
			if(d['t'][k]['c'].length>33)
				d['t'][k]['c'] = (d['t'][k]['c']).substring(0,30) + '...';
			if(d['t'][k]['t'].length && d['t'][k]['t'].length>73)
				d['t'][k]['t'] = (d['t'][k]['t']).substring(0,70) + '...';
		}
		if(d['alt']>0 && typeof d['t'][k]['t'].length!='undefined' && d['t'][k]['t'].length)
		{
			div_h = parseInt(d['t'][k]['c'].length*height/(d['t'][k]['t'].length+d['t'][k]['c'].length));
			alt_h = parseInt(d['t'][k]['t'].length*height/(d['t'][k]['t'].length+d['t'][k]['c'].length));
			if(div_h<19)
			{
				alt_h = alt_h-(19-div_h);
				div_h = 19;
			}
		}
		else
		{
			div_h = 0;
			alt_h = 0;
		}
		if (!d['t'][k])
			k = 0;
		if (a && a % x === 0)
			s += '</tr><tr id="tr' + Math.floor(a / x) + '">';
		a++;
		var l = 'http://' + h + '/info.php?c=' + encodeURIComponent(d['c'])
				+ '&ts=' + d['t'][k]['i']
				+ (d['t'][k]['p'] ? '&p=' + d['t'][k]['p'] : '');
		l = '<a href="'
				+ l
				+ '" target="_blank" style="display:block" title="'
				+ d['t'][k]['t']
				+ '" '
				+ 'onmouseover="status=\''
				+ d['t'][k]['s']
				+ '/\';return true" onmouseout="status=\'\';return true">%CONTENT%</a>';	
		var t = '<td class="text" style="' + (mode !=1 ? 'vertical-align: middle' : '') + '"><div style="display:block;'+ ( d['alt']>0 && div_h ? 'height:'+div_h+'px;' : '')+'"'
				+ (mode == 1 ? ' align="center"' : '') + '>'
				+ l.replace('%CONTENT%', d['t'][k]['c']) + '</div>';
		if(d['alt']>0)
			t += '<div class="new_alt" style="'+ ( alt_h ? 'height:'+alt_h+'px;' : '')+'">'+(d['t'][k]['t'].length ? d['t'][k]['t'] : '')+'</div>';
		t +='</td>';
		var g = '<td class="img"><div style="display:block"'
				+ (mode == 1 ? ' align="center"' : '')
				+ '>'
				+ l.replace('%CONTENT%', '<img src="' + d['t'][k]['g']
						+ '" alt="' + d['t'][k]['t'] + '" title="'
						+ d['t'][k]['t'] + '">') + '</div></td>';
		s += '<td style="width: '
				+ w
				+ '%;" class="td"><table class="teaser"><tr>';
		if (mode == 1)
			s += g + '</tr><tr>' + t;
		else if (mode == 3)
			s += t + '</tr><tr>' + g;
		else if (mode == 2)
			s +=  t + g;
		else
			s += g + t;
		s += '</tr></table></td>';
	}
	while (a % x) {
		s += '<td>&nbsp;</td>';
		a++;
	}
	s += '</tr></table>';
	if(d['lt']!='')
		s += '<span style="padding: 2px; float: right;"><a href="'+d['l']+'" target="_blank" class="new">'+d['lt']+'</span>';
	document.getElementById('tblock').innerHTML = s;
	bgStyle("block", "blockh");
	bgStyle("td", "th");
	if (width_min < width_max)
		zoom();
	if(d['alt']>0)
	{
		var min_font_size = 999;
		var min_font_size_alt = 999;
		if(!div_h || !alt_h)
			div_h = alt_h = height/2;
		min_font_size = fitFonts(font, div_h, 'text',d['alt']);
		min_font_size_alt = fitFonts(alt_font, alt_h, 'new_alt',d['alt']);
		if(min_font_size==0 || min_font_size==999)
			min_font_size=8;
		if(min_font_size_alt==0 || min_font_size_alt==999)
			min_font_size_alt=8;
	}
	else 
		fitFonts(font, height, 'text',d['alt']);
	if(d['alt'])
	{
		fix_height();
		fix_fonts(min_font_size,min_font_size_alt);
	}
	fitPadding(height,d['alt']);
//	if(typeof window.teasernet_time_start2!="undefined")
//	{
//		var teasernet_time_step2=new Date().getTime()-teasernet_time_start2;
//		var img2 = document.createElement("IMG");
//		img2.setAttribute("src", "http://stats.internet-yadro.com/triger.jpg?s=2&t="+teasernet_time_step2);
//	}
}

function fix_fonts(font_os,font_alt)
{
	var fSize = 0;
	var n = document.getElementsByTagName('*');
	for ( var i = 0; i < n.length; i++) {
		if (!(n[i].className == 'text' || n[i].className == 'new_alt') || !n[i].style)
			continue;
		fSize = (n[i].className == 'text' ? font_os : font_alt);
		n[i].style.fontSize = fSize + 'px';
		if(typeof n[i].childNodes[0]!='undefined')
		{
			if(typeof n[i].childNodes[0].childNodes[0]!='undefined')
				if(typeof n[i].childNodes[0].childNodes[0].style!='undefined')
					n[i].childNodes[0].childNodes[0].style.fontSize = fSize + 'px';
		}
		else
			n[i].fontSize = fSize + 'px';
	}
}

function fix_height()
{
	var n = document.getElementsByTagName('*');
	var tmp = 0;
	for ( var i = 0; i < n.length; i++) {
		if (n[i].className != 'text' || !n[i].style)
			continue;
		n[i].style.height = height+'px';
		n[i].childNodes[0].style.height='';
		tmp = parseInt(getHeight(n[i].childNodes[0].childNodes[0]));
		if(tmp>height)
			n[i].childNodes[0].style.height=height+'px';
		if(typeof n[i].childNodes[1]!='undefined' && height > tmp)
			n[i].childNodes[1].style.height=(height-tmp)+'px';
	}
}

function getVars() {
	var v = {};
	var query = window.location.search.split('?')[1];
	if (!query)
		return false;
	var get = query.split('&');
	for ( var i = 0; i < get.length; i++) {
		var pair = get[i].split('=');
		v[pair[0]] = unescape(pair[1]);
	}
	return v;
}
function bgStyle(out, over) {
	var n = document.getElementsByTagName('*');
	for ( var i = 0; i < n.length; i++) {
		if (n[i].className != out)
			continue;
		n[i].onmouseover = function() {
			this.className = over;
		};
		n[i].onmouseout = function() {
			this.className = out;
		};
	}
}
function getHeight(el) {
	var hs = 'left:-0px;top:-0px;height:auto;width:' + el.clientWidth + 'px;position:absolute;';
	var clone = document.createElement('div');
	document.all ? clone.style.setAttribute('cssText', hs) : clone
			.setAttribute('style', hs);
	if(typeof el.childNodes[0]!='undefined')
		if(typeof el.childNodes[0].childNodes[0]!='undefined')
			el = el.childNodes[0].childNodes[0];
	clone.style.fontSize = getStyle(el, 'font-size');
	clone.style.fontWeight = getStyle(el, 'font-weight');
	clone.style.fontFamily = getStyle(el, 'font-family');
	clone.innerHTML = el.innerHTML;
	document.body.appendChild(clone);
	var height = clone.clientHeight;
	document.body.removeChild(clone);
	return height;
}
function getStyle(el, prop) {
	var y = window.getComputedStyle(el, null).getPropertyValue(prop);
	return y;
}
function fitFont(el, fSize, h,type,alt_text) {
	var as = getHeight(el);
	if(type=='text' && alt_text==1)
		h=parseInt(el.childNodes[0].style.height) ? parseInt(el.childNodes[0].style.height) : height;
	if(type=='new_alt' && alt_text==1)
		h=parseInt(el.style.height);
	while (as > h) {
		if (fSize-- < 9)
			break;
		el.style.fontSize = fSize + 'px';
		if(typeof el.childNodes[0]!='undefined')
		{
			if(typeof el.childNodes[0].childNodes[0]!='undefined')
				if(typeof el.childNodes[0].childNodes[0].style!='undefined')
					el.childNodes[0].childNodes[0].style.fontSize = fSize + 'px';
		}
		else
			el.fontSize = fSize + 'px'; 
		as = getHeight(el);
	}
	
	if(type=='text' && alt_text==1 && as > h && typeof el.childNodes[0]!='undefined')
	{
		el.childNodes[0].style.height = as + 'px';
		if(mode != 1 && typeof el.childNodes[1]!='undefined')
			el.childNodes[1].style.height = (height-as) + 'px';
	}
	if (as < h && mode == 1 && !alt_text) {
		el.style.height = as + 'px';
		if(typeof el.childNodes[0]!='undefined')
		{
			if(typeof el.childNodes[0].style!='undefined')
				el.childNodes[0].style.height = as + 'px';
		}
	}
	return fSize;
}
function fitFonts(fSize, h, type,alt_text) {
	var n = document.getElementsByTagName('*');
	var min_font_size = 999;
	var tmp = 0;
	for ( var i = 0; i < n.length; i++) {
		if (n[i].className != type || !n[i].style)
			continue;
		tmp = fitFont(n[i], fSize, h,type,alt_text);
		if(tmp<min_font_size && tmp>0)
			min_font_size = tmp;
	}
	return min_font_size;
}
function fitPadding(h,alt) {
	if (mode != 1 || alt)
		return;
	var n = document.getElementsByTagName('*');
	var rows = [];
	var k = 0;
	for ( var i = 0, j = 0; i < n.length; i++) {
		if (n[i].className != 'text' || !n[i].style)
			continue;
		if (j % cols === 0)
			k = j / cols;
		if (!rows[k])
			rows[k] = 1;
		var as = getHeight(n[i]);
		if (as > rows[k])
			rows[k] = Math.min(as, h);
		j++;
	}

	for ( var i = 0; i < rows.length; i++) {
		if (rows[i] >= h || !document.getElementById('tr' + i))
			continue;
		var c = document.getElementById('tr' + i).childNodes;
		var f = h - rows[i] + 6;
		var pt = Math.floor(f / 2);
		var p = pt + 'px 1px ' + (f - pt) + 'px 1px';
		for ( var k in c) {
			if (!c[k].className
					|| (c[k].className != 'td' && c[k].className != 'th'))
				continue;
			c[k].style.padding = p;
		}
	}
}
function reload_show() {
	var imgs_cnt = document.getElementsByTagName("img").length;
	if (imgs_cnt < 1 && reload_count < 3) {
		window.location.href = (reload_count != 0 ? window.location.href
				.replace(/r_c=(\d+)/i, 'r_c=' + reload_count)
				: window.location.href + '&r_c=' + reload_count);
		reload_count = reload_count + 1;
//		var img3 = document.createElement("IMG");
//		img3.setAttribute("src", "http://stats.internet-yadro.com/picture.php?s=3");
	};
};
function init(src) {
	setTimeout("reload_show()", 5000);
	var d = document.getElementsByTagName('head')[0];
	var js = document.createElement('script');
	var v = getVars();
	var h = v['h'] ? escape(v['h']) : 'echo.teasernet.com';
	js.src = 'http://' + h + '/rssfeed.php?b=' + parseInt(v['b']) + '&c='
			+ encodeURIComponent(v['c']) + '&h=' + parseInt(v['x']) + '&v='
			+ parseInt(v['y']) + '&ref=' + encodeURIComponent(v['ref']) + '&f='
			+ parseInt(v['s']) + '&s=' + width_min + '&'
			+ Math.round(Math.random() * 100000);
	d.appendChild(js);
	var isOperaMini = (navigator.userAgent.indexOf('Opera Mini') != -1);
    if (isOperaMini)
	{
		var sheet = document.styleSheets[document.styleSheets.length - 1];
		var newRulePosition = sheet.cssRules.length;
		sheet.insertRule("img {display: inline}", newRulePosition);
	}
}