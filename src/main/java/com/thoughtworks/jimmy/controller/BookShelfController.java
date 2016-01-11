package com.thoughtworks.jimmy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.thoughtworks.jimmy.entity.BookEntity;
import com.thoughtworks.jimmy.service.BookService;

@RestController
@RequestMapping("/books")
public class BookShelfController {

    @Autowired
    private BookService bookService;

    @RequestMapping(method = RequestMethod.GET, value = "/title/{title}")
    public Iterable<BookEntity> queryByTitle(@PathVariable String title) {
        return bookService.findByTitle(title);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/category/{categoryName}")
    public Iterable<BookEntity> queryByCategoryName(@PathVariable String categoryName) {
        return bookService.findByCategoryName(categoryName);
    }
//
//    @RequestMapping(method = RequestMethod.GET)
//    public Iterable<BookEntity> query() {
//
//        return bookService.findAll();
//
//    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody BookEntity book) {

        bookService.create(book);

    }

    @RequestMapping(value = "{isbn}", method = RequestMethod.GET)
    public BookEntity get(@PathVariable String isbn) {

        return bookService.findByIsbn(isbn);

    }

    @RequestMapping(value = "{isbn}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable String isbn, @RequestBody BookEntity book) {

        if (isbn.equals(book.getIsbn())) {
            bookService.edit(book);
        }

    }

    @RequestMapping(value = "{isbn}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String isbn) {

        bookService.delete(isbn);

    }

//    @RequestMapping(value = "/params", method=RequestMethod.GET)
//    public Page<BookEntity> getEntryByParams(@RequestParam(value = "page", defaultValue = "0") Integer page,
//                                             @RequestParam(value = "size", defaultValue = "15") Integer size) {
//        Sort sort = new Sort(Sort.Direction.ASC, "isbn");
//        Pageable pageable = new PageRequest(page, size, sort);
//        return pageRepository.findAll(pageable);
//    }

    @RequestMapping(value = "", method=RequestMethod.GET)
    public Page<BookEntity> getEntryByPageable(@PageableDefault(value = 5, sort = { "isbn" }, direction = Sort.Direction.ASC)
                                                   Pageable pageable) {
        return bookService.findAll(pageable);
    }
}
