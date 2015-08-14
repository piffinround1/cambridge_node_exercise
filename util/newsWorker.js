/* incantations*/

var News = require('../persistence/news.js');

/* incantations*/




var newsUtil = {


	create: function(req, res, next){
		
		
		News.findOne({title: req.body.title}, function(err, news){

			if(err)
				throw err;

			if(news)// there is already and existing with this title
				return res.json({msg:'News already exists with id:' + news._id});

			
			var newNews = new News();
			newNews.title = req.body.title;
			newNews.description = req.body.description;
			newNews.creator =  req.user._id;

			newNews.save(function(err){

				if(err)
					throw err;

				return res.json({msg:'New news created!'});


			});

		});

	},

	displayAllNews : function(req, res, next){

		News.find({}, function(err, newss){

			if(err)
				throw err;

				console.log(newss);
				return res.json({news:newss});


		});
	},

	displaySingleNews: function(req, res, next){

		News.findById(req.params.news_id, function(err, news){

			if(err)
				throw err;

			if(!news)
				return res.json({msg:'No news with id:'+req.params.news_id});

			return res.json(news);


		});


	},

	editSingleNews: function(req,res, next){
		console.log('req param id'+req.body._id);
		var details = {
			_id : req.body._id,
			description: req.body.description,
			title: req.body.title
		};

		News.findById(req.body._id, function(err, news){

			if(!news)
				return res.json({msg:'No Such news'});
				


				news.description = details.description;
				news.title = details.title;
				

				news.save(function(err){
					if(err)
						throw err;

					res.json({msg:'Edit done'});
				});


		});
	

	},

	deleteSingleNews: function(req,res, next){
		console.log('req param id'+req.body._id);
		

		News.findById(req.body._id, function(err, news){

			if(!news)
				return res.json({msg:'No Such news'});
				
			
			console.log(news.title);

			news.remove(function(err){
				if(err)
					throw err;

				res.json({msg:'Delete done'});
			});


		

		});
	

	}


}

module.exports = newsUtil;
