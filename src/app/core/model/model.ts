export interface Iproduct {
    productId: number
    productSku: string
    productName: string
    productPrice: number
    productShortName: string
    productDescription: string
    createdDate: string
    deliveryTimeSpan: any
    categoryId: number
    productImageUrl: string
    categoryName: string
  }
  export interface ICategory {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number;
  }
  export interface Cart {
    custId: string;
    productId: string;
    quantity: number;
    addedDate: Date;
  }