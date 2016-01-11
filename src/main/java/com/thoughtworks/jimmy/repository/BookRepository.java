package com.thoughtworks.jimmy.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import com.thoughtworks.jimmy.entity.BookEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookRepository extends PagingAndSortingRepository<BookEntity, String> {
    @Query("SELECT b FROM BookEntity b WHERE b.title like %?1%")
    Iterable<BookEntity> findByTitle(String title);
    Iterable<BookEntity> findByTitleContaining(String title);

    Iterable<BookEntity> findByCategoryCode(String categoryCode);

    Page<BookEntity> findAll(Pageable pageable);
}
