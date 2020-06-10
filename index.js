const Blog = Backbone.Model.extend({
	defaults: {
		author: '', 
		title: '',
		url: ''
	}
});

const blog1 = new Blog({
    author: 'qqqq', 
    title: 'www',
    url: 'eeeeee'
});

const blog2 = new Blog({
    author: 'aaaa', 
    title: 'ssss',
    url: 'dd'
});

console.log(blog1, blog1.toJSON())

const Blogs = Backbone.Collection.extend({});

const blogs = new Blogs([blog1, blog2]);

console.log(blogs, blogs.toJSON(), blogs.toArray())


const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.blogs-list-template').html())
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

const BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function() {
    this.model.on('add', this.render, this);
  },
  render: function() {
    const self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(blog) {
      self.$el.append((new BlogView({model: blog})).render().$el);
    });
    return this;
  }
});

const blogsView = new BlogView();


$(document).ready(function() {
  $('.add-blog').on('click', function() {
    const blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    });
    console.log(blog)
    blogs.add(blog);
  })
})