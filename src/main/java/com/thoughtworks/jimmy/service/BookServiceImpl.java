package com.thoughtworks.jimmy.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.thoughtworks.jimmy.entity.BookEntity;
import com.thoughtworks.jimmy.entity.CategoryEntity;
import com.thoughtworks.jimmy.repository.BookRepository;
import com.thoughtworks.jimmy.repository.CategoryRepository;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Iterable<BookEntity> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public BookEntity findByIsbn(String isbn) {
        return bookRepository.findOne(isbn);
    }

    @Override
    public void create(BookEntity book) {
        bookRepository.save(book);
    }

    @Override
    public void delete(String isbn) {
        bookRepository.delete(isbn);
    }

    @Override
    public void edit(BookEntity book) {
        bookRepository.save(book);
    }

    @Override
    public Iterable<BookEntity> findByTitle(String title) {
        return bookRepository.findByTitle(title);
//        return bookRepository.findByTitleContaining(title);
    }

    @Override
    public Iterable<BookEntity> findByCategoryName(String name) {
        CategoryEntity category = categoryRepository.findByName(name);
        Optional.ofNullable(category).orElseThrow(() -> new RuntimeException("Category not found !"));
        return bookRepository.findByCategoryCode(category.getCode());
    }

    public Page<BookEntity> findAll(Pageable pageable) {
        Page<BookEntity> books = bookRepository.findAll(pageable);
        return books;
    }

}
