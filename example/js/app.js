/*! oop.js/example - http://oopjs.com/ - Written by Andrew Ewing - http://github.com/aewing - 2014-06-28 */
var OOP=function(){this.config={debug:!1,debugLevel:1,baseURL:"/"},this.debug=function(){if($oop.config.debug)try{console.log("[OOPJS]",arguments)}catch(a){}},this.new=function(a){var b=$oop.getClass(a),c=new OOP.Object;if(c._name=a,b._ancestors=$oop._extractAncestors(b._ancestors),b._ancestors.length>0)for(var d in b._ancestors){var e=$oop.getClass(b._ancestors[d]);c=$oop._extend(c,e._userland);for(var f in b._ancestors)c._ancestors.push(b._ancestors[f])}return c=$oop._extend(c,b._userland),function(a){return function(){return"undefined"!=typeof a.construct&&a.construct.apply(a,arguments),a}}(c)},this._extractAncestors=function(a){a=a||[];for(var b in a){var c=$oop.getClass(a[b]),d=$oop._extractAncestors(c._ancestors);for(var e in d)a.push(d[e])}return a},this._classRegistry={},this.getClass=function(a){var b=this._classRegistry[a];if("undefined"==typeof b)throw'Class "'+a+'" is undefined';return b},this.ready=function(a){if($oop._onReady.push(a),$oop._ready){for(var b in $oop._onReady)$oop._onReady[b]();$oop._onReady=[]}},this.contains=function(a,b){for(var c in b)if(b[c]===a)return!0;return!1},this.clone=function(a){var b;if("function"==typeof a){b=function(){};var c=new a;for(var d in c)b[d]=c[d];for(var e in c.prototype)b[e]=c[e]}else if(b={},"object"==typeof a)for(var f in a)b[f]=a[f];return b},this.onHook=function(a,b){if("undefined"==typeof $oop._hooks[a]&&($oop._hooks[a]=[]),"function"!=typeof b)throw"Hook method must be a function";$oop._hooks[a].push(b)},this.hook=function(a,b){if("object"==typeof $oop._hooks[a])for(var c in $oop._hooks[a]){var d=$oop._hooks[a][c];if("function"==typeof d){var e=d(b);"undefined"!=typeof e&&e.length>0&&(b=e)}}return b},this._extend=function(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];for(var f in a.prototype)c[f]=a.prototype[f];for(var g in b.prototype)c[g]=b.prototype[g];return c},this._ready=!1,this._onReady=[],this._hooks={}};OOP.Class=function(a){return this._name=a||"OOP.Class",this._ancestors=[],this._userland={},$oop._classRegistry[a]=this,window[a]=function(){return $oop.new(a).apply(this,arguments)},this},OOP.Class.prototype.extends=function(a){return this._ancestors.push(a),this},OOP.Class.prototype.via=function(a){this._userland={};var b=new a;for(var c in b)this._userland[c]=b[c];for(var d in b.prototype)this._userland[d]=b.prototype[d];return this},OOP.Object=function(){this._name="OOP.Object",this._ancestors=[]},OOP.Object.prototype.getParent=function(){return $oop.getClass(this._ancestors[this._ancestors.length])._userland||!1},OOP.Object.prototype.instanceOf=function(a){return $oop.contains(a,this._ancestors)};var $class=function(a){return new OOP.Class(a)},$oop=window.$oop=new OOP,$new=$oop.new;window.onload=function(){$oop._ready=!0,$oop.debug("Window is ready, processing ready callbacks"),$oop.ready(function(){$oop.debug("OOP is ready")})},$class("Elem").via(function(){this._selector=null,this._dom=null,this._oop=!0,this.construct=function(a){if("object"==typeof a){if("undefined"!=typeof a._oop)return this.apply(a),this;this._dom=[a],this._selector=a}else this._selector=a,this._dom=document.querySelectorAll(this._selector);return this},this.dom=function(){return this._dom},this.each=function(a){for(var b in this._dom)"object"==typeof this._dom[b]&&a.apply($elem(this._dom[b]))},this.event=function(a,b){this.each(function(){var c=this.dom()[0],d=function(a){return function(){b.apply(a)}}(this);c.addEventListener?c.addEventListener(a,d,!1):c.attachEvent("on"+a,d)})},this.val=function(a){return"undefined"!=typeof a?(this.each(function(){this.value=a}),this):this._dom[0].value},this.attr=function(a,b){if("undefined"==typeof b)return this._dom[0].getAttribute(a);for(var c in this._dom)this._dom[c].setAttribute(a,b)}}),OOP._elemCache={},$elem=function(a){return $new("Elem")(a)},OOP.HTTPRequest=function(){this.options={method:"GET",url:"/",async:!0,user:void 0,password:void 0,cache:!1},this.response=null,this.open=function(a){if(this.options=OOP.extract(this.options,a),-1===this.options.url.indexOf("//")){var b=window.location.href.split("/"),c=b[0],d=b[2];this.options.url=c+"//"+d+this.options.url}if(this.options.cache&&"undefined"!=typeof Storage){var e=localStorage.getItem(this.options.url);if(e)return this.options.json&&(e=JSON.parse(e)),"function"==typeof this.options.success?this.options.success(e,{cached:!0}):"function"==typeof this.options.response&&this.options.response(e,{cached:!0}),this}this.xhr=new XMLHttpRequest;try{this.xhr.open(this.options.method,this.options.url,this.options.async,this.options.user,this.options.password),this.xhr.onreadystatechange=function(a){return function(b){a.stateChange(b,this)}}(this),this.xhr.send()}catch(f){}return this},this.stateChange=function(a,b){($oop.config.debugLevel>1||4===b.readyState)&&$oop.Debug("[Request:"+this.options.url+"] State change: "+b.readyState),this.state=b.readyState,4===this.state&&(this.response=b,this.responseData=b.responseText,200==b.status&&this.options.cache&&"undefined"!=typeof Storage&&localStorage.setItem(this.options.url,this.responseData),200==b.status&&this.options.json&&(this.responseData=JSON.parse(this.responseData)),200===b.status&&"function"==typeof this.options.success?this.options.success(this.responseData,b):200!==b.status&&"function"==typeof this.options.failure?this.options.failure(b):"function"==typeof this.options.response&&this.options.response(this.responseData,b))},this.filter=function(a){return a.responseText}},$class("HTTPRequest").via(OOP.HTTPRequest),OOP.Router=function(){this.routes=[],this.defaultRoute=!1,this.construct=function(){window.output("OOPJS Router initialized.")},this.addRoute=function(a,b){$oop.debug("Route added: "+a),this.routes[a]=b},this.addRoutes=function(a){for(var b in a)this.addRoute(b,a[b])},this.route=function(a){return"undefined"!=typeof this.routes[a]?($oop.debug("Route matched: ",a),this.routes[a]()):$oop.debug("Route not found: "+a),!1},this.path=function(){var a=window.location.href.split("/"),b=a[0],c=a[2];return a=window.location.href.replace(b+"//"+c,"").replace($oop.config.baseURL.replace(b+"//"+c,""),""),"/"!==a.substr(0,1)&&(a="/"+a),a}},$class("Router").via(OOP.Router),OOP.ModelReserved=["construct","update","set","get","delete","save","_original"],OOP.Model=function(){this.construct=function(a){"undefined"!=typeof a&&(this._original=a,this.update(a))},this.update=function(a){for(var b in a)$oop.contains(b,OOP.ModelReserved)||(this[b]=a[b])},this.set=function(a,b){return"object"==typeof a?this.update(a):($oop.contains(a,OOP.ModelReserved)||(this[a]=b),this)},this.get=function(a){return $oop.contains(a,OOP.ModelReserved)?!1:this[a]||!1}},$class("Model").via(OOP.Model),OOP.Controller=function(){this.action=function(a){return"function"==typeof this[a]?this[a]():void $oop.debug('Error - Invalid action requested: "'+a+'" in '+this._name)}},$class("Controller").via(OOP.Controller),$class("IndexController").extends("Controller").via(function(){this.index=function(){window.output("Index action detected (app/controllers/index.js)")}}),$oop.config.baseURL="/oopjs/example/",$oop.ready(function(){var a=$new("Router")();window.appRoutes={},window.appRoutes["/"]=function(){var a=$new("IndexController")();return a.action("index")},a.addRoutes(window.appRoutes),a.route(a.path())});