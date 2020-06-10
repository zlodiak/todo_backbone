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

console.log(blogs, blogs.toJSON())