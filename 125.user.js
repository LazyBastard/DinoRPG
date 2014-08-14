// ==UserScript==
// @name        DinoRPG Faster
// @namespace   e78e44fc24cf93fab2271d8996cfa6fa
// @description Making DinoRPG faster
// @include     http://en.dinorpg.com/*
// @include     http://www.dinorpg.com/*
// @include     http://es.dinorpg.com/*
// @include     http://www.dinorpg.de/*
// @version     1.99
// @author      LazyBastard (based on sunn0's script)
// @updateURL   https://monkeyguts.com/125.meta.js?c
// @downloadURL https://monkeyguts.com/125.user.js?c
// ==/UserScript==

// Create array contains function
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

/* Show answers directly */
if(document.getElementById("answers")){
    document.getElementById("answers").style.display = 'block';
}

/* Hide View Image */
var views = document.getElementsByClassName("view");
if(views.length){
    views[0].style.display = "none";
}

/* Hide notifications */
var notification = document.getElementById( "notification" );
if ( notification )
{
	document.body.removeChild( notification );
}
/* section for status items - needed for multiple actions below */
var centerContent = document.getElementById('centerContent');

/* Water charm script */

var baofanaction = document.getElementById("act_dialog_wcharm");

if(baofanaction && baofanaction.id) {
   var wnode=baofanaction.cloneNode(true);
   wnode.id = "act_dialog_wcharm2";
    wnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Water charm\n		";
    var btr = wnode.children[0].children[0];
    var onclick =  btr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/wcharm/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        btr.setAttribute("onClick", "");
        btr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Bao's Fan</h1> <div class=\"content\">You can get a water charm with this action</div></div></div>',null)")
        btr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                btr.style.cursor = "wait";
                var tds = btr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = btr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/wcharm?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Uh... Yes, I suppose!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=ok;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Wow, that is impressive!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=wah;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Ok!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=yes;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Did you mean spiritual?";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=spirit;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Have to go!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=thanks;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=map';
            }, 
            false
        );
        btr.children[0].children[0].setAttribute("src","/img/icons/elem_2.gif");
    }
   baofanaction.parentNode.appendChild(wnode); 
    
/* Focus @ Bao Bob script */
/* You won't start focussing until you've got the korgon fins from Diane Korgsey */
   var focusaction = document.getElementById("act_dialog_bob");
   var cnode=focusaction.cloneNode(true);
   cnode.id = "act_dialog_bob2";
   cnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Focus!\n		";
   var ctr = cnode.children[0].children[0];
   var onclick =  ctr.getAttribute("onClick");
   var re = /\/(\d+)\/act\/dialog\/bob/.exec(onclick);
   if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        ctr.setAttribute("onClick", "");
        ctr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Bao Bob</h1> <div class=\"content\">You can start focussing with this action</div></div></div>',null)")
        ctr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                ctr.style.cursor = "wait";
                var tds = ctr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = ctr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/bob?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "I've got a question for you";
                res = performAction(dinoId, 'act/dialog/bob?goto=question;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "What about my question?";
                res = performAction(dinoId, 'act/dialog/bob?goto=quest3;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "Where?";
                res = performAction(dinoId, 'act/dialog/bob?goto=where;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "What do I need to do?";
                res = performAction(dinoId, 'act/dialog/bob?goto=how;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "I want my dinoz to focus!";
                res = performAction(dinoId, 'act/dialog/bob?goto=concen;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "Ok";
                res = performAction(dinoId, 'act/dialog/bob?goto=ok;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "Focusing";
                //res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId;
            }, 
            false
        );
        ctr.children[0].children[0].setAttribute("src","/img/icons/act_default.gif");
    }
    focusaction.parentNode.appendChild(cnode); 

}

/* Fire charm script */
// Won't give you charm unless you unlocked it at the Venerable
var shamanaction = document.getElementById("act_dialog_shaman");

if(shamanaction && shamanaction.id) {
   var fnode=shamanaction.cloneNode(true);
   fnode.id = "act_dialog_shaman2";
    fnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Fire charm\n		";
    var htr = fnode.children[0].children[0];
    var onclick =  htr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/shaman/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        htr.setAttribute("onClick", "");
        htr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Soft Shaman</h1> <div class=\"content\">You can get a fire charm with this action</div></div></div>',null)")
        htr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                htr.style.cursor = "wait";
                var tds = htr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = htr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/shaman?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Someone told me...";
                res = performAction(dinoId, 'act/dialog/shaman?goto=charm;sk=' + userId, 'dino/' + dinoId + '/act/dialog/shaman');
                label.innerHTML = "Accept the charm";
                res = performAction(dinoId, 'act/dialog/shaman?goto=boost;sk=' + userId, 'dino/' + dinoId + '/act/dialog/shaman');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=map';
            }, 
            false
        );
        htr.children[0].children[0].setAttribute("src","/img/icons/elem_0.gif");
    }
   shamanaction.parentNode.appendChild(fnode); 
}

/* Shovel automation */
var mineaction = document.getElementById("act_dialog_mine");

if(mineaction && mineaction.id && (centerContent.childNodes[1].childNodes[17].innerHTML.indexOf('Broken Shovel') > 0 || centerContent.childNodes[1].childNodes[17].innerHTML.indexOf('Shovel') < 0)) {
   var mnode=mineaction.cloneNode(true);
   mnode.id = "act_dialog_mine2";
    mnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Get/Repair Shovel\n		";
    var itr = mnode.children[0].children[0];
    var onclick =  itr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/mine/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        itr.setAttribute("onClick", "");
        itr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Forger</h1> <div class=\"content\">You can get a free shovel repair with this action</div></div></div>',null)")
        itr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                itr.style.cursor = "wait";
                var tds = itr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = itr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/mine?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Yes";
                res = performAction(dinoId, 'act/dialog/mine?goto=repair;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mine');
                res = performAction(dinoId, 'act/dialog/mine?goto=yes;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mine');
                label.innerHTML = "Thanks";
                res = performAction(dinoId, 'act/dialog/mine?goto=thanks;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mine');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=map';
            }, 
            false
        );
        itr.children[0].children[0].setAttribute("src","/img/icons/act_dig.gif");
    }
   mineaction.parentNode.appendChild(mnode); 
}

/* Forger automation */
var forgeraction = document.getElementById("act_dialog_forgeron");

if(forgeraction && forgeraction.id && centerContent.childNodes[1].childNodes[17].innerHTML.indexOf('Broken Shovel') > 0 ) {
   var bnode=forgeraction.cloneNode(true);
   bnode.id = "act_dialog_forgeron2";
    bnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Repair Shovel\n		";
    var btr = bnode.children[0].children[0];
    var onclick =  btr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/forgeron/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        btr.setAttribute("onClick", "");
        btr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Forger</h1> <div class=\"content\">This repair action costs 100 <img src=\"http://en.dinorpg.com/img/forum/smiley/s_gold.gif\"></div></div></div>',null)")
        btr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                btr.style.cursor = "wait";
                var tds = btr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = btr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/forgeron?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Could you please repair my shovel?";
                res = performAction(dinoId, 'act/dialog/forgeron?goto=repair;sk=' + userId, 'dino/' + dinoId + '/act/dialog/forgeron');
                label.innerHTML = "Of course I will Ma'am!";
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=map';
            }, 
            false
        );
        btr.children[0].children[0].setAttribute("src","/img/icons/act_dig.gif");
    }
   forgeraction.parentNode.appendChild(bnode); 
}


/* Merguez automation */

var merguezaction = document.getElementById("act_dialog_merguez");

if(merguezaction && merguezaction.id) {
    var gnode=merguezaction.cloneNode(true);
    gnode.id = "act_dialog_merguez2";
    gnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Get Merquez\n		";
    //var trs = merguezaction.getElementsByTagName("tr");
    var mtr = gnode.children[0].children[0];
    var onclick =  mtr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/merguez/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        mtr.setAttribute("onClick", "");
        mtr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Forger</h1> <div class=\"content\">You can get a 5 fatty merquez with this action</div></div></div>',null)")
        mtr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                mtr.style.cursor = "wait";
                var tds = mtr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = mtr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/merguez', 'dino/' + dinoId);
                label.innerHTML = "Ah!";
                res = performAction(dinoId, 'act/dialog/merguez?goto=ah;sk=' + userId, 'dino/' + dinoId + '/act/dialog/merguez');
                label.innerHTML = "Ok!";
                res = performAction(dinoId, 'act/dialog/merguez?goto=ok;sk=' + userId, 'dino/' + dinoId + '/act/dialog/merguez');
                label.innerHTML = "Thanks!";
                res = performAction(dinoId, 'act/dialog/merguez?goto=thanks;sk=' + userId, 'dino/' + dinoId + '/act/dialog/merguez');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=inv';
            }, 
            false
        );
        mtr.children[0].children[0].setAttribute("src","/img/icons/obj_mergz.gif");
    }
   merguezaction.parentNode.appendChild(gnode); 
}
    
/* Double skill script */
// Won't give you double skill unless you've actually unlocked it

var madamxaction = document.getElementById("act_dialog_mmex");
if(madamxaction && madamxaction.id) {
   var xnode=madamxaction.cloneNode(true);
   xnode.id = "act_dialog_mmex2";
    xnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Double skill\n		";
    var xtr = xnode.children[0].children[0];
    var onclick =  xtr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/mmex/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        xtr.setAttribute("onClick", "");
        xtr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Forger</h1> <div class=\"content\">You can unlock double skill with this action</div></div></div>',null)")
        xtr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                xtr.style.cursor = "wait";
                var tds = xtr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = xtr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!"; 
                var res = performAction(dinoId, 'act/dialog/mmex?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Talk to her";
                res = performAction(dinoId, 'act/dialog/mmex?goto=talk;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "...";
                res = performAction(dinoId, 'act/dialog/mmex?goto=talk2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "But who are you?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=question;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "So who are you?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=question2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "Oh?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=double;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "Yes!";
                res = performAction(dinoId, 'act/dialog/mmex?goto=double2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "!!!";
                res = performAction(dinoId, 'act/dialog/mmex?goto=double3;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "How do I learn it?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=learn;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "Huh???";
                if(res.indexOf('goto=learn1')>-1) { res = performAction(dinoId, 'act/dialog/mmex?goto=learn1;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex'); }
                if(res.indexOf('goto=learn2')>-1) { res = performAction(dinoId, 'act/dialog/mmex?goto=learn2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex'); }
                if(res.indexOf('goto=learn3')>-1) { res = performAction(dinoId, 'act/dialog/mmex?goto=learn3;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex'); }
                if(res.indexOf('goto=learn4')>-1) { res = performAction(dinoId, 'act/dialog/mmex?goto=learn4;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex'); }
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=details';
            }, 
            false
        );
        xtr.children[0].children[0].setAttribute("src","/img/icons/elem_5.gif");
    }
   madamxaction.parentNode.appendChild(xnode); 
}

/* To Nimbao script */
// Will get you to Nimboa from Klutz's workshop without fail

var klutzaction = document.getElementById("act_dialog_broc__2");
if(klutzaction && klutzaction.id) {
   var knode=klutzaction.cloneNode(true);
   knode.id = "act_dialog_broc__3";
    knode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Go to Nimbao!\n		";
    var ktr = knode.children[0].children[0];
    var onclick =  ktr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/broc__2/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        ktr.setAttribute("onClick", "");
        ktr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Forger</h1> <div class=\"content\">You can get to Nimbao with this action</div></div></div>',null)")
        ktr.addEventListener("click", function(){
               if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
               }
               ktr.style.cursor = "wait";
               var tds = ktr.getElementsByTagName("td");
               for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
               }
               var label = ktr.getElementsByClassName("label")[0];
               label.innerHTML = "Clicked!" ; 
             var correctRoute = 0;
             while (correctRoute == 0) {
                var res = performAction(dinoId, 'act/dialog/broc__2?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Could you take us to Nimbao?";
                res = performAction(dinoId, 'act/dialog/broc__2?goto=voyage2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/broc__2');
                if(res.indexOf('goto=depart_5')>-1) { correctRoute = 1 }
                if(correctRoute != 1) {
                   label.innerHTML = "Wrong route!";
                   res = performAction(dinoId, 'act/dialog/broc__2?goto=noroute;sk=' + userId, 'dino/' + dinoId + '/act/dialog/broc__2');
                   res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                }
             }
//               res = performAction(dinoId, 'act/dialog/broc__2?goto=depart_5;sk=' + userId, 'dino/' + dinoId + '/act/dialog/broc__2');
            
               //document.location = '/dino/' + dinoId + '/setTab?t=map';
               label.innerHTML = "Nimbao here we come!";
               document.location = '/dino/' + dinoId + '/act/dialog/broc__2?goto=depart_5;sk=' + userId;
            }, 
            false
        );
        ktr.children[0].children[0].setAttribute("src","/img/icons/elem_4.gif");
    }
   klutzaction.parentNode.appendChild(knode); 
}

/* To Skully missionslist */
// Will open Skully's missionlist without you misclicking 3 times...

var skullyaction = document.getElementById("act_dialog_skull");
if(skullyaction && skullyaction.id) {
   var ynode=skullyaction.cloneNode(true);
   ynode.id = "act_dialog_skull2";
    ynode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Missions list\n		";
    var ytr = ynode.children[0].children[0];
    var onclick =  ytr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/skull/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        ytr.setAttribute("onClick", "");
        ytr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Forger</h1> <div class=\"content\">You can see Skully's mission list with this action</div></div></div>',null)")
        ytr.addEventListener("click", function(){
               if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
               }
               ytr.style.cursor = "wait";
               var tds = ytr.getElementsByTagName("td");
               for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
               }
                var label = ytr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!" ; 
                var res = performAction(dinoId, 'act/dialog/skull?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Argh! Ah ghost!";
                res = performAction(dinoId, 'act/dialog/skull?goto=arg;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "You!";
                res = performAction(dinoId, 'act/dialog/skull?goto=arg2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "What's the difference?";
                res = performAction(dinoId, 'act/dialog/skull?goto=diff;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Almost free?";
                res = performAction(dinoId, 'act/dialog/skull?goto=free;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "So you do haunt this place?";
                res = performAction(dinoId, 'act/dialog/skull?goto=haunt;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Like what?";
                res = performAction(dinoId, 'act/dialog/skull?goto=do;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Mmmm...";
                res = performAction(dinoId, 'act/dialog/skull?goto=uhm;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "A curse?";
                res = performAction(dinoId, 'act/dialog/skull?goto=bonne;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "It's not very helpfull is it?";
                res = performAction(dinoId, 'act/dialog/skull?goto=next;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Maybe I can help you.";
                res = performAction(dinoId, 'act/dialog/skull?goto=help;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Yes! definitely!";
                res = performAction(dinoId, 'act/dialog/skull?goto=accept;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "What should I do now?";
                res = performAction(dinoId, 'act/dialog/skull?goto=missions;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                document.location = '/dino/' + dinoId + '/act/mission/list?sk=' + userId;
            }, 
            false
        );
    }
   skullyaction.parentNode.appendChild(ynode); 
}


/* Check if double skill is needed */

var skillstable = document.getElementById("dinozDetails");

if(skillstable && skillstable.id) {
    var trs = skillstable.children[0].getElementsByTagName("tr");
    var skill = '';
    var skillsarray = [];
    var getDouble = 0;

    for(var j = 0; j < trs.length; j++){
        var tr = trs[j];
        if (tr.children[1].className == 'type') {
            skill = tr.children[0].childNodes[1].childNodes[2].nodeValue.replace(/\s/g,'');
            skillsarray.push(skill);

        }
    }
 
    if(skillsarray.indexOf("Double-Skill") == -1) {
        if(skillsarray.indexOf("Marsh") != -1 && skillsarray.indexOf("Lightning") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("AbsoluteZero") != -1 && skillsarray.indexOf("Combustion") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Elasticity") != -1 && skillsarray.indexOf("Adrenaline") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("EjectorPalms") != -1 && skillsarray.indexOf("WildInstinct") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("PrimalState") != -1 && skillsarray.indexOf("GaïaPath") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Cocoon") != -1 && skillsarray.indexOf("Waïkikidô") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("KaosPath") != -1 && skillsarray.indexOf("Kamikaze") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Sapper") != -1 && skillsarray.indexOf("VaporousForm") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Vengeance") != -1 && skillsarray.indexOf("Achilles'Heel") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("AqueousClone") != -1 && skillsarray.indexOf("MagicResistance") != -1) {
            getDouble = 1;
        }
        if (getDouble == 1){
            var node=trs[trs.length-1].cloneNode(true);
            node.children[0].childNodes[1].childNodes[2].nodeValue = " !!! Get Double Skill !!!";
            node.children[2].childNodes[1].children[0].attributes[0].nodeValue='';
            node.children[2].childNodes[1].attributes[0].nodeValue = '';
            node.children[2].childNodes[1].attributes[1].nodeValue = '';
            //node.setAttribute("class","off");
            trs[1].parentNode.insertBefore(node,trs[1]);
            //node.setAttribute("class","off");
            //trs[1].parentNode.appendChild(node);
        }
    }
    
    /* Check for Invocator */
    if(skillsarray.indexOf("Invocator") == -1) {
        var avatarobj = document.getElementsByClassName("avatar");
        var avatarMO = "" + avatarobj[0].onmouseover;
        var dinozRace = avatarMO.substring(avatarMO.indexOf("<h1>")+4,avatarMO.indexOf("</h1>"));
        //alert(dinozRace);
        var getInovator = 0;
        var getAt = '';
        switch(dinozRace)
        {
            case 'Moueffe':
                if(skillsarray.indexOf("LavaFlow") != -1 && skillsarray.indexOf("DiamondFangs") != -1) {
                    getInovator = 1;
                    getAt = "Venerable's Lair (Lavapit) - Venerable";
                }
                break;
            case 'Softpig':
                if(skillsarray.indexOf("Fireball") != -1 && skillsarray.indexOf("FaroeHeritage") != -1) {
                    getInovator = 1;
                    getAt = 'Lavapit (Lavapit) - Soft Shaman';
                }
                break;
            case 'Winks':
                if(skillsarray.indexOf("MasterFisherman") != -1 && skillsarray.indexOf("Adrenaline") != -1) {
                    getInovator = 1;
                    getAt = 'Mutant Falls (Atlantean Islands) - Atlantean Huard';
                }
                break;
            case 'Glidwings':
                if(skillsarray.indexOf("Lightning") != -1 && skillsarray.indexOf("Elasticity") != -1) {
                    getInovator = 1;
                    getAt = 'Lavapit (Lavapit) - Elemental Master';
                }
                break;
            case 'Castivorous':
                if(skillsarray.indexOf("WildInstinct") != -1 && skillsarray.indexOf("VivaciousWind") != -1) {
                    getInovator = 1;
                    getAt = 'Market Place (Dinoland) - Isabella';
                }
                break;
            case 'Rocky':
                if(skillsarray.indexOf("ElementalFission") != -1 && skillsarray.indexOf("IncandescentAura") != -1) {
                    getInovator = 1;
                    getAt = "King's Citadel (Magnetic Steppes) - Rocky King";
                }
                break;
            case 'Pteroz':
                if(skillsarray.indexOf("BurningBreath") != -1 && skillsarray.indexOf("FetidBreath") != -1) {
                    getInovator = 1;
                    getAt = "University (Dinoland) - Professor Eugene";
                }
                break;
            case 'Cloudoz':
                if(skillsarray.indexOf(" LightningDance") != -1 && skillsarray.indexOf("VacuumDisk") != -1) {
                    getInovator = 1;
                    getAt = "Bruteforce (Dinoland) - Madam X";
                }
                break;
            case 'Sirain':
                if(skillsarray.indexOf("WithoutMercy") != -1 && skillsarray.indexOf("Vengeance") != -1) {
                    getInovator = 1;
                    getAt = "Dinotown Clinic (Dinoplaza) - Anna Tomie";
                }
                break;
            case 'Hippoclamp':
                if(skillsarray.indexOf("MartialArts") != -1 && skillsarray.indexOf("Concentration") != -1 && skillsarray.indexOf("Awakening") != -1) {
                    getInovator = 1;
                    getAt = "Mutant Falls (Atlantean Islands) - Master Hydragol";
                }
                break;
            case 'Gorilloz':
                if(skillsarray.indexOf("PrimalState") != -1 && skillsarray.indexOf("BurningHeart") != -1) {
                    getInovator = 1;
                    getAt = "Dinotown (Dinoland) - Michael The Guide";
                }
                break;
            case 'Wanwan':
                if(skillsarray.indexOf("Gathering") != -1 && skillsarray.indexOf("ForestKeeper") != -1) {
                    getInovator = 1;
                    getAt = "Blacksylva Door (Grumhel Forest) - Forest Warden";
                }
                break;
            case 'Santaz':
                if(skillsarray.indexOf("Tenacity") != -1 && skillsarray.indexOf("FetidBreath") != -1 && skillsarray.indexOf("TrickyHits") != -1) {
                    getInovator = 1;
                    getAt = "Klutz' Workshop (Atlantean Islands) - Klutz";
                }
                break;
            case 'Feroz':
                if((skillsarray.indexOf("BlowtorchPalm") != -1 || skillsarray.indexOf("Vigilance") != -1) && skillsarray.indexOf("FatalHit") != -1) {
                    getInovator = 1;
                    getAt = "Mr Bao Bob's House (Atlantean Islands) - Mr Bao Bob";
                }
                break;
            case 'Kabuki':
                if(skillsarray.indexOf("Awakening") != -1 && skillsarray.indexOf("Combustion") != -1) {
                    getInovator = 1;
                    getAt = "Totem Island (Atlantean Islands) - Yakuzi";
                }
                break;
            case 'Mahamuti':
                if(skillsarray.indexOf("Tornado") != -1 && skillsarray.indexOf("AcidBlood") != -1) {
                    getInovator = 1;
                    getAt = "Grandpa Joe's House (Dinoland) - Grandpa Joe";
                }
                break;
            case 'Tofufu':
                if(skillsarray.indexOf("Charisma") != -1 && skillsarray.indexOf("LightningDance") != -1) {
                    getInovator = 1;
                    getAt = "Bruteforce (Dinoland) - Master Zenith";
                }
                break;
            case 'Etherwasp':
                if(skillsarray.indexOf("PrecociousSpring") != -1 && skillsarray.indexOf("VivaciousWind") != -1) {
                    getInovator = 1;
                    getAt = "Observatory (Nimbao) - Sage Menthos";
                }
                break;
            case 'Smog':
                getInovator = 1;
                getAt = 'Island Head (Nimbao) - Old Robot';
                break;
        }
        
        if (getInovator == 1){
            var node=trs[trs.length-1].cloneNode(true);
            node.children[0].childNodes[1].childNodes[1].attributes[1].nodeValue = '/img/icons/elem_5.gif';
            node.children[0].childNodes[1].childNodes[2].nodeValue = " !!! Get Invocator Skill !!!";
            node.children[0].childNodes[1].attributes[1].nodeValue = "mt.js.Tip.show(this,'<div class=\\'header\\'><div class=\\'footer\\'><h1>Invocator</h1> <div class=\\'content\\'>Get Invocator at:<div>\\n<strong>" + getAt + "</strong></div>\\n</div></div></div>',null)";
            node.children[1].childNodes[1].childNodes[0].nodeValue = 'S';
            node.children[1].childNodes[1].attributes[1].nodeValue = "mt.js.Tip.show(this,'<div class=\\'header\\'><div class=\\'footer\\'><h1>Special</h1> <div class=\\'content\\'>This skill has a <strong>particular effect</strong></div></div></div>',null)";
            node.children[2].childNodes[1].children[0].attributes[0].nodeValue='';
            node.children[2].childNodes[1].attributes[0].nodeValue = '';
            node.children[2].childNodes[1].attributes[1].nodeValue = '';
            
            
            //node.setAttribute("class","off");
            trs[1].parentNode.insertBefore(node,trs[1]);
        }
    }
}

/* Tournament opponent info  */

var tournamentheader = document.getElementById("swf_title_BrutForce Tournament");

if(tournamentheader && tournamentheader.id) {
    var tourframe = tournamentheader.parentNode.parentNode;
    var divClear = document.createElement("div");
    divClear.className = 'clear';
    divClear.style.height = '10px';
    var divskills = document.createElement("div");
    divskills.className = 'right';
    
    divskills.appendChild(tourframe.childNodes[5].childNodes[3].childNodes[5].cloneNode(true));
    var dinolevel = divskills.childNodes[0].childNodes[3].innerHTML.slice(-2);
    divskills.childNodes[0].removeChild(divskills.childNodes[0].childNodes[3]);
    
    var skillslist = document.createElement("div");
    skillslist.className = 'help';
    skillslist.innerHTML = '<b>Details:</b> <br/><img src="http://en.dinorpg.com/img/forum/smiley/small_life_en.gif">' 
    
    switch(dinolevel)
        {
            case ' 6': //HP Confirmed
                 skillslist.innerHTML += ' 100<br/>Focus<br/>'
            break;
            case ' 7': //HP Confirmed
                 skillslist.innerHTML += ' 100<br/>Mistral<br/>'
            break;
            case ' 8': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Focus<br/>'
            break;
            case ' 9': //HP Confirmed
                 skillslist.innerHTML += ' 100<br/>Focus<br/>Perception<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '10': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Burning Breath<br/>Concentration<br/>Perception<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '11': //HP Confirmed
                 skillslist.innerHTML += ' 120<br/>Focus<br/>Korgon Reinforcements<br/>Perception<br/>Wrath<br/>'
            break;
            case '12': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Cold Shower<br/>Focus<br/>Perception<br/>Tricky Hits<br/>Water Cannon<br/>'
            break;
            case '13': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Focus<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '14': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Focus<br/>Mistral<br/>Perception<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '15': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Mistral<br/>Korgon Reinforcement<br/>Water Cannon<br/>'
            break;
            case '16': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Mistral<br/>Korgon Reinforcement<br/>Water Cannon<br/>Wrath<br/>'
            break;    
            case '17': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Burning Breath<br/>Focus<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '18':
                 skillslist.innerHTML += ' 150<br/>Burning Breath<br/>Fire Ball<br/>Lava Flow<br/>Waïkikidô<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '19': //HP Confirmed
                 skillslist.innerHTML += ' 120<br/>Korgon Reinforcement<br/>Magic Resistance<br/>Vines<br/>Water Cannon<br/>'
            break;
            case '20': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Korgon Reinforcement<br/>Mistral<br/>Vines<br/>Water Cannon<br/>'
            break;
            case '21': //HP Confirmed
                 skillslist.innerHTML += ' 100<br/>Double Hit<br/>Focus<br/>Wrath<br/>'
            break;
            case '22': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Double Hit<br/>Flight<br/>Focus<br/>Mistral<br/>Water Cannon<br/>'
            break;
            case '23': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Blowtorch Palm<br/>Burning Breath<br/>Mistral<br/>Vengeance<br/>Wrath<br/>'  
            break;
            case '24': //HP Confirmed
                 skillslist.innerHTML += ' 120<br/>Focus<br/>Korgon Reinforcement<br/>Primal State<br/>Vines<br/>Wrath<br/>' 
            break;
            case '25': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Double Hit<br/>Flight<br/>Focus<br/>Mistral<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '26': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Burning Breath<br/>Fire Ball<br/>Focus<br/>Nap<br/>Vengeance<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '27': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Cold Shower<br/>Fatal Hit<br/>Focus<br/>Gel<br/>Marsh<br/>Mistral<br/>Tricky Hits<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '28': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Burning Breath<br/>Dodge<br/>Flight<br/>Focus<br/>Mistral<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '29': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Double Hit<br/>Flight<br/>Focus<br/>Hermetic Aura<br/>Lightning<br/>Mistral<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '30': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Cold Shower<br/>Focus<br/>Mistral<br/>Perception<br/>Water Cannon<br/>Wrath<br/>Tricky Hits<br/>'
            break;
            case '31': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Burning Breath<br/>Combustion<br/>Fire Ball<br/>Lava Flow<br/>Mistral<br/>Vengeance<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '32': //HP Confirmed
                 skillslist.innerHTML += ' 130<br/>Burning Breath<br/>Combustion<br/>Fire Ball<br/>Lava Flow<br/>Mistral<br/>Nap<br/>Vengeance<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '33': //HP Confirmed
                 skillslist.innerHTML += ' 140<br/>Dodge<br/>Double Hit<br/>Cold Shower<br/>Flight<br/>Focus<br/>Gel<br/>Mistral<br/>Tornado<br/>Tricky Hits<br/>Water Cannon<br/>'
            break;
            case '34': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Burning Breath<br/>Cold Shower<br/>Double Hit<br/>Focus<br/>Gel<br/>Jump<br/>Mistral<br/>Vines<br/>Water Cannon<br/>Wrath<br/>Tricky Hits<br/>'
            break;
            case '35': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Cold Shower<br/>Dodge<br/>Focus<br/>Korgon Reinfocement<br/>Magic Resistance<br/>Mistral<br/>Precocious Spring<br/>Primal State<br/>Tricky Hits<br/>Vines<br/>Water Cannon<br/>'
            break;
            case '36': //HP Confirmed
                 skillslist.innerHTML += ' 120<br/>Blowtorch Palm<br/>Burning Breath<br/>Dodge<br/>Flight<br/>Focus<br/>Jump<br/>Korgon Reinforcement<br/>Mistral<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '37': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Double Hit<br/>Flight<br/>Focus<br/>Hermetic Aura<br/>Mistral<br/>Saving Puree<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '38': //HP Confirmed
                 skillslist.innerHTML += ' 150<br/>Cold Shower<br/>Double Hit<br/>Focus<br/>Gel<br/>Korgon Reinfocement<br/>Mistral<br/>Tricky Hits<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '39': //HP Confirmed
                 skillslist.innerHTML += ' 190<br/>Blowtorch Palm<br/>Combustion<br/>Fire Ball<br/>Focus<br/>Korgon Reinforcement<br/>Lava Flow</br>Mistral<br/>Vengeance<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '40':
                  skillslist.innerHTML += ' ???<br/>Dodge<br/>Focus</br>Gorriloz Spirit<br/>Korgon Reinforcement<br/>Precocious Spring<br/>Primal State<br/>Magic Resistance<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '41': //HP Confirmed
                  skillslist.innerHTML += ' 170<br/>Blowtorch Palm<br/>Cold Shower<br/>Combustion<br/>Fire Ball<br/>Focus<br/>Lava Flow<br/>Nap<br/>Torch<br/>Vengeance<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '42': //HP Confirmed
                  skillslist.innerHTML += ' 170<br/>Blowtorch Palm<br/>Burning Breath<br/>Combustion<br/>Fire Ball<br/>Focus<br/>Jump<br/>Nap<br/>Perception<br/>Self Control<br/>Tricky Hits<br/>Vengeance<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '43': //HP Partially Confirmed
                  skillslist.innerHTML += ' ~180<br/>Focus<br/>Gorilloz Spirit<br/>Korgon Reinforcement<br/>Magic Resistance<br/>Mistral<br/>Precocious Spring<br/>Primal State<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '44':
                  skillslist.innerHTML += ' ???<br/>Dodge<br/>Flight<br/>Focus<br/>Hermetic Aura<br/>Lightning<br/>'
            break;
            case '45':
                  skillslist.innerHTML += ' ???<br/>Cold Shower<br/>Dodge<br/>Double Hit<br/>Flight<br/>Focus<br/>Mistral<br/>Tornado<br/>Tricky Hits<br/>Water Cannon<br/>Wrath<br/>'
            break;
            
        }
    
    divskills.appendChild(skillslist);
    
    tourframe.childNodes[5].appendChild(divClear);
    tourframe.childNodes[5].appendChild(divskills);
    
}

/* Mission info */

var missionheader = document.getElementById("swf_title_Mission:");
if(missionheader && missionheader.id) {
    var missioncontrol = missionheader.parentNode.nextElementSibling;
}

if(missionheader && missionheader.id && missioncontrol.className == 'briefing') {    

    var missionframe = missionheader.parentNode.parentNode;
    var missionscript = missionframe.childNodes[1].children[1].childNodes[0].data;
    var rewardbox = document.createElement("p");
    //rewardbox.className = 'story'
    //var rewardbox = missionframe.childNodes[3].childNodes[9].nodeValue;
    var mission = missionscript.substring(missionscript.indexOf(';sub=')+5, missionscript.indexOf('");',missionscript.indexOf(';sub=')));
    var rewards = '<b>Rewards:</b>';
    switch(mission)
        {
            /* Grandpa Joe */
            case "Fresh Fish":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Lost Dog":
                rewards += '<br/>- 15 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/obj_angel.gif">';
            break;
            case "The Hills' Smashrooms":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Wolf Hunting":
                rewards +='<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Rose Bush in danger":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Recipe Book":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Stamps":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/collec_msg.gif">';
            break;
            case "The Confidential Letter":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "A Strange Monster":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Giants":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 5000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Month Exploit":
                rewards += '<br/>- 200 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 8000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            /* Madam X */    
            case "The Black Briefcase":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 300 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Merchant Traitor":
                rewards += '<br/>- <img src="http://en.dinorpg.com/img/icons/obj_ration.gif"><br/>';
            break;
            case "Police Chase":
                rewards += '<br/>- 50 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "Island it's Kool":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">'+
                    '<br/><br/><b>Needed for mission:</b><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/fx_bouee.gif">';
            break;
            case "The Ashpouk Conspiracy":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';+
                    '<br/><br/><b>Needed for mission:</b><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/fx_matesc.gif">';
            break;
            /* Skully */   
            case "Prologue":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "On The Trail Of Moulder":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Miss Bao":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>'+
                    '- <img src="http://en.dinorpg.com/img/icons/fx_skull.gif">';
            break;
            case "The Annoying Tourists":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Napalm Shrimp":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 5000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">'
                    '<br/><br/><b>Needed for mission:</b><br/>' +
                    '- 3 <img src="http://en.dinorpg.com/img/icons/obj_tix.gif"><br/>' +
                    '- 5 <img src="http://en.dinorpg.com/img/icons/obj_flamch.gif"><br/>';
            break;
            case "The Reunion":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 4000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/collec_pda.gif"><br/>';
            break;
            /* Anna Tomie */
            case "First Prescription":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '<br/><br/><b>Needed for mission:</b><br/>' +
                    '- 10 <img src="http://data.en.dinorpg.com/img/icons/ingr_fruitc.gif">';
            break;
            case "Mushroom Medicine":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '<br/><br/><b>Needed for mission:</b><br/>' +
                    '- 5 <img src="http://data.en.dinorpg.com/img/icons/ingr_fruitu.gif">';
            break;
            case "Bizarre Biotherapy":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';+
                    '<br/><br/><b>Needed for mission:</b><br/>' +
                    '- 1 <img src="http://data.en.dinorpg.com/img/icons/ingr_fruit1.gif">';
            break;
            case "Nasty Neighbours":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Monster Invasion":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 600 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "First Aid":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Curiosity Killed The Cat":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            /* Soft Shaman */    
            case "The Testing Ordeal":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Archelionscarer":
                rewards += '<br/>- 60 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/fx_amulst.gif">';
            break;
            case "Fire!":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Crazy Barbecue":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/obj_flamch.gif">';
            break;
            case "Quarrel":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Defend The Forges":
                rewards += '<br/>- 60 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 4000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            case "The Disappearing Package":
                rewards += '<br/>- 25 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_angel.gif">';
            break;
            case "(Un)Fair Trade":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Ridiculous Ritual":
                rewards += '<br/>- 50 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/obj_ppoiv.gif">';
            break;
            case "Hieroglyphics":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_burger.gif"><br/>'+
                    '<b>Needed for mission:</b><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/fx_lantrn.gif">';
            break;
            case "Carrier Pigeon":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 5500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            /* Mr Bao Bob */
            case "Birthday Gift":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "Barter in the Atlanteid Islands":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Kazkadine Hunt":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Eeloz in Vinegar":
                rewards += '<br/>- 50 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 5000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Huge Hunt":
                rewards += '<br/>- 150 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Sardine Rally":
                rewards += '<br/>- 10 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Fishes Rally":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Sharks Rally":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Whales Rally":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Dinoland Tour":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '<br/>- <img src="http://data.en.dinorpg.com/img/icons/collec_tour.gif">';
            break;
            /* Nicolas Mulot */
            case "The Perilous Road":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Allergies":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Cartography":
                rewards += '<br/>- 60 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Remedy":
                rewards += '<br/>- 60 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/obj_angel.gif">';
            break;
            case "Adventurer's Kit":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/fx_bckpck.gif">';
            break;
            /* Strange Prowler */
            case "The Amnesiac Rice":
                rewards += '<br/>- 5000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/obj_riz.gif"><br/>';
            break;
            case "The Dark Dinoz":
                rewards += '<br/>- 250 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 5000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            /* Elemental Master */
            case "The Master's Shopping":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Lesson 1 - Lightning":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Lesson 2 - Fire":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "Lesson 3 - Wood":
                rewards += '<br/>- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '<b>Extra info:</b><br/>' +
                    'You will need Devil Ointment <img src="http://en.dinorpg.com/img/icons/obj_odemon.gif"> <br/>to cure the curse (costs 6000 <img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">)';
            break;
            case "Lesson 4 - Air":
                rewards += '<br/>- 10000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Lesson 5 - Water":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    'Afterwards claim your reward from the master:<br/>' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher5.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher4.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher3.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher2.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher1.gif">';
            break;               
            /* Dian Korgsey */
            case "Like a Korgon To Water":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- ' +
                    '<img src="http://en.dinorpg.com/img/icons/fx_palmes.gif">';
            break;
            case "Northern Korgons, Southern Korgons":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Wood Steak":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Korgon Rivalry":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            /* Forest Warden */    
            case "The Forest Warden":
                rewards += '<br/>- 110 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3 <img src="http://data.en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "The Green Thumb":
                rewards += '<br/>- 30 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "Right to cut":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3 <img src="http://data.en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "The King of the Jungle":
                rewards += '<br/>- 35 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "Make a Wish":
                rewards += '<br/>- 60 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 4 <img src="http://en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "A Jack For The Forest":
                rewards += '<br/>- 75 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            case "Monkey money":
                rewards += '<br/>- 5 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/fx_gshop.gif"><br/>' + 
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_angel.gif"><br/>';
            break;
            /* Request Office */
            case "Secure The Road":
                rewards += '<br/>- 70 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Western Caravan":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Zest of Scorpwink":
                rewards += '<br/>- 80 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- 2 <img src="http://data.en.dinorpg.com/img/icons/obj_antip.gif"><br/>';
            break;
            case "Secure The Crossroads":
                rewards += '<br/>- 80 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "The Greedy Thief":
                rewards += '<br/>- 80 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- 3 <img src="http://data.en.dinorpg.com/img/icons/obj_ration.gif"><br/>';
            break;
            case "Dewormer":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_monoch.gif"><br/>';
            break;
            case "Wanted: Sahalami The Slicer":
                rewards += '<br/>- 80 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif"><br/>';
            break;
            case "Wanted: Trip The Wimp":
                rewards += '<br/>- 90 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Wanted: Boukanee The Immortal":
                rewards += '<br/>- 90 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Wanted: Cervelah The Poisoner":
                rewards += '<br/>- 90 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- 2 <img src="http://data.en.dinorpg.com/img/icons/obj_antip.gif"><br/>';
            break;
            case "A Mysterious Pendant":
                rewards += '<br/>- 90 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            /* Al Zaimeur */
            case "Al's Party":
                rewards += '<br/>- 80 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 3000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Merguez or Nothing":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "Al Cool":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">' +
                    '<br/><br/><b>Needed for mission:</b><br/>' +
                    ' - 3 Sharpened Flint <img src="http://data.en.dinorpg.com/img/icons/ingr_art.gif"><br/>' +
                    ' - <img src="http://en.dinorpg.com/img/icons/fx_pelle.gif">';
            break;
            case "Licence To Party":
                rewards += '<br/>- 20 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "Magnetic Excess":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            /* Chen */     
            case "S.O.S":
                rewards += '<br/>- 80 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "The Archdorogon's Tomb":
                rewards += '<br/>- 50 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "Ingredients Hunt":
                rewards += '<br/>- 10000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>' +
                    '- <img src="http://en.dinorpg.com/img/icons/obj_remed2.gif"><br/>';
            break;
            case "Letter to the children":
                rewards += '<br/>- 50 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 2000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            case "On the stepes of Morgan":
                rewards += '<br/>- 60 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>' +
                    '- 1500 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif">';
            break;
            /* Sgt Pepper */
            case "Warrior Training":
                rewards += '<br/>- 40 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "Mine Field":
                rewards += '<br/>- 50 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/small_xp.gif"><br/>';
            break;
            case "Mouktization":
                rewards += '<br/>- 3000 ' +
                    '<img src="http://en.dinorpg.com/img/forum/smiley/s_gold.gif"><br/>';
            break;
            case "Initiation":
                rewards += '<br/>-';
            break;
            case "The Capturer's Glove":
                rewards += '<br/>- 100 ' +
                    '<img src="http://en.dinorpg.com/img/icons/fx_mcapt.gif"><br/>';
            break;
        
        }

    rewardbox.innerHTML = '\n' + rewards;
    missionframe.childNodes[3].insertBefore(rewardbox, missionframe.childNodes[3].childNodes[9]);
    //missionframe.childNodes[3].childNodes[9].nodeValue = '\n ' + rewards;
    
}

/* Missing reward info */

var rewardheader = document.getElementById("swf_title_Mission Completed!");

if(rewardheader && rewardheader.id) {    

    var rewardframe = rewardheader.parentNode.parentNode;
    var rewardscript = rewardframe.childNodes[3].childNodes[1].childNodes[0].data;
    var rewardbox2 = document.createElement("p");
    //rewardbox.className = 'story'
    //var rewardbox = missionframe.childNodes[3].childNodes[9].nodeValue;
    var missionreward = rewardscript.substring(rewardscript.indexOf('completed "')+11, rewardscript.indexOf('"!',rewardscript.indexOf('completed "')));
    var rewards = '';
    switch(missionreward)
        {
           /* Grandpa Joe */
            case "the Lost Dog":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_angel.gif">';
            break;
            case "The Stamps":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/collec_msg.gif">';
            break;
            /* Madam X */    
            case "The Merchant Traitor":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_ration.gif"><br/>';
            break;
            /* Skully */   
            case "The Reunion":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/collec_pda.gif"><br/>';
            break;
            /* Anna Tomie */
            /* Soft Shaman */    
            case "The Crazy Barbecue":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_flamch.gif">';
            break;
            case "Defend The Forges":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            case "The Disappearing Package":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_angel.gif">';
            break;
            case "Ridiculous Ritual":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_ppoiv.gif">';
            break;
            case "Hieroglyphics":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_burger.gif"><br/>';
            break;
            case "Carrier Pigeon":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            /* Mr Bao Bob */
            case "The Dinoland Tour":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/collec_tour.gif">';
            break;
            /* Nicolas Mulot */
            case "Remedy":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_angel.gif">';
            break;
            /* Strange Prowler */
            case "The Amnesiac Rice":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_riz.gif"><br/>';
            break;
            /* Elemental Master */
            case "Lesson 5 - Water":
                rewards += '<br/>Claim your reward from the master:<br/>' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher5.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher4.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher3.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher2.gif"> OR ' +
                    '<img src="http://data.en.dinorpg.com/img/icons/obj_spher1.gif">';
            break;               
            /* Dian Korgsey */
            case "Korgon Rivalry":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            /* Forest Warden */    
            case "The Forest Warden":
                rewards += '<br/>3 <img src="http://data.en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "The Green Thumb":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "Right to cut":
                rewards += '<br/>3 <img src="http://data.en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "The King of the Jungle":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "Make a Wish":
                rewards += '<br/>4 <img src="http://en.dinorpg.com/img/icons/obj_fruit.gif">';
            break;
            case "A jack for the forest":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif">';
            break;
            case "Monkey money":
                rewards += '<br/>- <img src="http://en.dinorpg.com/img/icons/fx_gshop.gif"><br/>' + 
                    '- <img src="http://data.en.dinorpg.com/img/icons/obj_angel.gif"><br/>';
            break;
            /* Request Office */
            case "Zest of Scorpwink":
                rewards += '<br/>2 <img src="http://data.en.dinorpg.com/img/icons/obj_antip.gif"><br/>';
            break;
            case "The Greedy Thief":
                rewards += '<br/>3 <img src="http://data.en.dinorpg.com/img/icons/obj_ration.gif"><br/>';
            break;
            case "Dewormer":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_monoch.gif"><br/>';
            break;
            case "Wanted: Sahalami The Slicer":
                rewards += '<br/><img src="http://data.en.dinorpg.com/img/icons/obj_hotpan.gif"><br/>';
            break;
            case "Wanted: Cervelah The Poisoner":
                rewards += '<br/>2 <img src="http://data.en.dinorpg.com/img/icons/obj_antip.gif"><br/>';
            break;
            /* Al Zaimeur */
            /* Chen */     
            case "Ingredients Hunt":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/obj_remed2.gif"><br/>';
            break;
            /* Sgt Pepper */
            case "The Capturer's Glove":
                rewards += '<br/><img src="http://en.dinorpg.com/img/icons/fx_mcapt.gif"><br/>';
            break;
        }

    rewardbox2.innerHTML = rewards;
    rewardframe.childNodes[3].insertBefore(rewardbox2, rewardframe.childNodes[3].childNodes[9]);
    
}

/* Sticky swamp roadsign */

var stickyheader = document.getElementById("swf_map");
if(stickyheader && stickyheader.id) {
    var stickycontrol = stickyheader.parentNode.children[2];
    var mapframe = document.getElementById("menu");
}

if(stickyheader && stickyheader.id && (stickycontrol.innerHTML == 'Sticky Swamp' || stickycontrol.innerHTML == 'Mutant Falls' || stickycontrol.innerHTML == 'Coral Mines' || stickycontrol.innerHTML == 'Waïkiki Island' || stickycontrol.innerHTML == "Klutz' Workshop") && mapframe.id) {    
    
    var swampcontainer = document.createElement("div");
    var swampheader = document.createElement("div");
    swampheader.className="header";
    swampcontainer.appendChild(swampheader);
    var swampbox = document.createElement("div");
    swampbox.className="bg";
    //swampbox.className='mission help';
    swampbox.style='cursor:default;';
    var swampfooter = document.createElement("div");
    swampfooter.className="footer";
    
    var swamplist = document.createElement("ul");
    var swampboxrow = document.createElement("p");
    swampboxrow.style="font-variant:small-caps;font-weight:bold;font-size:9pt;color:#8e3e26;text-decoration:underline;";
    swampboxrow.innerHTML = 'Swamp Roadsign:'
    swamplist.appendChild(swampboxrow);
    var curDate = new Date();
    var curDay = curDate.getDay();
    var weekday = new Array(8);
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7]=  "Sunday";
        for(var i = 1; i < 8; i++) {
        var swampboxrow = document.createElement("p");
        
        if (curDay == i || (curDay == 0 && i == 7)) {
            var style="font-variant:small-caps;font-weight:bold;font-size:9pt;background-color: #D19860;color:#fce3bc;margin:0px;"
        }
        else {    
            var style="font-variant:small-caps;font-weight:bold;font-size:9pt;color:#8e3e26;margin:0px;"
        }
        swampboxrow.style = style;
        swampboxrow.innerHTML = weekday[i];
        swamplist.appendChild(swampboxrow);
        
        var swampboxrow = document.createElement("p");
        swampboxrow.style=style;
        if(i==1){ swampboxrow.innerHTML = '<img src="http://en.dinorpg.com/img/icons/act_move.gif"> <img src="http://en.dinorpg.com/img/icons/act_fight.gif">'; }
        if(i==2){ swampboxrow.innerHTML = '<img src="http://en.dinorpg.com/img/icons/act_move.gif"> <img src="http://en.dinorpg.com/img/icons/act_fight.gif">'; }
        if(i==3){ swampboxrow.innerHTML = '<img src="http://en.dinorpg.com/img/icons/act_move.gif"> <label style="color:red;font-size:26px;font-weight:bold;">No</label>'; }
        if(i==4){ swampboxrow.innerHTML = '<label style="color:red;font-size:26px;font-weight:bold;">No</label> <img src="http://en.dinorpg.com/img/icons/act_fight.gif">'; }
        if(i==5){ swampboxrow.innerHTML = '<img src="http://en.dinorpg.com/img/icons/act_move.gif"> <img src="http://en.dinorpg.com/img/icons/act_fight.gif">'; }
        if(i==6){ swampboxrow.innerHTML = '<label style="color:red;font-size:26px;font-weight:bold;">No</label> <img src="http://en.dinorpg.com/img/icons/act_fight.gif">'; }
        if(i==7){ swampboxrow.innerHTML = '<img src="http://en.dinorpg.com/img/icons/act_move.gif"> <label style="color:red;font-size:26px;font-weight:bold;">No</label>'; }
            
        swamplist.appendChild(swampboxrow); 
    }
    
    swampfooter.appendChild(swamplist);
    swampbox.appendChild(swampfooter);
    swampcontainer.appendChild(swampbox);
    mapframe.appendChild(swampcontainer);
}
/* Transfor old stone into ashpouk totem */
if(stickyheader && stickyheader.id && stickycontrol.innerHTML == 'The University'){
    
    /* Old Stone in posession check */
    if(centerContent.childNodes[1].childNodes[17].innerHTML.indexOf('Old Stone') > 0 ) {
       var profaction = document.getElementById("act_dialog_prof");
       if(profaction && profaction.id) {
           
          var pnode=profaction.cloneNode(true);
          pnode.id = "act_dialog_prof2";
          pnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Get Ashpouk Totem\n		";
            var ptr = pnode.children[0].children[0];
            var onclick =  ptr.getAttribute("onClick");
            var re = /\/(\d+)\/act\/dialog\/prof/.exec(onclick);
            if(re){
                dinoId = re[1];
                userId = onclick.substr(-7,5);
                ptr.setAttribute("onClick", "");
                ptr.setAttribute("onMouseOver","mt.js.Tip.show(this,'<div class=\"header\"><div class=\"footer\"><h1>Forger</h1> <div class=\"content\">You can transform you found Old Stone into an Ashpouk Totem!</div></div></div>',null)")
                ptr.addEventListener("click", function(){
                       if(document.getElementById("tooltip")){
                            document.getElementById("tooltip").style.display = "none";
                       }
                       ptr.style.cursor = "wait";
                       var tds = ptr.getElementsByTagName("td");
                       for(var k = 0; k < tds.length; k++){
                            var td = tds[k];
                            td.style.cursor = "wait";
                            td.style.color = "#ffffff";
                            td.style.backgroundColor = "transparent";
                       }
                       var label = ptr.getElementsByClassName("label")[0];
                       label.innerHTML = "Clicked!" ; 
                       var res = performAction(dinoId, 'act/dialog/prof?sk=' + userId, 'dino/' + dinoId);
                       label.innerHTML = "Professor Eugene";
                       res = performAction(dinoId, 'act/dialog/prof?goto=talk;sk=' + userId, 'dino/' + dinoId + '/act/dialog/prof');
                       label.innerHTML = "Ask A Question";
                       res = performAction(dinoId, 'act/dialog/prof?goto=question;sk=' + userId, 'dino/' + dinoId + '/act/dialog/prof');
                       label.innerHTML = "This Old Stone?";
                       res = performAction(dinoId, 'act/dialog/prof?goto=stone;sk=' + userId, 'dino/' + dinoId + '/act/dialog/prof');
                       label.innerHTML = "Of course, here it is.";
                       res = performAction(dinoId, 'act/dialog/prof?goto=stone_yes;sk=' + userId, 'dino/' + dinoId + '/act/dialog/prof');
                       res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                       document.location = '/dino/' + dinoId + '/setTab?t=map';

                    }, 
                    false
                );
                ptr.children[0].children[0].setAttribute("src","/img/icons/fx_totem.gif");
                ptr.children[0].children[0].style = "width:25px;";
            }
           profaction.parentNode.appendChild(pnode); 
        }
    }
}


function performAction(dinoId, action, referer){
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.open('GET','http://' + location.host + '/dino/' + dinoId + '/' + action, false);
    xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
    xmlhttp.setRequestHeader('Accept','text/html,application/xhtml+xml,application/xml;');
    xmlhttp.setRequestHeader('Referer','http://' + location.host + '/' + referer);
    xmlhttp.setRequestHeader('Cookie',document.cookie);
    xmlhttp.send();
    return xmlhttp.responseText;
}
