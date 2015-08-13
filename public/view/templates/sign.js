(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sign'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\r\n\r\n <h1><span class=\"fa fa-sign-in\"></span> "
    + alias3(((helper = (helper = helpers.sign || (depth0 != null ? depth0.sign : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sign","hash":{},"data":data}) : helper)))
    + "</h1>\r\n\r\n\r\n        <div class=\"form-group\">\r\n            <label>Email</label>\r\n            <input type=\"text\" class=\"form-control\" name=\"email\" id = 'username'>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label>Password</label>\r\n            <input type=\"password\" class=\"form-control\" name=\"password\" id = 'password'>\r\n        </div>\r\n\r\n        <button id='submitBtn' class=\"btn btn-warning btn-lg\" identifier = '"
    + alias3(((helper = (helper = helpers.sign || (depth0 != null ? depth0.sign : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sign","hash":{},"data":data}) : helper)))
    + "'>"
    + alias3(((helper = (helper = helpers.sign || (depth0 != null ? depth0.sign : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sign","hash":{},"data":data}) : helper)))
    + "</button>\r\n\r\n";
},"useData":true});
})();