(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newsTemplate'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return " <div class=\"col-sm-6\">\r\n            <div class=\"well\">\r\n                <h3 class=\"text-info\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0['new'] : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n                    <p>\r\n                        <strong>description</strong>: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0['new'] : depth0)) != null ? stack1.description : stack1), depth0))
    + "<br>\r\n                        <strong>creator</strong>: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0['new'] : depth0)) != null ? stack1.creator : stack1), depth0))
    + "<br>\r\n                    </p>\r\n\r\n                    <a href=\"#\" class=\"btn btn-info\">Edit</a>\r\n                    <a href=\"#\" class=\"btn btn-info\">Delete</a>\r\n               \r\n\r\n        </div>\r\n</div>";
},"useData":true});
})();