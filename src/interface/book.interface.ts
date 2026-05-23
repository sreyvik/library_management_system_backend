export interface Book {
    id?: number;
    categoryId: number;
    title: string;
    author: string;
    isbn?: string | null;
    publishedYear?: number | null;
    quantity?: number | null;
    availableQuantity?: number | null;
}

export type BookCreateInput = Omit<Book, "id">;
export type BookUpdateInput = Partial<BookCreateInput>;

export interface BookRecord {
    id: number;
    categoryId: number;
    title: string;
    author: string;
    isbn: string | null;
    publishedYear: number | null;
    quantity: number | null;
    availableQuantity: number | null;
    createdAt: string;
}
