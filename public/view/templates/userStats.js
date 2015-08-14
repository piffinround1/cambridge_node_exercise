(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['userStats'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"well\">\r\n	                <h3 class=\"text-info\">You Are logged in as</h3>\r\n	                    <p>\r\n	                        <strong>Name</strong>: "
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "<br>\r\n	                        \r\n	                    </p>\r\n\r\n	                    <a href=\"#\" id='createBtn' class=\"btn btn-info\">Create News</a>\r\n	                    <a href=\"/logout\" id='logoutBtn' class=\"btn btn-info\">Log Out</a>\r\n</div>";
},"useData":true});
})();