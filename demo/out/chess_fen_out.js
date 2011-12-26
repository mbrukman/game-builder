var m=null;function o(a){return function(){return this[a]}}var p=this;function s(a,c){var b=a.split("."),d=p;!(b[0]in d)&&d.execScript&&d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)!b.length&&void 0!==c?d[e]=c:d=d[e]?d[e]:d[e]={}}function t(a,c){function b(){}b.prototype=c.prototype;a.m=c.prototype;a.prototype=new b};function u(a){return"undefined"!=typeof a&&a!=m};function v(a){this.b=a}v.prototype.color=o("b");function w(a,c){this.a=[];for(var b=0;b<c;++b){this.a[b]=[];for(var d=0;d<a;++d)this.a[b][d]=m}};function x(a){this.b=a}x.prototype.c=o("b");var B=new x("black"),C=new x("white");function D(a){this.g=a}D.prototype.c=o("g");var E=new D("pawn"),F=new D("knight"),G=new D("bishop"),H=new D("rook"),I=new D("queen"),J=new D("king");function K(a,c){switch(a){case B:case C:break;default:throw Error("Invalid piece color: "+a.c());}this.b=a;switch(c){case E:case F:case G:case H:case I:case J:break;default:throw Error("Invalid piece value: "+c.c());}this.g=c}t(K,v);K.prototype.color=o("b");
K.prototype.value=o("g");function L(a){switch(a){case "p":return E;case "n":return F;case "b":return G;case "r":return H;case "q":return I;case "k":return J;default:throw Error("Invalid piece char code: `"+a+"'");}}function M(a){this.b=a}M.prototype.c=o("b");var N=new M("dark"),P=new M("light");function Q(a,c){this.i=c||m;this.b=a}Q.prototype.f=function(a){this.i=a||m};Q.prototype.e=o("i");Q.prototype.color=o("b");
function R(a,c){w.call(this,a,c);this.a=[];for(var b=0;b<c;++b){this.a[b]=[];for(var d=0;d<a;++d)this.a[b][d]=new Q((b+d)%2?N:P,m)}}t(R,w);R.prototype.f=function(a,c,b){if(0<=a&&a<this.a.length&&0<=c&&c<this.a[0].length)this.a[a][c].f(b);else throw Error("Invalid coordinates for setPiece: ("+a+", "+c+")");};R.prototype.e=function(a,c){var b;0<=a&&a<this.a.length&&0<=c&&c<this.a[0].length?(b=[a,c],b=this.a[b[0]][b[1]].e()):b=m;return b};function S(a){R.call(this,a,a)}t(S,R);
function T(){S.call(this,8)}t(T,S);function U(a,c,b,d){this.h=a;if(2!=a.length)throw Error("`colors' should be an array of size 2");this.k=c;this.j=b;if(2!=b.length)throw Error("`images' should be an array of size 2");for(a=0;a<b.length;++a)if(6!=b[a].length)throw Error("`images' should be an array of 2x6, is:"+b[a].length);this.l=d}s("gamebuilder.games.chess.theme.Theme",U);var V=m;s("gamebuilder.games.chess.theme.DEFAULT_THEME",V);function W(){this.d=new T}s("gamebuilder.games.chess.FEN",W);
W.prototype.parse=function(a,c){a=a.replace(/\n/g," ").replace(/\r/g," ");a=a.replace(/^\s+/,"").replace(/\s+$/,"");if(0==a.length)return c.push("No FEN present"),!1;var b=a.split(" ");if(1>b.length)return c.push("FEN has no information"),!1;b=b[0];c.push(b);for(var b=b.split("/"),d=this.d.a.length,e=0,i;i=b[e];++e){if(e>=d)return c.push("Row "+(e+1)+" is outside board size: "+d),!1;var j=0;c.push("row: ["+i+"]");if(!(0<=e&&e<this.d.a.length))return c.push("More data in row "+(e+1)+" ("+j+") than the board has space ("+
this.d.a.length+")"),!1;for(var l=0,f;f=i[l++];)if("1"<=f&&"8">=f)j+=f-0;else{var g;g=f==f.toLowerCase()?B:C;var n=L(f.toLowerCase());g=new K(g,n);if(u(g))this.d.f(e,j++,g);else return c.push('Could not parse piece "'+f+'"'),!1}}return!0};
function X(){var a=document.getElementsByClassName("gamebuilder_chess_fen");if(u(a))for(var c=0,b;b=a[c++];){var d=new W,e=[];if(d.parse(b.innerHTML,e)){b.innerHTML="";var i=d.d,d=document.createElement("table"),j=d.insertRow(-1),l=document.createElement("td"),f=document.createElement("table");f.style.border="";f.style.cellPadding=f.cellSpacing=0;for(var e=i.a.length,g=0;g<e;++g){var n=f.insertRow(-1),k=document.createElement("td");k.appendChild(document.createTextNode((e-g).toString()));k.n="middle";
n.appendChild(k)}l.appendChild(f);j.appendChild(l);l=document.createElement("td");f=document.createElement("table");f.style.border="";f.style.cellPadding=f.cellSpacing=0;for(var y=V,Y=i.a[0].length,g=0;g<e;++g)for(var n=f.insertRow(-1),z=0;z<Y;++z){var r=i.e(g,z),A=k=document.createElement("td"),q=y,h;h=[g,z];h=i.a[h[0]][h[1]].color();a:switch(h){case P:q=q.h[0];break a;case N:q=q.h[1];break a;default:throw Error("Invalid color: "+h);}A.className=q;if(u(r)){q=A=document.createElement("img");h=r.color();
var r=r.value(),O=-1;switch(h){case C:O=0;break;case B:O=1;break;default:throw Error("Invalid color: "+h.c());}h=-1;switch(r){case E:h=0;break;case F:h=1;break;case G:h=2;break;case H:h=3;break;case I:h=4;break;case J:h=5;break;default:throw Error("Invalid piece: "+r.c());}q.src=y.k+"/"+y.j[O][h];A.className=y.l;k.appendChild(A)}n.appendChild(k)}l.appendChild(f);j.appendChild(l);i=d.insertRow(-1);i.appendChild(document.createElement("td"));j=document.createElement("td");n=document.createElement("table");
l=n.insertRow(-1);for(g=0;g<e;++g)k=document.createElement("td"),k.appendChild(document.createTextNode(String.fromCharCode(97+g))),k.align="center",l.appendChild(k);j.appendChild(n);i.appendChild(j);b.appendChild(d)}else b.innerHTML="Error: "+e.join("<br>")}}W.parseAllFenInDocument=X;s("demo.chess.showFenDiagrams",function(){var a=document.location.href.replace(/[^\/]*$/,"");V=new U(["light_sq","dark_sq"],a+"../data/images/chess/wikimedia",["pawn_w.png,knight_w.png,bishop_w.png,rook_w.png,queen_w.png,king_w.png".split(","),"pawn_b.png,knight_b.png,bishop_b.png,rook_b.png,queen_b.png,king_b.png".split(",")],"piece_img");X()});
