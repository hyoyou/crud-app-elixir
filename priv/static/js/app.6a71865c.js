(function(t){function e(e){for(var r,a,i=e[0],c=e[1],s=e[2],l=0,p=[];l<i.length;l++)a=i[l],o[a]&&p.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);f&&f(e);while(p.length)p.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var t,e=0;e<u.length;e++){for(var n=u[e],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={app:0},u=[];function a(t){return i.p+"js/"+({about:"about"}[t]||t)+"."+{about:"d288b4f1"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,r){n=o[t]=[e,r]});e.push(n[2]=r);var u,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=a(t),u=function(e){c.onerror=c.onload=null,clearTimeout(s);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),u=e&&e.target&&e.target.src,a=new Error("Loading chunk "+t+" failed.\n("+r+": "+u+")");a.type=r,a.request=u,n[1](a)}o[t]=void 0}};var s=setTimeout(function(){u({type:"timeout",target:c})},12e4);c.onerror=c.onload=u,document.head.appendChild(c)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var f=s;u.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"2de4":function(t,e,n){"use strict";var r=n("d9ce"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" |\n    "),n("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),n("router-view")],1)},u=[],a=(n("5c0b"),n("2877")),i={},c=Object(a["a"])(i,o,u,!1,null,null,null),s=c.exports,l=n("8c4f"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("BucketList",{attrs:{msg:"Travel Bucket List"}})],1)},p=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bucket-list"},[n("h1",[t._v(t._s(t.msg))]),n("h3",[t._v("Add to the Bucket!")]),t._m(0)])},v=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",[t._v("\n    I want to "),n("input",{attrs:{type:"text",name:"activity",value:"insert activity here!"}}),t._v(" in "),n("input",{attrs:{type:"text",name:"location",value:"insert location here!"}}),t._v(".\n    "),n("input",{attrs:{type:"submit",value:"Add"}})])}],m={name:"BucketList",props:{msg:String}},h=m,b=(n("2de4"),Object(a["a"])(h,d,v,!1,null,"6a9c95c2",null)),y=b.exports,_={name:"home",components:{BucketList:y}},g=_,w=Object(a["a"])(g,f,p,!1,null,null,null),j=w.exports;r["a"].use(l["a"]);var k=new l["a"]({routes:[{path:"/",name:"home",component:j},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),O=n("2f62");r["a"].use(O["a"]);var x=new O["a"].Store({state:{},mutations:{},actions:{}});r["a"].config.devtools=!0,r["a"].config.productionTip=!1,new r["a"]({router:k,store:x,render:function(t){return t(s)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("5e27"),o=n.n(r);o.a},"5e27":function(t,e,n){},d9ce:function(t,e,n){}});
//# sourceMappingURL=app.6a71865c.js.map