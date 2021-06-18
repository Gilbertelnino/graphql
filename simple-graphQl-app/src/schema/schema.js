const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const Products = require('../models/products');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

// dummy data

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorsType,
      resolve(parent, args) {
        console.log(parent);
        // return _.find(authors, {id: parent.authorId});
        return Author.findById(parent.authorId);
      },
    },
  }),
});
const ProductsType = new GraphQLObjectType({
  name: 'products',
  fields: () => ({
    id: {type: GraphQLID},
    availableForPurchase: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    productType: {type: GraphQLString},
    publicationDate: {type: GraphQLString},
    category: {type: GraphQLString},
    basePrice: {type: GraphQLInt},
    collections: {type: GraphQLString},
    isAvailable: {type: GraphQLBoolean},
    isAvailableForPurchase: {type: GraphQLBoolean},
    stockQuantity: {type: GraphQLInt},
    taxCode: {type: GraphQLString},
    trackInventory: {type: GraphQLBoolean},
    visibleInListings: {type: GraphQLBoolean},
    weight: {type: GraphQLString},
    seoDescription: {type: GraphQLString},
    seoTitle: {type: GraphQLString},
    sku: {type: GraphQLString},
    slug: {type: GraphQLString},
    changeTaxCode: {type: GraphQLBoolean},
    chargeTaxes: {type: GraphQLBoolean},
    isPublished: {type: GraphQLBoolean},
  }),
});
const AuthorsType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, {
        //   authorId: parent.id,
        // });
        return Book.find({
          authorId: parent.id,
        });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return _.find(books, {id: args.id});
        // code to get data from db/other source
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorsType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorsType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      },
    },
    products: {
      type: new GraphQLList(ProductsType),
      resolve(parent, args) {
        // return authors;
        return Products.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorsType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    addProducts: {
      type: ProductsType,
      args: {
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        productType: {type: GraphQLString},
        publicationDate: {type: GraphQLString},
        category: {type: GraphQLString},
        basePrice: {type: GraphQLInt},
        collections: {type: GraphQLString},
        isAvailable: {type: GraphQLBoolean},
        stockQuantity: {type: GraphQLInt},
        taxCode: {type: GraphQLString},
        availableForPurchase: {type: GraphQLString},
        isAvailableForPurchase: {type: GraphQLBoolean},
        trackInventory: {type: GraphQLBoolean},
        visibleInListings: {type: GraphQLBoolean},
        weight: {type: GraphQLString},
        seoDescription: {type: GraphQLString},
        seoTitle: {type: GraphQLString},
        sku: {type: GraphQLString},
        slug: {type: GraphQLString},
        changeTaxCode: {type: GraphQLBoolean},
        chargeTaxes: {type: GraphQLBoolean},
        isPublished: {type: GraphQLBoolean},
      },
      resolve(parent, args) {
        let products = new Products({
          name: args.name,
          description: args.description,
          productType: args.productType,
          publicationDate: args.publicationDate,
          category: args.category,
          basePrice: args.basePrice,
          collections: args.collections,
          isAvailable: args.isAvailable,
          stockQuantity: args.stockQuantity,
          taxCode: args.taxCode,
          availableForPurchase: args.availableForPurchase,
          isAvailableForPurchase: args.isAvailableForPurchase,
          trackInventory: args.trackInventory,
          visibleInListings: args.visibleInListings,
          weight: args.weight,
          seoDescription: args.seoDescription,
          seoTitle: args.seoTitle,
          sku: args.sku,
          slug: args.slug,
          changeTaxCode: args.changeTaxCode,
          chargeTaxes: args.chargeTaxes,
          isPublished: args.isPublished,
        });
        return products.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
