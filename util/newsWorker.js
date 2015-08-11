/* incantations*/

var News = require('../persistence/news.js');

/* incantations*/




var newsUtil = {


	create: function(req, res){
		
		
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

	displayAllNews : function(req, res){

		News.find({}, function(err, newss){

			if(err)
				throw err;

			
				return res.json(newss);


		});
	}

}

module.exports = newsUtil;
