var glue = {
  templates:  {},
  views: {},
  fetchTemplate: function(template, success){
    $.get('/mustaches/'+template+'.html.mustache', null, function(mustache){
      glue.templates[template]=mustache;
      if(success !== null) {success(template);}
    });
  },

  fetchView: function(view_path, success) {
    $.getJSON(view_path, function(view){
      glue.views[view_path] = view;
      if(success !== null) { success(view);}
    });
  },								 

  renderMustache: function(template, view_path, success){ 
    var html = $.mustache(glue.templates[template], glue.views[view_path]);
    success(html);
  },

  render:  function(template, view_path, success){
    glue.fetchTemplate(template, function(){
      glue.fetchView(view_path, function(){
        glue.renderMustache(template, view_path, success);
      });
    });
  }
};
