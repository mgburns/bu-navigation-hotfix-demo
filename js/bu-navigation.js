var bu=bu||{};bu.plugins=bu.plugins||{};bu.plugins.navigation={};
(function(){bu.signals=function(){var c={},n=this;return{listenFor:function(k,d){void 0===c[k]&&(c[k]=[]);c[k].push(d);return n},broadcast:function(k,d){var b;if(c[k])for(b=0;b<c[k].length;b+=1)c[k][b].apply(this,d||[]);return n}}}();bu.hooks=function(){var c={},n=this;return{addFilter:function(k,d){void 0===c[k]&&(c[k]=[]);c[k].push(d);return n},applyFilters:function(k,d){if(void 0===c[k])return d;var b=Array.prototype.slice.apply(arguments).slice(1),f=d,h;for(h=0;h<c[k].length;h+=1)f=c[k][h].apply(this,
b);return f}}}()})(jQuery);
(function(c){var n=bu.plugins.navigation;n.settings={lazyLoad:!0,showCounts:!0,showStatuses:!0,deselectOnDocumentClick:!0};c(document).ready(function(){!0===c.browser.msie&&7==parseInt(c.browser.version,10)&&c(document.body).addClass("ie7");!0===c.browser.msie&&8==parseInt(c.browser.version,10)&&c(document.body).addClass("ie8");!0===c.browser.msie&&9==parseInt(c.browser.version,10)&&c(document.body).addClass("ie9")});n.tree=function(c,d){"undefined"===typeof c&&(c="base");return n.trees[c](d).initialize()};
n.trees={base:function(k,d){var b={},d=d||{};c.extend(!0,b,bu.signals);b.config=c.extend({},n.settings,k||{});b.data={treeConfig:{},rollback:void 0};var f=b.config,h=b.data,e=b.$el=c(f.el);if(0===e.length)throw new TypeError("Invalid DOM selector, can't create BU Navigation Tree");if(f.themePath&&document.images){var l=new Image,m=new Image;l.src=f.themePath+"/sprite.png";m.src=f.themePath+"/throbber.gif"}var l=function(a){return bu.hooks.applyFilters("canSelectNode",a)},m=function(a){return bu.hooks.applyFilters("canHoverNode",
a)},p=function(a){return bu.hooks.applyFilters("canDragNode",a)};h.treeConfig={plugins:"themes types json_data ui dnd crrm bu".split(" "),core:{animation:0,html_titles:!0},themes:{theme:"bu",load_css:!1},types:{types:{"default":{max_children:-1,max_depth:-1,valid_children:"all",select_node:l,hover_node:m,start_drag:p},page:{max_children:-1,max_depth:-1,valid_children:"all",select_node:l,hover_node:m,start_drag:p},section:{max_children:-1,max_depth:-1,valid_children:"all",select_node:l,hover_node:m,
start_drag:p},link:{max_children:0,max_depth:0,valid_children:"none",select_node:l,hover_node:m,start_drag:p},denied:{select_node:!1,hover_node:!1,start_drag:!1}}},json_data:{ajax:{url:f.rpcUrl,type:"POST",data:function(a){return{child_of:a.attr?d.stripNodePrefix(a.attr("id")):0,post_types:f.postTypes,post_statuses:f.postStatuses,instance:f.instance,prefix:f.nodePrefix}}},progressive_render:!0},crrm:{move:{default_position:"first",check_move:function(a){var g=d.nodeToPost(a.o),i=!0;-1===a.cr&&(!1===
g.meta.excluded&&!f.allowTop)&&(i=!1);return bu.hooks.applyFilters("moveAllowed",i,a,b)}}},bu:{lazy_load:f.lazyLoad}};f.showCounts&&(h.treeConfig.json_data.progressive_render=!1);f.initialTreeData&&(h.treeConfig.json_data.data=f.initialTreeData);h.treeConfig=bu.hooks.applyFilters("buNavTreeSettings",h.treeConfig,e);b.initialize=function(){e.jstree(h.treeConfig);return b};b.selectPost=function(a,g){var g=g||!0,i=d.getNodeForPost(a);g&&e.jstree("deselect_all");e.jstree("select_node",i)};b.getSelected=
function(){var a=e.jstree("get_selected");return d.nodeToPost(a)};b.getPost=function(a){a=d.getNodeForPost(a);return d.nodeToPost(a)};b.getPosts=function(a){var g=[],i={},f,s;(a?c.jstree._reference(e)._get_node("#"+a):e).find("> ul > li").each(function(a,j){j=c(j);f=j.attr("id");s=j.data("post_type");"new"!=s&&(f=d.stripNodePrefix(f));i={ID:f,type:s,status:j.data("post_status"),title:e.jstree("get_text",j),content:j.data("post_content"),meta:j.data("post_meta")};j.find("> ul > li").length&&(i.children=
b.getPosts(j.attr("id")));g.push(i)});return g};b.showAll=function(){e.jstree("open_all")};b.hideAll=function(){e.jstree("close_all")};b.getPostLabel=function(a){a=d.getNodeForPost(a);return e.jstree("get_text",a)};b.setPostLabel=function(a,g){var i=d.getNodeForPost(a);e.jstree("set_text",i,g)};b.insertPost=function(a,g){var i=e.jstree("get_selected"),b=0<i.length,i=c.extend({which:b?i:null,position:b?"after":"before",skip_rename:!0,callback:function(a){e.jstree("deselect_all");e.jstree("select_node",
a)}},g),b=d.postToNode(a);e.jstree("create",i.which,i.position,b,i.callback,i.skip_rename);return a};b.updatePost=function(a){var g=d.getNodeForPost(a),i;g&&(i=d.nodeToPost(g),i=c.extend(!0,{},i,a),e.jstree("set_text",g,i.title),g.data("post_content",i.content),g.data("post_title",i.title),g.data("post_status",i.status),g.data("post_type",i.type),g.data("post_parent",parseInt(i.parent,10)),g.data("menu_order",parseInt(i.menu_order,10)),g.data("post_meta",i.meta));f.showStatuses&&q(g);b.broadcast("updatePost",
[i]);return i};b.removePost=function(a){a&&"undefined"===typeof a?(a=e.jstree("get_selected"),d.nodeToPost(a)):a=d.getNodeForPost(a);e.jstree("remove",a)};b.getAncestors=function(a){a=d.getNodeForPost(a);return e.jstree("get_path",a)};b.save=function(){h.rollback=e.jstree("get_rollback")};b.restore=function(){"undefined"!==typeof h.rollback&&(c.jstree.rollback(h.rollback),h.rollback=e.jstree("get_rollback"))};d.nodeToPost=function(a){if("undefined"===typeof a)throw new TypeError("Invalid node!");
var g=a.attr("id");-1===g.indexOf("post-new")&&(g=parseInt(d.stripNodePrefix(g),10));a={ID:g,title:e.jstree("get_text",a),content:a.data("post_content"),status:a.data("post_status"),type:a.data("post_type"),parent:parseInt(a.data("post_parent"),10),menu_order:parseInt(a.data("menu_order"),10),meta:a.data("post_meta")||{}};return bu.hooks.applyFilters("nodeToPost",a)};d.postToNode=function(a){if("undefined"===typeof a)throw new TypeError("Invalid post!");var g={ID:d.getNextPostID(),title:"Untitled Post",
content:"",status:"new",type:"page",parent:0,menu_order:0,meta:{}},a=c.extend({},g,a);return bu.hooks.applyFilters("postToNode",{attr:{id:a.ID?f.nodePrefix+a.ID:"post-new-"+a.ID,rel:a.type},data:{title:a.title},metadata:{post_status:a.status,post_type:a.type,post_content:a.content,post_parent:a.parent,menu_order:a.menu_order,post_meta:a.meta}})};d.getNodeForPost=function(a){if("undefined"===typeof a)throw new TypeError("Invalid post!");a=a&&"object"===typeof a?a.ID.toString():a.toString();-1===a.indexOf("post-new")&&
(a=f.nodePrefix+a);a=c.jstree._reference(e)._get_node("#"+a);return a.length?a:!1};d.getNextPostID=function(){return c('[id*="post-new-"]').length};d.stripNodePrefix=function(a){return a.replace(f.nodePrefix,"")};var j=function(a,g){var b,d,e,g=g||!0;b=a.find("li").length;e=a.children("a");b?(d=e.find("> .title-count > .count"),0===d.length&&(d=c('<span class="count"></span>'),e.children(".title-count").append(d)),d.text("("+b+")")):e.find("> .title-count > .count").remove();g&&a.find("> ul > li").each(function(){j(c(this))})},
q=function(a){var g=a.children("a");0===g.children(".post-statuses").length&&g.append('<span class="post-statuses"></span>');var a=d.nodeToPost(a),b=a.meta.excluded||!1,e=a.meta.restricted||!1,g=g.children(".post-statuses").empty(),c=[];"publish"!=a.status&&c.push({"class":a.status,label:a.status});b&&c.push({"class":"excluded",label:"not in nav"});e&&c.push({"class":"restricted",label:"restricted"});c=bu.hooks.applyFilters("navPostStatuses",c);for(a=0;a<c.length;a++)g.append('<span class="post_status '+
c[a]["class"]+'">'+c[a].label+"</span>")},r=function(a){var b;0===a.children("ul").length?a.attr("rel","page"):a.attr("rel","section");f.showCounts&&(b=a.parentsUntil("#"+e.attr("id"),"li"),b=b.length?b.last():a,j(b))};e.bind("loaded.jstree",function(){var a=e.find("> ul > li:first-child"),a=18<=a.height()?a.height():32;e.jstree("data").data.core.li_height=a;b.broadcast("postsLoaded")});e.bind("reselect.jstree",function(){e.data("initial-save")||(e.data("initial-save",!0),b.save());b.broadcast("postsSelected")});
e.bind("load_node.jstree",function(a,b){if(-1!==b.rslt.obj){var c=b.rslt.obj;f.showCounts&&j(c)}});f.showStatuses&&e.bind("clean_node.jstree",function(a,b){var d=b.rslt.obj;d&&-1!==d&&d.each(function(a,b){var d=c(b);0===d.find("> a > .post-statuses").length&&q(d)})});e.bind("create_node.jstree",function(a,c){var e=d.nodeToPost(c.rslt.obj);b.broadcast("postCreated",[e])});e.bind("select_node.jstree",function(a,c){var e=d.nodeToPost(c.rslt.obj);b.broadcast("selectPost",[e,b])});e.bind("create.jstree",
function(a,c){var e=c.rslt.parent,f=c.rslt.position,j=d.nodeToPost(c.rslt.obj),h=null;-1!==e&&(h=d.nodeToPost(e),r(e));j.parent=h?h.ID:0;j.menu_order=f+1;b.broadcast("insertPost",[j])});e.bind("remove.jstree",function(a,c){var e=d.nodeToPost(c.rslt.obj),f=c.rslt.parent;-1!==f&&r(f);b.broadcast("removePost",[e])});e.bind("deselect_node.jstree",function(a,c){var e=d.nodeToPost(c.rslt.obj);b.broadcast("deselectPost",[e,b])});e.bind("move_node.jstree",function(a,c){var f=d.nodeToPost(c.rslt.o),j=c.rslt.np,
h=c.rslt.op,k=c.rslt.o.index()+1,l=0;e.attr("id")!==j.attr("id")&&(r(j),l=parseInt(d.stripNodePrefix(j.attr("id")),10));e.attr("id")!==h.attr("id")&&!j.is("#"+h.attr("id"))&&r(h);f.parent=l;f.menu_order=k;b.updatePost(f);b.broadcast("postMoved",[f,l,k])});l=function(a){var b=c.contains(e[0],a.target),a=c.contains(c("#vakata-contextmenu")[0],a.target);!b&&!a&&e.jstree("deselect_all")};f.deselectOnDocumentClick&&c(document).bind("click",l);return b},navman:function(k,d){var b={},d=d||{},b=n.trees.base(k,
d),f=b.$el,h=b.data;h.treeConfig.plugins.push("contextmenu");h.treeConfig.contextmenu={show_at_node:!1,items:function(){return{edit:{label:"Edit",action:e,icon:"remove"},remove:{label:"Remove",action:l}}}};var e=function(c){c=d.nodeToPost(c);b.broadcast("editPost",[c])},l=function(c){c=d.nodeToPost(c);b.removePost(c)};f.bind("loaded.jstree",function(){f.undelegate("a","contextmenu.jstree")});f.bind("clean_node.jstree",function(b,d){var e=d.rslt.obj;e&&-1!=e&&e.each(function(a,b){var e=c(b).children("a");
if(!e.children(".edit-options").length){var d=c('<button class="edit-options"><ins class="jstree-icon">&#160;</ins>options</button>'),f=e.children(".post-statuses");f.length?f.before(d):e.append(d)}})});var m=null;f.delegate(".edit-options","click",function(b){b.preventDefault();b.stopPropagation();var b=c(this).offset(),e=c(this).height()+5,d=c(this).parent("a").parent("li");f.jstree("deselect_all");c(this).addClass("clicked");f.jstree("select_node",d);f.jstree("show_contextmenu",d,b.left,b.top+
e);m&&m.attr("id")!=d.attr("id")&&p(m);m=d});c(document).bind("context_hide.vakata",function(){p(m)});var p=function(b){b&&b.find("> a > .edit-options").removeClass("clicked")};return b},edit_post:function(k,d){var d=d||{},b=n.trees.base(k,d),f=b.data,h=c.extend(b.config,k||{}),e=b.$el,l=h.currentPost,m={},p=[],j;if(h.ancestors&&h.ancestors.length){var q=h.ancestors.reverse();for(j=0;j<q.length;j+=1)p.push("#"+h.nodePrefix+h.ancestors[j])}p.length&&(m.core={initially_open:p});c.extend(!0,f.treeConfig,
m);f=function(b){return d.stripNodePrefix(b.attr("id"))==l.ID};bu.hooks.addFilter("canSelectNode",f);bu.hooks.addFilter("canHoverNode",f);bu.hooks.addFilter("canDragNode",f);e.bind("reselect.jstree",function(){d.getNodeForPost(l)||"new"===l.status&&b.insertPost(l,{pos:"before"});b.selectPost(l);b.save()});b.getCurrentPost=function(){if(null===l||"undefined"===typeof l)return!1;var b=d.getNodeForPost(l);return b?d.nodeToPost(b):!1};b.setCurrentPost=function(b){l=b};b.scrollToSelection=function(){var b=
e.jstree("get_selected");if(b.length){c(document);e.css("overflow");var a=e.innerHeight(),b=b.position().top+b.height()/2-a/2;0<b&&e.scrollTop(b)}};return b}}})(jQuery);