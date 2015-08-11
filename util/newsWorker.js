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
		//	newNews.creator = newNews.assignCreator(req);

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

			
				return res.json(newss);


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

		res.json({msg:'under construction lolz:'+req.params.news_id});


	}

}

module.exports = newsUtil;
