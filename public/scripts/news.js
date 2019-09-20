$(function(){
    function loadNews(page, amount)
    {
        $.post(
            "/news",
            {
                page: page,
                amount: amount
            },
            showNews
        );
           
    }
    function showNews(data)
    {
        let arr = [];
        data.forEach(element => {
            arr['news_item'] = $('<div/>', {
                "class" : 'news-item col-sm-11 col-md-5 col-lg-3 item myborder'
            });
            arr['date_block'] = $('<div/>', {
                "class" : 'background-color-teal text-color-white date-block text-center'
            });
            let parts = element.published.split('.');
            let resDate = parts[2] + ' ' + part[1] + ' ' + part[3];
            $(arr['date_block']).text(resDate);
            arr['ref'] = $('<a/>', {
                "class" : 'item flex-grow-1 w-100 justify-content-around',
                "href" : 'news/' + element.contentId
            });
            arr['picture'] = $('<img/>', {
                "src" : element.photoId
            });
            arr['title'] = $('<p/>');
            arr['title'].text(element.title);
            $(arr['ref']).append(arr['picture']);
            $(arr['ref']).append(arr['title']);
            $(arr['news_item']).append(arr['date_block']);
            $(arr['news_item']).append(arr['ref']);
            $('#upload').append(arr['news_item']);
        });
    }   
    loadNews();
})