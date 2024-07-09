var e="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var r={};var t="abcdefgh".split("");function validMove(e){if("string"!==typeof e)return false;var r=e.split("-");return 2===r.length&&(true===validSquare(r[0])&&true===validSquare(r[1]))}function validSquare(e){return"string"===typeof e&&-1!==e.search(/^[a-h][1-8]$/)}function validPieceCode(e){return"string"===typeof e&&-1!==e.search(/^[bw][KQRNBP]$/)}function validFen(e){if("string"!==typeof e)return false;e=e.replace(/ .+$/,"");var r=e.split("/");if(8!==r.length)return false;for(var t=0;t<8;t++)if(""===r[t]||r[t].length>8||-1!==r[t].search(/[^kqrbnpKQRNBP1-8]/))return false;return true}function validPositionObject(e){if("object"!==typeof e)return false;for(var r in e)if(true===e.hasOwnProperty(r)&&(true!==validSquare(r)||true!==validPieceCode(e[r])))return false;return true}function fenToPieceCode(e){return e.toLowerCase()===e?"b"+e.toUpperCase():"w"+e.toUpperCase()}function pieceCodeToFen(e){var r=e.split("");return"w"===r[0]?r[1].toUpperCase():r[1].toLowerCase()}function fenToObj(e){if(true!==validFen(e))return false;e=e.replace(/ .+$/,"");var r=e.split("/");var a={};var n=8;for(var o=0;o<8;o++){var i=r[o].split("");var s=0;for(var u=0;u<i.length;u++)if(-1!==i[u].search(/[1-8]/)){var p=parseInt(i[u],10);s+=p}else{var d=t[s]+n;a[d]=fenToPieceCode(i[u]);s++}n--}return a}function objToFen(e){if(true!==validPositionObject(e))return false;var r="";var a=8;for(var n=0;n<8;n++){for(var o=0;o<8;o++){var i=t[o]+a;true===e.hasOwnProperty(i)?r+=pieceCodeToFen(e[i]):r+="1"}7!==n&&(r+="/");a--}r=r.replace(/11111111/g,"8");r=r.replace(/1111111/g,"7");r=r.replace(/111111/g,"6");r=r.replace(/11111/g,"5");r=r.replace(/1111/g,"4");r=r.replace(/111/g,"3");r=r.replace(/11/g,"2");return r}var ChessBoard=function(r,a){a=a||{};var n="1.7.0",o="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",i=fenToObj(o);var s={alpha:"alpha-d2270",black:"black-3c85d",board:"board-b72b1",chessboard:"chessboard-63f37",clearfix:"clearfix-7da63",highlight1:"highlight1-32417",highlight2:"highlight2-9c5d2",notation:"notation-322f9",numeric:"numeric-fc462",piece:"piece-417db",row:"row-5277c",sparePieces:"spare-pieces-7492f",sparePiecesBottom:"spare-pieces-bottom-ae20f",sparePiecesTop:"spare-pieces-top-4028b",square:"square-55d63",white:"white-1e1d7"};var u,p,d,c,f;var l={};var v=false,h=2,g="white",m={},P,w,b,y,S=false,q={},O={},C;function uuid(){return"xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx".replace(/x/g,(function(e){var r=16*Math.random()|0;return r.toString(16)}))}function deepCopy(e){return JSON.parse(JSON.stringify(e))}function parseSemVer(e){var r=e.split(".");return{major:parseInt(r[0],10),minor:parseInt(r[1],10),patch:parseInt(r[2],10)}}function compareSemVer(e,r){e=parseSemVer(e);r=parseSemVer(r);var t=1e4*e.major*1e4+1e4*e.minor+e.patch;var a=1e4*r.major*1e4+1e4*r.minor+r.patch;return t>=a}function error(e,r,t){if(true===a.hasOwnProperty("showErrors")&&false!==a.showErrors){var n="ChessBoard Error "+e+": "+r;if("console"!==a.showErrors||"object"!==typeof console||"function"!==typeof console.log)if("alert"!==a.showErrors)"function"===typeof a.showErrors&&a.showErrors(e,r,t);else{t&&(n+="\n\n"+JSON.stringify(t));window.alert(n)}else{console.log(n);arguments.length>=2&&console.log(t)}}}function checkDeps(){if("string"===typeof r){if(""===r){window.alert("ChessBoard Error 1001: "+"The first argument to ChessBoard() cannot be an empty string."+"\n\nExiting...");return false}var e=document.getElementById(r);if(!e){window.alert('ChessBoard Error 1002: Element with id "'+r+'" does not exist in the DOM.'+"\n\nExiting...");return false}u=$(e)}else{u=$(r);if(1!==u.length){window.alert("ChessBoard Error 1003: The first argument to "+"ChessBoard() must be an ID or a single DOM node."+"\n\nExiting...");return false}}if(!window.JSON||"function"!==typeof JSON.stringify||"function"!==typeof JSON.parse){window.alert("ChessBoard Error 1004: JSON does not exist. "+"Please include a JSON polyfill.\n\nExiting...");return false}if(!(typeof window.$&&$.fn&&$.fn.jquery&&true===compareSemVer($.fn.jquery,n))){window.alert("ChessBoard Error 1005: Unable to find a valid version "+"of jQuery. Please include jQuery "+n+" or "+"higher on the page.\n\nExiting...");return false}return true}function validAnimationSpeed(e){return"fast"===e||"slow"===e||parseInt(e,10)+""===e+""&&e>=0}function expandConfig(){"string"!==typeof a&&true!==validPositionObject(a)||(a={position:a});"black"!==a.orientation&&(a.orientation="white");g=a.orientation;false!==a.showNotation&&(a.showNotation=true);true!==a.draggable&&(a.draggable=false);"trash"!==a.dropOffBoard&&(a.dropOffBoard="snapback");true!==a.sparePieces&&(a.sparePieces=false);true===a.sparePieces&&(a.draggable=true);(true!==a.hasOwnProperty("pieceTheme")||"string"!==typeof a.pieceTheme&&"function"!==typeof a.pieceTheme)&&(a.pieceTheme="img/chesspieces/wikipedia/{piece}.png");true===a.hasOwnProperty("appearSpeed")&&true===validAnimationSpeed(a.appearSpeed)||(a.appearSpeed=200);true===a.hasOwnProperty("moveSpeed")&&true===validAnimationSpeed(a.moveSpeed)||(a.moveSpeed=200);true===a.hasOwnProperty("snapbackSpeed")&&true===validAnimationSpeed(a.snapbackSpeed)||(a.snapbackSpeed=50);true===a.hasOwnProperty("snapSpeed")&&true===validAnimationSpeed(a.snapSpeed)||(a.snapSpeed=25);true===a.hasOwnProperty("trashSpeed")&&true===validAnimationSpeed(a.trashSpeed)||(a.trashSpeed=100);true===a.hasOwnProperty("position")&&("start"===a.position?m=deepCopy(i):true===validFen(a.position)?m=fenToObj(a.position):true===validPositionObject(a.position)?m=deepCopy(a.position):error(7263,"Invalid value passed to config.position.",a.position));return true}function calculateSquareSize(){var e=parseInt(u.width(),10);if(!e||e<=0)return 0;var r=e-1;while(r%8!==0&&r>0)r--;return r/8}function createElIds(){for(var e=0;e<t.length;e++)for(var r=1;r<=8;r++){var a=t[e]+r;O[a]=a+"-"+uuid()}var n="KQRBNP".split("");for(var e=0;e<n.length;e++){var o="w"+n[e];var i="b"+n[e];q[o]=o+"-"+uuid();q[i]=i+"-"+uuid()}}function buildBoardContainer(){var e='<div class="'+s.chessboard+'">';true===a.sparePieces&&(e+='<div class="'+s.sparePieces+" "+s.sparePiecesTop+'"></div>');e+='<div class="'+s.board+'"></div>';true===a.sparePieces&&(e+='<div class="'+s.sparePieces+" "+s.sparePiecesBottom+'"></div>');e+="</div>";return e}function buildBoard(e){"black"!==e&&(e="white");var r="";var n=deepCopy(t);var o=8;if("black"===e){n.reverse();o=1}var i="white";for(var u=0;u<8;u++){r+='<div class="'+s.row+'">';for(var p=0;p<8;p++){var d=n[p]+o;r+='<div class="'+s.square+" "+s[i]+" "+"square-"+d+'" '+'style="width: '+P+"px; height: "+P+'px" '+'id="'+O[d]+'" '+'data-square="'+d+'">';if(true===a.showNotation){("white"===e&&1===o||"black"===e&&8===o)&&(r+='<div class="'+s.notation+" "+s.alpha+'">'+n[p]+"</div>");0===p&&(r+='<div class="'+s.notation+" "+s.numeric+'">'+o+"</div>")}r+="</div>";i="white"===i?"black":"white"}r+='<div class="'+s.clearfix+'"></div></div>';i="white"===i?"black":"white";"white"===e?o--:o++}return r}function buildPieceImgSrc(e){if("function"===typeof a.pieceTheme)return a.pieceTheme(e);if("string"===typeof a.pieceTheme)return a.pieceTheme.replace(/{piece}/g,e);error(8272,"Unable to build image source for cfg.pieceTheme.");return""}function buildPiece(e,r,t){var a='<img src="'+buildPieceImgSrc(e)+'" ';t&&"string"===typeof t&&(a+='id="'+t+'" ');a+='alt="" '+'class="'+s.piece+'" '+'data-piece="'+e+'" '+'style="width: '+P+"px;"+"height: "+P+"px;";true===r&&(a+="display:none;");a+='" />';return a}function buildSparePieces(e){var r=["wK","wQ","wR","wB","wN","wP"];"black"===e&&(r=["bK","bQ","bR","bB","bN","bP"]);var t="";for(var a=0;a<r.length;a++)t+=buildPiece(r[a],false,q[r[a]]);return t}function animateSquareToSquare(e,r,t,n){var o=$("#"+O[e]);var i=o.offset();var u=$("#"+O[r]);var p=u.offset();var d=uuid();$("body").append(buildPiece(t,true,d));var c=$("#"+d);c.css({display:"",position:"absolute",top:i.top,left:i.left});o.find("."+s.piece).remove();var complete=function(){u.append(buildPiece(t));c.remove();"function"===typeof n&&n()};var f={duration:a.moveSpeed,complete:complete};c.animate(p,f)}function animateSparePieceToSquare(e,r,t){var n=$("#"+q[e]).offset();var o=$("#"+O[r]);var i=o.offset();var u=uuid();$("body").append(buildPiece(e,true,u));var p=$("#"+u);p.css({display:"",position:"absolute",left:n.left,top:n.top});var complete=function(){o.find("."+s.piece).remove();o.append(buildPiece(e));p.remove();"function"===typeof t&&t()};var d={duration:a.moveSpeed,complete:complete};p.animate(i,d)}function doAnimations(e,r,t){if(0!==e.length){v=true;var n=0;for(var o=0;o<e.length;o++){"clear"===e[o].type&&$("#"+O[e[o].square]+" ."+s.piece).fadeOut(a.trashSpeed,onFinish);"add"===e[o].type&&true!==a.sparePieces&&$("#"+O[e[o].square]).append(buildPiece(e[o].piece,true)).find("."+s.piece).fadeIn(a.appearSpeed,onFinish);"add"===e[o].type&&true===a.sparePieces&&animateSparePieceToSquare(e[o].piece,e[o].square,onFinish);"move"===e[o].type&&animateSquareToSquare(e[o].source,e[o].destination,e[o].piece,onFinish)}}function onFinish(){n++;if(n===e.length){drawPositionInstant();v=false;true===a.hasOwnProperty("onMoveEnd")&&"function"===typeof a.onMoveEnd&&a.onMoveEnd(deepCopy(r),deepCopy(t))}}}function squareDistance(e,r){e=e.split("");var a=t.indexOf(e[0])+1;var n=parseInt(e[1],10);r=r.split("");var o=t.indexOf(r[0])+1;var i=parseInt(r[1],10);var s=Math.abs(a-o);var u=Math.abs(n-i);return s>=u?s:u}function createRadius(e){var r=[];for(var a=0;a<8;a++)for(var n=0;n<8;n++){var o=t[a]+(n+1);e!==o&&r.push({square:o,distance:squareDistance(e,o)})}r.sort((function(e,r){return e.distance-r.distance}));var i=[];for(var a=0;a<r.length;a++)i.push(r[a].square);return i}function findClosestPiece(e,r,t){var a=createRadius(t);for(var n=0;n<a.length;n++){var o=a[n];if(true===e.hasOwnProperty(o)&&e[o]===r)return o}return false}function calculateAnimations(e,r){e=deepCopy(e);r=deepCopy(r);var t=[];var a={};for(var n in r)if(true===r.hasOwnProperty(n)&&true===e.hasOwnProperty(n)&&e[n]===r[n]){delete e[n];delete r[n]}for(var n in r)if(true===r.hasOwnProperty(n)){var o=findClosestPiece(e,r[n],n);if(false!==o){t.push({type:"move",source:o,destination:n,piece:r[n]});delete e[o];delete r[n];a[n]=true}}for(var n in r)if(true===r.hasOwnProperty(n)){t.push({type:"add",square:n,piece:r[n]});delete r[n]}for(var n in e)if(true===e.hasOwnProperty(n)&&true!==a.hasOwnProperty(n)){t.push({type:"clear",square:n,piece:e[n]});delete e[n]}return t}function drawPositionInstant(){p.find("."+s.piece).remove();for(var e in m)true===m.hasOwnProperty(e)&&$("#"+O[e]).append(buildPiece(m[e]))}function drawBoard(){p.html(buildBoard(g));drawPositionInstant();if(true===a.sparePieces)if("white"===g){c.html(buildSparePieces("black"));f.html(buildSparePieces("white"))}else{c.html(buildSparePieces("white"));f.html(buildSparePieces("black"))}}function calculatePositionFromMoves(e,r){e=deepCopy(e);for(var t in r)if(true===r.hasOwnProperty(t)&&true===e.hasOwnProperty(t)){var a=e[t];delete e[t];e[r[t]]=a}return e}function setCurrentPosition(e){var r=deepCopy(m);var t=deepCopy(e);var n=objToFen(r);var o=objToFen(t);if(n!==o){true===a.hasOwnProperty("onChange")&&"function"===typeof a.onChange&&a.onChange(r,t);m=e}}function isXYOnSquare(e,r){for(var t in C)if(true===C.hasOwnProperty(t)){var a=C[t];if(e>=a.left&&e<a.left+P&&r>=a.top&&r<a.top+P)return t}return"offboard"}function captureSquareOffsets(){C={};for(var e in O)true===O.hasOwnProperty(e)&&(C[e]=$("#"+O[e]).offset())}function removeSquareHighlights(){p.find("."+s.square).removeClass(s.highlight1+" "+s.highlight2)}function snapbackDraggedPiece(){if("spare"!==y){removeSquareHighlights();var e=$("#"+O[y]).offset();var r={duration:a.snapbackSpeed,complete:complete};d.animate(e,r);S=false}else trashDraggedPiece();function complete(){drawPositionInstant();d.css("display","none");true===a.hasOwnProperty("onSnapbackEnd")&&"function"===typeof a.onSnapbackEnd&&a.onSnapbackEnd(w,y,deepCopy(m),g)}}function trashDraggedPiece(){removeSquareHighlights();var e=deepCopy(m);delete e[y];setCurrentPosition(e);drawPositionInstant();d.fadeOut(a.trashSpeed);S=false}function dropDraggedPieceOnSquare(e){removeSquareHighlights();var r=deepCopy(m);delete r[y];r[e]=w;setCurrentPosition(r);var t=$("#"+O[e]).offset();var complete=function(){drawPositionInstant();d.css("display","none");true===a.hasOwnProperty("onSnapEnd")&&"function"===typeof a.onSnapEnd&&a.onSnapEnd(y,e,w)};var n={duration:a.snapSpeed,complete:complete};d.animate(t,n);S=false}function beginDraggingPiece(e,r,t,n){if("function"!==typeof a.onDragStart||false!==a.onDragStart(e,r,deepCopy(m),g)){S=true;w=r;y=e;b="spare"===e?"offboard":e;captureSquareOffsets();d.attr("src",buildPieceImgSrc(r)).css({display:"",position:"absolute",left:t-P/2,top:n-P/2});"spare"!==e&&$("#"+O[e]).addClass(s.highlight1).find("."+s.piece).css("display","none")}}function updateDraggedPiece(e,r){d.css({left:e-P/2,top:r-P/2});var t=isXYOnSquare(e,r);if(t!==b){true===validSquare(b)&&$("#"+O[b]).removeClass(s.highlight2);true===validSquare(t)&&$("#"+O[t]).addClass(s.highlight2);"function"===typeof a.onDragMove&&a.onDragMove(t,b,y,w,deepCopy(m),g);b=t}}function stopDraggedPiece(e){var r="drop";"offboard"===e&&"snapback"===a.dropOffBoard&&(r="snapback");"offboard"===e&&"trash"===a.dropOffBoard&&(r="trash");if(true===a.hasOwnProperty("onDrop")&&"function"===typeof a.onDrop){var t=deepCopy(m);"spare"===y&&true===validSquare(e)&&(t[e]=w);true===validSquare(y)&&"offboard"===e&&delete t[y];if(true===validSquare(y)&&true===validSquare(e)){delete t[y];t[e]=w}var n=deepCopy(m);var o=a.onDrop(y,e,w,t,n,g);"snapback"!==o&&"trash"!==o||(r=o)}"snapback"===r?snapbackDraggedPiece():"trash"===r?trashDraggedPiece():"drop"===r&&dropDraggedPieceOnSquare(e)}l.clear=function(e){l.position({},e)};l.destroy=function(){u.html("");d.remove();u.unbind()};l.fen=function(){return l.position("fen")};l.flip=function(){return l.orientation("flip")};l.move=function(){if(0!==arguments.length){var e=true;var r={};for(var t=0;t<arguments.length;t++)if(false!==arguments[t])if(true===validMove(arguments[t])){var a=arguments[t].split("-");r[a[0]]=a[1]}else error(2826,"Invalid move passed to the move method.",arguments[t]);else e=false;var n=calculatePositionFromMoves(m,r);l.position(n,e);return n}};l.orientation=function(e){if(0===arguments.length)return g;if("white"===e||"black"===e){g=e;drawBoard();return g}if("flip"===e){g="white"===g?"black":"white";drawBoard();return g}error(5482,"Invalid value passed to the orientation method.",e)};l.position=function(e,r){if(0===arguments.length)return deepCopy(m);if("string"===typeof e&&"fen"===e.toLowerCase())return objToFen(m);false!==r&&(r=true);"string"===typeof e&&"start"===e.toLowerCase()&&(e=deepCopy(i));true===validFen(e)&&(e=fenToObj(e));if(true===validPositionObject(e))if(true===r){doAnimations(calculateAnimations(m,e),m,e);setCurrentPosition(e)}else{setCurrentPosition(e);drawPositionInstant()}else error(6482,"Invalid value passed to the position method.",e)};l.resize=function(){P=calculateSquareSize();p.css("width",8*P+"px");d.css({height:P,width:P});true===a.sparePieces&&u.find("."+s.sparePieces).css("paddingLeft",P+h+"px");drawBoard()};l.start=function(e){l.position("start",e)};function isTouchDevice(){return"ontouchstart"in document.documentElement}function isMSIE(){return navigator&&navigator.userAgent&&-1!==navigator.userAgent.search(/MSIE/)}function stopDefault(e){e.preventDefault()}function mousedownSquare(r){if(true===a.draggable){var t=$(this||e).attr("data-square");true===validSquare(t)&&true===m.hasOwnProperty(t)&&beginDraggingPiece(t,m[t],r.pageX,r.pageY)}}function touchstartSquare(r){if(true===a.draggable){var t=$(this||e).attr("data-square");if(true===validSquare(t)&&true===m.hasOwnProperty(t)){r=r.originalEvent;beginDraggingPiece(t,m[t],r.changedTouches[0].pageX,r.changedTouches[0].pageY)}}}function mousedownSparePiece(r){if(true===a.sparePieces){var t=$(this||e).attr("data-piece");beginDraggingPiece("spare",t,r.pageX,r.pageY)}}function touchstartSparePiece(r){if(true===a.sparePieces){var t=$(this||e).attr("data-piece");r=r.originalEvent;beginDraggingPiece("spare",t,r.changedTouches[0].pageX,r.changedTouches[0].pageY)}}function mousemoveWindow(e){true===S&&updateDraggedPiece(e.pageX,e.pageY)}function touchmoveWindow(e){if(true===S){e.preventDefault();updateDraggedPiece(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY)}}function mouseupWindow(e){if(true===S){var r=isXYOnSquare(e.pageX,e.pageY);stopDraggedPiece(r)}}function touchendWindow(e){if(true===S){var r=isXYOnSquare(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY);stopDraggedPiece(r)}}function mouseenterSquare(e){if(false===S&&true===a.hasOwnProperty("onMouseoverSquare")&&"function"===typeof a.onMouseoverSquare){var r=$(e.currentTarget).attr("data-square");if(true===validSquare(r)){var t=false;true===m.hasOwnProperty(r)&&(t=m[r]);a.onMouseoverSquare(r,t,deepCopy(m),g)}}}function mouseleaveSquare(e){if(false===S&&true===a.hasOwnProperty("onMouseoutSquare")&&"function"===typeof a.onMouseoutSquare){var r=$(e.currentTarget).attr("data-square");if(true===validSquare(r)){var t=false;true===m.hasOwnProperty(r)&&(t=m[r]);a.onMouseoutSquare(r,t,deepCopy(m),g)}}}function addEvents(){$("body").on("mousedown mousemove","."+s.piece,stopDefault);p.on("mousedown","."+s.square,mousedownSquare);u.on("mousedown","."+s.sparePieces+" ."+s.piece,mousedownSparePiece);p.on("mouseenter","."+s.square,mouseenterSquare).on("mouseleave","."+s.square,mouseleaveSquare);if(true===isMSIE()){document.ondragstart=function(){return false};$("body").on("mousemove",mousemoveWindow).on("mouseup",mouseupWindow)}else $(window).on("mousemove",mousemoveWindow).on("mouseup",mouseupWindow);if(true===isTouchDevice()){p.on("touchstart","."+s.square,touchstartSquare);u.on("touchstart","."+s.sparePieces+" ."+s.piece,touchstartSparePiece);$(window).on("touchmove",touchmoveWindow).on("touchend",touchendWindow)}}function initDom(){createElIds();u.html(buildBoardContainer());p=u.find("."+s.board);if(true===a.sparePieces){c=u.find("."+s.sparePiecesTop);f=u.find("."+s.sparePiecesBottom)}var e=uuid();$("body").append(buildPiece("wP",true,e));d=$("#"+e);h=parseInt(p.css("borderLeftWidth"),10);l.resize()}function init(){if(true===checkDeps()&&true===expandConfig()){initDom();addEvents()}}init();return l};ChessBoard.fenToObj=fenToObj;ChessBoard.objToFen=objToFen;r=ChessBoard;var a=r;export default a;
