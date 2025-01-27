export type Book = {
    id: string
    title: string
    author: string
    call_number: string
    collection_location: string
    item_status: string
    publication_year: number
    copy: number
    usage_count: number
    practice_areas: string[]
    created_at: string
    updated_at: string
  }
  
  export type PracticeArea = {
    id: string
    name: string
    parent_id?: string
    created_at: string
    updated_at: string
  }
  
  export interface Database {
    public: {
      Tables: {
        books: {
          Row: Book
          Insert: Omit<Book, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Book, 'id' | 'created_at' | 'updated_at'>>
        }
        practice_areas: {
          Row: PracticeArea
          Insert: Omit<PracticeArea, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<PracticeArea, 'id' | 'created_at' | 'updated_at'>>
        }
      }
    }
  }