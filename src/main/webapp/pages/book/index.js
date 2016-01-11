window.onload = function () {
    var isbn = getQueryParam('isbn');

    if (isbn) {

      //$('[name=ISBN]').disabled = true;
      $('[name=ISBN]').attr("disabled", true);


      /*用jquery 实现GET方式调用api请求*/

      $.ajax({
        type: "GET",
        url: baseUrl + '/' + isbn,
        data: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          //location.href = '/pages/book/index.html?isbn='+isbn;
          $('[name=Title]').val(data.title);
          $('[name=Author]').val(data.author);
          $('[name=ISBN]').val(data.isbn);
          $('[name^="Price"]').val(data.price);
        }
      });
    }


    var form = document.querySelector('.form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formElements = e.target.elements;
        var book = {};
        for (var i = 0; i < formElements.length - 1; ++i) {
            book[tableHeaderMapper[formElements[i].name]] = formElements[i].value;
        }
        if (isbn) {
            /*用jquery 实现PUT方式调用api请求
            */
          $.ajax({
            type: 'PUT',
            url: baseUrl + '/' + isbn,
            data: JSON.stringify(book),
            contentType: "application/json; charset=utf-8",
            success: function () {
              location.href = '/index.html';
            }
          });
        } else {
            $.ajax({
                type: "POST",
                url: baseUrl,
                data: JSON.stringify(book),
                contentType: "application/json; charset=utf-8",
                success: function () {
                    location.href = '/index.html';
                }
            });
        }
    });
};
