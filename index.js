const Blog = Backbone.Model.extend({
	defaults: {
		author: '', 
		title: '',
		url: ''
	}
});

// const blog1 = new Blog({
//     author: 'qqqq', 
//     title: 'www',
//     url: 'eeeeee'
// });

// const blog2 = new Blog({
//     author: 'aaaa', 
//     title: 'ssss',
//     url: 'dd'
// });

// console.log(blog1, blog1.toJSON())

const Blogs = Backbone.Collection.extend({});

const blogs = new Blogs();

// console.log(blogs, blogs.toJSON(), blogs.toArray())


const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.blogs-list-template').html());
  },
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel-blog': 'cancel',
    'click .delete-blog': 'delete',
  },
  edit: function() {
    $('.edit-blog').hide();
    $('.delete-blog').hide();
    this.$('.update-blog').show();
    this.$('.cancel-blog').show();

    const author = this.$('.author').html();
    const title = this.$('.title').html();
    const url = this.$('.url').html();

    this.$('.author').html('<input type="text" class="author-update" value="' + author + '">');
    this.$('.title').html('<input type="text" class="title-update" value="' + title + '">');
    this.$('.url').html('<input type="text" class="url-update" value="' + url + '">');
  },
  update: function() {
    this.model.set('author', $('.author-update').val());
    this.model.set('title', $('.title-update').val());
    this.model.set('url', $('.url-update').val());
  },
  cancel: function() {
    blogsView.render();
  },
  delete: function() {
    this.model.destroy();
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
    this.model.on('change', function() {
      setTimeout(() => {
        this.render();
      });
    }, this);
    this.model.on('remove', this.render, this);
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

const blogsView = new BlogsView();


$(document).ready(function() {
  $('.add-blog').on('click', function() {
    const blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    });
    $('.author-input').val('');
    $('.title-input').val('');
    $('.url-input').val('');
    blogs.add(blog);
  })
})