import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService, NBook } from './app.service';
import { Book } from './fakeDatabase';
import { error } from 'console';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getallBooks(): Book[] {
    return this.bookService.getAllBooks();
  }

  @Get('getById/:id')
  getBookByID(@Param('id') id : string): NBook {
    const book_id = +id;
    return this.bookService.findById(book_id)
  }

  @Post()
  addBook(@Body() book : Partial<Book>): NBook {
    const book_data = book;

    if (!book.author || !book.publicationYear || !book.title) return undefined;

    return this.bookService.create(book_data);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() book: Partial<Book>): NBook {
    return this.bookService.update(+id, book);
  }

  @Delete()
  delete(@Param('id') id: string) : Book[]{
    return this.delete(id);
  }
}
