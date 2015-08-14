(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newsTemplate'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "	            <div class=\"well\">\r\n	                <h3 class=\"text-info\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\r\n	                    <p>\r\n	                        <strong>description</strong>: "
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "<br>\r\n	                        <strong>creator</strong>: "
    + alias3(((helper = (helper = helpers.creator || (depth0 != null ? depth0.creator : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"creator","hash":{},"data":data}) : helper)))
    + "<br>\r\n	                    </p>\r\n\r\n	                    <a href=\"#\" id='editBtn' class=\"btn btn-info\" identifier='"
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "'>Edit</a>\r\n	                    <a href=\"#\" id='delBtn' class=\"btn btn-info\" identifier='"
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "'>Delete</a>\r\n	              </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return " \r\n<div class=\"row\">\r\n\r\n	 <div class=\"col-sm-6\">\r\n	            \r\n	              <h3 class=\"text-info\">NEWS::</h3>\r\n"
    + ((stack1 = (helpers.list || (depth0 && depth0.list) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.news : depth0),{"name":"list","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n	        \r\n	</div>\r\n\r\n</div>";
},"useData":true});
})();