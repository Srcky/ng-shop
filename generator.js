const faker = require('faker');

module.exports = () => {
  const data = {
    recommendations: [],
    products: [],
    users: [],
    carts: [],
  };

  const amountOfProducts = 100;
  const amountOfRecommendedProduts = 10;
  const amountOfUsers = 10;

  /**
   * GENERATE PRODUCTS AND RECOMMENDED PRODUCTS
   */
  for (let i = 1; i <= amountOfProducts; i++) {
    let product = {
      description: faker.commerce.productDescription(),
      defaultImage: faker.image.cats(),
      discount: faker.datatype.number({ min: 100, max: 1000 }),
      id: i,
      images: [faker.image.city()],
      name: faker.commerce.productName(),
      price: faker.datatype.float({ min: 1500, max: 5000 }),
    };

    if (i <= amountOfRecommendedProduts) {
      data.recommendations.push(product);
    }
    data.products.push(product);
  }

  /**
   * GENERATE USERS WITH PURCHASE HISTORY AND CART
   */
  for (let i = 1; i <= amountOfUsers; i++) {
    // Random user data
    let user = {
      orders: [],
      id: i,
      name: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
      phone: faker.phone.phoneNumber(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email(),
      address: {
        country: faker.address.country(),
        city: faker.address.city(),
        zip: faker.address.zipCode(),
        street: faker.address.streetAddress(),
      },
      role: i % 2 ? 'ADMIN' : 'CUSTOMER',
    };

    // Random products that the user has ordered
    for (let a = 1; a <= faker.datatype.number({ min: 1, max: 5 }); a++) {
      const orderedProducts = [];
      for (let z = 1; z <= faker.datatype.number({ min: 1, max: 5 }); z++) {
        const product =
          data.products[
            faker.datatype.number({ min: 0, max: amountOfProducts - 1 })
          ];
        orderedProducts.push({
          id: product.id,
          quantity: faker.datatype.number({ min: 1, max: 10 }),
        });
      }
      user.orders.push({
        id: a,
        products: orderedProducts,
      });
    }

    // Set random products into the user's cart
    const cart = [];
    for (let y = 1; y <= faker.datatype.number(5); y++) {
      const product =
        data.products[
          faker.datatype.number({ min: 0, max: amountOfProducts - 1 })
        ];
      cart.push({
        id: product.id,
        quantity: faker.datatype.number({ min: 1, max: 10 }),
      });
    }
    data.carts.push({ id: user.id, products: cart });

    data.users.push(user);
  }

  return data;
};
