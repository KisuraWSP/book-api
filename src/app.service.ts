import { Injectable } from '@nestjs/common';
import { Book, books } from './fakeDatabase';


export type NBook = Book | undefined;
@Injectable()
export class BookService {
  getAllBooks(): Book[] {
    return books;
  }

  findById(book_id : number): NBook{
    return books.find((book) => book.id === book_id);
  }

  create(book : Partial<Book>): Book{
    const new_id = books[books.length -1].id + 1;
    if (book.author && book.publicationYear && book.title){}

    const new_book: Book = {
      id: new_id,
      title: book.title ?? "",
      author: book.author ?? "",
      publicationYear: book.publicationYear ?? 0,
    }
    books.push(new_book);

    return new_book;
  } 

  update(book_id : number, updated_bookfields : Partial<Book>): NBook{
    const curr_book = books.find((book) => book.id === book_id);
    const updated_book = {
      id: book_id,
      title: updated_bookfields.title ?? curr_book.title,
      author: updated_bookfields.author ?? curr_book.author,
      publicationYear: updated_bookfields.publicationYear ?? curr_book.publicationYear
    };

    /*
    books.map((book) => {
      if (book.id === book_id){
        return updated_book;
      }else{
        return book;
      }
    });
    return updated_book;
    */
    books[book_id - 1] = updated_book;
    return updated_book;
  }

  delete(book_id : number): Book[]{
    books.splice(book_id - 1, 1);
    return books;
  }
}
