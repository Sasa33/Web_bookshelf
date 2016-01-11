
var createRow;
var deleteRow;

window.onload = function () {
    //var tableElements = [];
    var booksList = document.querySelector('tbody');

    deleteRow = function (isbn) {
        var rows = booksList.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; ++i) {
            if (rows[i].querySelector('.col-isbn').textContent === isbn) {
                booksList.removeChild(rows[i]);
            }
        }
    };

    createRow = function (book) {
        var tr = document.createElement('tr');

        if (!book) {
            return tr;
        }

        for (var key in tableHeaderMapper) {
            var td = document.createElement('td');
            td.textContent = book[tableHeaderMapper[key]];
            td.setAttribute('class', 'col-' + tableHeaderMapper[key]);
            tr.appendChild(td);
        }

        var td = document.createElement('td');
        var editBtn = document.createElement('a');
        editBtn.textContent = 'edit';
        editBtn.setAttribute('class', 'button');
        editBtn.setAttribute('href', '/pages/book/index.html?isbn=' + book[tableHeaderMapper.ISBN]);
        td.appendChild(editBtn);

        var deleteBtn = document.createElement('a');
        deleteBtn.textContent = 'delete';
        deleteBtn.setAttribute('class', 'button');
        deleteBtn.addEventListener('click', function () {
            $.ajax({
                url: baseUrl + '/' + book[tableHeaderMapper.ISBN],
                type: 'DELETE',
                success: function () {
                    deleteRow(book[tableHeaderMapper.ISBN]);
                }
            });
        });
        td.appendChild(deleteBtn);

        td.setAttribute('class', 'col-operates');
        tr.appendChild(td);


        return tr;
    };

    // display the books:
    $.ajax({
        url: baseUrl,
        dataType: 'json',
        success: function (books) { // books is the response object receiving from the database
            //if (!books.length) {
            //    booksList.appendChild(createRow());
            //} else {
            //    books.forEach(function (book) {
            //        var tr = createRow(book);
            //        tableElements.push(tr);
            //        booksList.appendChild(tr);
            //    });
            //}

            pagination(books);
        }
    });
};


function pagination(page) {
      //var tableElements = [];
      var booksList = document.querySelector('tbody');

      //var jsonCon = books.parseJSON();
      var jsonObj = eval(page);

      //var list = jsonObj.getJSONObject("content");
      var list = jsonObj["content"];

      var totalPage = jsonObj["totalPages"];
      var currentPage = jsonObj["number"];
      document.getElementById("curPage").innerHTML = currentPage;

      //var prePage = (currentPage - 1) ? (currentPage - 1) : 0;
      var prePage = currentPage - 1;
      if (prePage < 0) {
        prePage = 0;
        var prePageObj = $('#prePage');
        prePageObj.disabled = true;
        prePageObj.removeAttr("href");
        //document.getElementById("prePage").disabled = true;

      } else {
        document.getElementById("prePage").innerHTML = "<a href=\"javascript:void(0)\" onClick=\"goToPage('"+prePage+"')\">上一页</a>";
      }

      //var nextPage = (currentPage + 1 - totalPage) ? totalPage : (currentPage + 1);
      var nextPage = currentPage + 1;
      if (nextPage > totalPage) {
        nextPage = totalPage;
        var nextPageObj = $('#nextPage');
        nextPageObj.disabled = true;
        nextPageObj.removeAttr("href");
        //document.getElementById("nextPage").disabled = true;
      } else {
        document.getElementById("nextPage").innerHTML = "<a href=\"javascript:void(0)\" onClick=\"goToPage('"+nextPage+"')\">下一页</a>";
      }


      if (!list.length) {
        booksList.appendChild(createRow());
      } else {
        list.forEach(function (book) {
          var tr = createRow(book);
          //tableElements.push(tr);
          booksList.appendChild(tr);
        });
      }


      document.getElementById("firsPage").innerHTML = "<a href=\"javascript:void(0)\" onClick=\"goToPage('"+0+"')\">第一页</a>";
      document.getElementById("lastPage").innerHTML = "<a href=\"javascript:void(0)\" onClick=\"goToPage('"+(totalPage-1)+"')\">最末页</a>";
}


// change page
function goToPage(page) {
  $.ajax({
    type: "GET",
    url: baseUrl + '?page=' + page,
    data: 'json',
    contentType: "application/json; charset=utf-8",
    success: function (books) {
      pagination(books);
    }
  });
}
