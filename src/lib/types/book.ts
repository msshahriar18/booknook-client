export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedByName: string;
  addedByEmail: string;
  createdAt: string;
}
